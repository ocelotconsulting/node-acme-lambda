# Node Lambda Lets-Encrypt

Use [AWS Lambda](https://aws.amazon.com/lambda/) to manage SSL certificates for
Lets-Encrypt.

# How does it work?
This project utilizes AWS Lambda to periodically (once per day) check a set of
certificates for expiration, and then if they're about to expire or
invalid/missing, it will request a new certificate from the Lets-Encrypt
infrastructure.

Certificates are stored in S3, which can easily be configured to send an SNS
notification based upon a PUT event into the configured bucket.

## Project status
Please see the [roadmap](ROADMAP.md) for a sorted list of upcoming features by priority.

## AWS Configuration
This project requires a little [configuration](AWS.md) to be used in AWS.

## General configuration
Modify the [configuration file](./config/default.json) with the values needed for
your environment:

| *Variable*                 | *Description*         |
| :--------------------- |:--------------|
| `acme-directory-url`            | Change to production url - https://acme-v01.api.letsencrypt.org if ready for real certificate.  |
| `acme-account-email`            | Email of user requesting certificate.  |
| `s3-account-bucket`            | An S3 bucket to place account keys/config data into. You will need to create this bucket and assign the [IAM role](AWS.md) to read/write.  |
| `s3-cert-bucket`            | An S3 bucket to place domain certificate data into. You will need to create this bucket and assign the [IAM role](AWS.md) to read/write.  |
| `s3-folder`            | A folder within the above buckets to place the files under, in case there are other contents of these buckets.  |
| `certificate-info`            | Object containing [certificate information mapping](https://github.com/ocelotconsulting/node-letsencrypt-lambda#certificate-info-field-of-configuration-file) certificate names to domains.  |

## Execution
Follow these steps to get started:

1. Git-clone this repository.

        $ git clone git@github.com:ocelotconsulting/node-letsencrypt-lambda.git

2. Modify configuration (as above).

3. Create S3 buckets, IAM role, then test locally:

        $ npm run local-cert

4. Package lambda zip:

        $ npm run dist

5. Create lambda by uploading zip, set the handler to "app.handler", and establish your desired trigger (i.e. periodic).

*Optional*: You can write your certificates to a PEM file by executing:

        $ npm run pems

### `certificate-info` field of [configuration file](./config/default.json)

- Certificate names are keys of JSON object, denoting sets of sub/domains to use as SAN names in certificate.
- Value of certificate name keys is array of sub/domains, which can contain either:
  - a string (default, looks for route53 hosted zone with 2 levels)
  - or an object, with both `name` and `zoneLevels` defined, allowing hosted zones at levels greater than 2 (i.e. `host.at.longer.domain.com` could specify 4 zone levels, which would require proper NS records in parent Route53 hosted zone or other DNS).
