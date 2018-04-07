const proxyquire = require('../proxyquire')

describe('app', () => {
  let isExpiredStub, generateCertificateStub, app, config, context

  beforeEach(() => {

    context = { succeed: sinon.spy() }

    config = {
      'certificate-info': {
        'rick': ['riggity.wrecked.com', 'shutup.morty.com', 'you.pass.butter', {'name': 'love.is.a.chemical.reaction', 'zoneLevels': 5}],
        'morty': ['put.in.backpack', 'thats.my.grave', {'name': 'why.would.a.poptart.want.to.live.inside.a.toaster', 'zoneLevels': 10}]
      }
    }

    isExpiredStub = sinon.stub()
    generateCertificateStub = sinon.stub()

    app = proxyquire('app', {
      './src/acme/generateCertificate': generateCertificateStub,
      './src/util/isExpired': isExpiredStub,
      './config': config
    })
  })

  it('generates certificate(s) if expired', () => {
    isExpiredStub.resolves(true)
    generateCertificateStub.resolves({stuff: true})
    return app.handler({}, context)
    .then(stuff => {
      isExpiredStub.callCount.should.equal(2)
      generateCertificateStub.callCount.should.equal(2)
      isExpiredStub.should.have.been.calledWithExactly('rick')
      generateCertificateStub.should.have.been.calledWithExactly({key: 'rick', domains: config['certificate-info']['rick']})
      isExpiredStub.should.have.been.calledWithExactly('morty')
      generateCertificateStub.should.have.been.calledWithExactly({key: 'morty', domains: config['certificate-info']['morty']})
      context.succeed.should.have.been.calledWith(sinon.match.array)
    })
  })

  it('does nothing if not expired', () => {
    const msg = key => `Certificate for ${key} is still valid, going back to bed.`
    isExpiredStub.resolves(false)
    return app.handler({}, context)
    .then(stuff => {
      isExpiredStub.callCount.should.equal(2)
      generateCertificateStub.should.not.have.been.called
      isExpiredStub.should.have.been.calledWithExactly('rick')
      isExpiredStub.should.have.been.calledWithExactly('morty')
      context.succeed.should.have.been.calledWith([{
        err: false,
        msg: msg('rick')
      }, {
        err: false,
        msg: msg('morty')
      }])
    })
  })

  it('does something if subset expired', () => {
    const msg = key => `Certificate for ${key} is still valid, going back to bed.`
    isExpiredStub.onCall(0).resolves(false)
    isExpiredStub.onCall(1).resolves(true)
    generateCertificateStub.resolves({stuff: true})
    return app.handler({}, context)
    .then(stuff => {
      isExpiredStub.callCount.should.equal(2)
      generateCertificateStub.should.have.been.calledWithExactly({key: 'morty', domains: config['certificate-info']['morty']})
      isExpiredStub.should.have.been.calledWithExactly('rick')
      isExpiredStub.should.have.been.calledWithExactly('morty')
      context.succeed.should.have.been.calledWith([{
        err: false,
        msg: msg('rick')
      }, {
        stuff: true
      }])
    })
  })

  it('returns error on error', () => {
    const msg = (key, err) => `Updating cert for ${key}, received err ${err}, ${err.stack}`
    const err = new Error('boom')
    isExpiredStub.rejects(err)
    return app.handler({}, context)
    .then(stuff => {
      isExpiredStub.callCount.should.equal(2)
      generateCertificateStub.should.not.have.been.called
      isExpiredStub.should.have.been.calledWithExactly('rick')
      isExpiredStub.should.have.been.calledWithExactly('morty')
      context.succeed.should.have.been.calledWith([{
        err: true,
        msg: msg('rick', err)
      }, {
        err: true,
        msg: msg('morty', err)
      }])
    })
  })

  it('returns error for error but gets cert for non-error', () => {
    const msg = (key, err) => `Updating cert for ${key}, received err ${err}, ${err.stack}`
    const err = new Error('boom')
    isExpiredStub.onCall(0).rejects(err)
    isExpiredStub.onCall(1).resolves(true)
    generateCertificateStub.resolves({stuff: true})
    return app.handler({}, context)
    .then(stuff => {
      isExpiredStub.callCount.should.equal(2)
      generateCertificateStub.should.have.been.calledWithExactly({key: 'morty', domains: config['certificate-info']['morty']})
      isExpiredStub.should.have.been.calledWithExactly('rick')
      isExpiredStub.should.have.been.calledWithExactly('morty')
      context.succeed.should.have.been.calledWith([{
        err: true,
        msg: msg('rick', err)
      }, {
        stuff: true
      }])
    })
  })
})
