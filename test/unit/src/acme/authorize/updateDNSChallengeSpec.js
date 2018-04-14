const proxyquire = require('../../../../proxyquire')

// const updateTXTRecord = require('../../aws/route53/updateTXTRecord')
// const getHostedZoneId = require('../../aws/route53/getHostedZoneId')
// const RSA = require('rsa-compat').RSA
// const crypto = require('crypto')
// const dns = require('dns')
// const config = require('../../../config')
// const promisify = require('es6-promisify')
// const resolveTxt = promisify(dns.resolveTxt)
// const urlB64 = require('../urlB64')
// const retry = require('../../retry')(config['acme-dns-retry-delay-ms'], config['acme-dns-retry'])

describe('updateDNSChallenge', () => {
  let updateDNSChallenge, updateTXTRecordStub, getHostedZoneIdStub, rsaStub,
    dnsStub, config, retryStub, dnsChallenges, acctKeyPair

  beforeEach(() => {

    updateTXTRecordStub = sinon.stub()
    getHostedZoneIdStub = sinon.stub()
    dnsStub = {
      resolveTxt: sinon.stub()
    }
    retryStub = sinon.stub().returns(() => Promise.resolve({result: 'blah'}))

    rsaStub = {
      RSA: {
        thumbprint: sinon.stub().returns('thumbs')
      }
    }
    dnsChallenges = [{

    }]

    config = {
      'acme-dns-retry-delay-ms': 100,
      'acme-dns-retry': 3
    }

    acctKeyPair = {}

    updateDNSChallenge = proxyquire('src/acme/authorize/updateDNSChallenge', {
      '../../aws/route53/updateTXTRecord': updateTXTRecordStub,
      '../../aws/route53/getHostedZoneId': getHostedZoneIdStub,
      'rsa-compat': rsaStub,
      'dns': dnsStub,
      '../../../config': config,
      '../../retry': retryStub
    })
  })

  it('challenge for regular name', () => {
    const domain = 'mad.morty.com'
    updateTXTRecordStub.resolves('blah')
    getHostedZoneIdStub.resolves(1)
    dnsStub.resolveTxt.returns(['blah1'])
    updateDNSChallenge(domain, dnsChallenges, acctKeyPair)
    .then(stuff => {
      getHostedZoneIdStub.should.have.been.calledWithExactly(domain)
      updateTXTRecordStub.should.have.been.calledWithExactly(1, domain, ['5fU7Inztx9XRYgSTX9m1WpubgNZcxVGvyql5vOXV6XM'])
      retryStub.callCount.should.equal(1)
      stuff.should.eql('blah')
    })
  })

})
