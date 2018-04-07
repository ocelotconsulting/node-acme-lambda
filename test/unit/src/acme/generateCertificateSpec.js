const proxyquire = require('../../../proxyquire')


describe('generateCertificate', () => {
  let getAccountStub, getChallengesStub, createCertificateStub,
    getDiscoveryUrlsStub, generateCertificate, certInfo, v1Urls, v2Urls,
    registerStub, account

  beforeEach(() => {

    v1Urls = {
      'new-reg': 'http://blah.reg/blah',
      'new-authz': 'http://blah.auth/blah',
      'new-cert': 'http://blah.cert/blah'
    }

    certInfo = {
      domains: ['doesnt matter']
    }

    account = {
      key: 'a-key'
    }

    registerStub = sinon.stub()
    getAccountStub = sinon.stub()
    getChallengesStub = sinon.stub()
    createCertificateStub = sinon.stub()
    getDiscoveryUrlsStub = sinon.stub()

    generateCertificate = proxyquire('src/acme/generateCertificate', {
      './register/getAccount': getAccountStub,
      './authorize/getChallenges': getChallengesStub,
      './certify/createCertificate': () => createCertificateStub,
      './getDiscoveryUrls': getDiscoveryUrlsStub,
      './register/register': registerStub
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
})
