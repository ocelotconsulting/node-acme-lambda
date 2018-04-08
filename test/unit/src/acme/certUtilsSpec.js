const proxyquire = require('../../../proxyquire')
const {toIssuerCert, toStandardB64, toPEM} = require('../../../../src/acme/certUtils')

describe('certUtils', () => {

  it('toIssuerCert functions as expected', () => {
    const result = toIssuerCert('blah<haha>;rel="up"someotherstuff"')
    result.should.eql('haha')
  })

  it('toIssuerCert error throws error', () => {
    (() => toIssuerCert('blah')).should.throw(TypeError)
  })

  it('toPEM functions as expected', () => {
    const result = toPEM('blah')
    result.should.eql('-----BEGIN CERTIFICATE-----\nblah\n-----END CERTIFICATE-----\n')
  })

  it('toStandardB64 functions as expected', () => {
    const result = toStandardB64('somewords=plus_equals-this')
    result.should.eql('somewordsplus/equals+this')
  })

  it('toStandardB64 functions as expected mod 2', () => {
    const result = toStandardB64('somewords=plus_equals-thiss')
    result.should.eql('somewordsplus/equals+thiss==')
  })

  it('toStandardB64 functions as expected mod 3', () => {
    const result = toStandardB64('somewords=plus_equals-th')
    result.should.eql('somewordsplus/equals+th=')
  })

})
