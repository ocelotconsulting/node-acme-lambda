# Node Lambda Lets-Encrypt

Use [AWS Lambda](https://aws.amazon.com/lambda/) to manage SSL certificates for
Lets-Encrypt.

## Project status
Please see the [roadmap](ROADMAP.md) for a sorted list of upcoming features by priority.

## AWS Configuration
This project requires a little [configuration](AWS.md) to be used in AWS.

# How does it work?
This project utilizes AWS Lambda to periodically (once per day) check a set of
certificates for expiration, and then if they're about to expire or
invalid/missing, it will request a new certificate from the Lets-Encrypt
infrastructure.

Certificates are stored in S3, which can easily be configured to send an SNS
notification based upon a PUT event into the configured bucket.
