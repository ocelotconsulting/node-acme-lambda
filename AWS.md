# AWS Configuration

## IAM
In addition to the AWSLambdaBasicExecutionRole (for CloudWatch logging), the
lambda function also needs to be assigned a role which
has permissions to write to Route53 (to satisfy Lets-Encrypt DNS challenge) and
to read/write to the S3 buckets it is configured for for user registration and
domain certificate files.

Here's an example policy which uses buckets called "letsencrypt-account.MYWEBSITE.com" 
and "letsencrypt-certs.MYWEBSITE.com" to store files, and gives access to two hosted zones:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
		"Effect": "Allow",
		"Action": [ "kms:Decrypt", "kms:Encrypt" ],
		"Resource": "arn:aws:kms:REGION:999999999999:key/01234567-890a-bcde-f012-3456789abcde"
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::letsencrypt-account.MYWEBSITE.com",
                "arn:aws:s3:::letsencrypt-certs.MYWEBSITE.com"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject"
            ],
            "Resource": [
                "arn:aws:s3:::letsencrypt-account.MYWEBSITE.com/*",
                "arn:aws:s3:::letsencrypt-certs.MYWEBSITE.com/*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "route53:ChangeResourceRecordSets",
                "route53:GetHostedZone",
                "route53:ListResourceRecordSets"
            ],
            "Resource": [
                "arn:aws:route53:::hostedzone/EXAMPLE1AAEFEG",
                "arn:aws:route53:::hostedzone/EXAMPLE2AOMWDM"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "route53:GetChange",
                "route53:ListHostedZones"
            ],
            "Resource": "*"
        }
    ]
}
```

## AWS KMS
The role used by Lambda will also need to be added to Key Users on the KMS key referenced in its IAM Policy.

## Lambda Execution
The Lambda function needs to run periodically as a scheduled function, preferably
every day or perhaps every few days.
