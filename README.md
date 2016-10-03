# Node Lambda Lets-Encrypt

Use [AWS Lambda](https://aws.amazon.com/lambda/) to manage SSL certificates for
Lets-Encrypt.

## Project status
This project has just begun, I will be adding features as fast as I can to get it to completion in a relatively short time period (10-3-2016)

# Why do I want this?
Rather than having to dedicate a machine to running the Lets-Encrypt client to
maintain your certificate for your site, you can let it all
live on Amazon's infrastructure for cheap. You'll receive notification if
anything goes wrong, and there's no hardware or virtual machines for you to
manage.

# How does it work?

This works by running a Lambda function once per day which will check
your certificate's expiration, and renew it if it is nearing expiration.

Since Lambda is billed in 100ms increments and this only needs to run once a day
for less than 10seconds each time the cost to run this is less than a
penny per month(i.e. effectively free)

## Special Thanks
A few shout-outs to inspiring projects...
* @ubergeek42 for https://github.com/ubergeek42/lambda-letsencrypt
* @Daplie for https://github.com/Daplie/le-acme-core and https://github.com/Daplie/rsa-compat.js
