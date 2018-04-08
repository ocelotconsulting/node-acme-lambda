const proxyquire = require('../../../proxyquire')


describe('generateCertificate', () => {
  let getAccountStub, getChallengesStub, createCertificateStub,
    getDiscoveryUrlsStub, generateCertificate, certInfo, v1Urls, v2Urls,
    registerStub, account, newAccountStub, getV2OrderStub, performAuthorizationsStub,
    createV2CertificateStub

  beforeEach(() => {

    v1Urls = {
      'new-reg': 'http://blah.reg/blah',
      'new-authz': 'http://blah.auth/blah',
      'new-cert': 'http://blah.cert/blah'
    }

    v2Urls = {
      'newOrder': 'http://blah.order/blah',
      'newAccount': 'http://blah.acct/blah',
      'newNonce': 'http://blah.nonce/blah'
    }

    certInfo = {
      domains: ['doesnt matter']
    }

    account = {
      key: 'a-key',
      url: 'http://account/or/something'
    }

    registerStub = sinon.stub()
    getAccountStub = sinon.stub()
    getChallengesStub = sinon.stub()
    createCertificateStub = sinon.stub()
    createV2CertificateStub = sinon.stub()
    getDiscoveryUrlsStub = sinon.stub()
    newAccountStub = sinon.stub()
    getV2OrderStub = sinon.stub()
    performAuthorizationsStub = sinon.stub()

    generateCertificate = proxyquire('src/acme/generateCertificate', {
      './register/getAccount': getAccountStub,
      './authorize/getChallenges': getChallengesStub,
      './certify/createCertificate': () => createCertificateStub,
      './getDiscoveryUrls': getDiscoveryUrlsStub,
      './register/register': registerStub,
      './v2/newAccount': newAccountStub,
      './v2/getV2Order': getV2OrderStub,
      './v2/performAuthorizations': () => performAuthorizationsStub,
      './v2/createV2Certificate': () => createV2CertificateStub
    })
  })

  it('v1 happy path', () => {
    getDiscoveryUrlsStub.resolves(v1Urls)
    getAccountStub.resolves(account)
    getChallengesStub.resolves('no challenge')
    registerStub.returns({registration: 'fake'})
    createCertificateStub.resolves('the end')
    return generateCertificate(certInfo)
    .then(stuff => {
      registerStub.should.have.been.calledWithExactly(v1Urls['new-reg'])
      getAccountStub.should.have.been.calledWith({registration: 'fake'})
      getChallengesStub.should.have.been.calledWithExactly(certInfo.domains, account.key, v1Urls['new-authz'])
      createCertificateStub.should.have.been.calledWithExactly('no challenge')
      stuff.should.eql('the end')
    })
  })

  it('v2 happy path', () => {
    getDiscoveryUrlsStub.resolves(v2Urls)
    getAccountStub.resolves(account)
    getV2OrderStub.resolves('http://order/info')
    newAccountStub.returns({registration: 'fake'})
    performAuthorizationsStub.resolves('create a cert')
    createV2CertificateStub.resolves('the end')
    return generateCertificate(certInfo)
    .then(stuff => {
      newAccountStub.should.have.been.calledWithExactly(v2Urls['newAccount'], v2Urls['newNonce'])
      getAccountStub.should.have.been.calledWith({registration: 'fake'})
      getV2OrderStub.should.have.been.calledWith(certInfo.domains, account.key, v2Urls['newOrder'], v2Urls['newNonce'], account.url)
      performAuthorizationsStub.should.have.been.calledWithExactly('http://order/info')
      createV2CertificateStub.should.have.been.calledWithExactly('create a cert')
      stuff.should.eql('the end')
    })
  })
})
