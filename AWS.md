# AWS Configuration

## IAM
In addition to the AWSLambdaBasicExecutionRole (for CloudWatch logging), the
lambda function also needs to be assigned a role which
has permissions to write to Route53 (to satisfy ACME DNS challenge) and
to read/write to the S3 buckets it is configured for for user registration and
domain certificate files.

Here's an example policy which uses buckets called "acme-account.MYWEBSITE.com"
and "acme-certs.MYWEBSITE.com" to store files, and gives access to two hosted zones:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::acme-account.MYWEBSITE.com",
                "arn:aws:s3:::acme-certs.MYWEBSITE.com"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject"
            ],
            "Resource": [
                "arn:aws:s3:::acme-account.MYWEBSITE.com/*",
                "arn:aws:s3:::acme-certs.MYWEBSITE.com/*"
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

## Lambda Execution
The Lambda function needs to run periodically as a scheduled function, preferably
every day or perhaps every few days.
