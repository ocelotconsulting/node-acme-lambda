#!/usr/bin/env bash
npm run clean
echo $letsencrypt_config > ./config/default.json
npm run dist
echo $cf_template > cf_template.json
echo $cf_parameters > cf_parameters.json
aws-sdk-cli cp dist.zip s3://lambda-cloudformation-test/dist.zip
aws-sdk-cli update-stack -t cf_template.json -p cf_parameters.json letsencrypt-stack
