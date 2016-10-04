# AWS Configuration

## IAM
In order to use this project as a Lambda, it needs to be assigned a role which
has permissions to write to Route53 (to satisfy Lets-Encrypt DNS challenge) and
to read/write to the S3 buckets it is configured for for user registration and
domain certificate files.

## Lambda
The Lambda function needs to run periodically as a scheduled function, preferably
every day or perhaps every few days.
