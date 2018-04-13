# Roadmap

An overview of where I'd like the functionality to go over the next few versions.

Please feel free to file issues on this repository if you have questions, concerns, or suggestions.

## Features/Fixes

* Tests
* Refactoring to reduce code duplication between acme v1/v2
* Webpack/babel to add ES6 support and allow newer language functionality
* Enable other DNS providers (or other challenges) besides Route53
* Possibly separate to lib/cli repo + lambda repo
* ~~Multiple domain support~~
* ~~Actually convert to lambda (express/handler)~~
* ~~Sister project for responding to SNS notification and configuring IAM.~~
* ~~"                                                               " ELB's.~~
~~* Different run modes: local file writing via nodejs vs Lambda + S3.~~
* ~~Support SAN in same certificate (let's encrypt allows up to 100 names per certificate)~~
* ~~ wildcard certs~~
