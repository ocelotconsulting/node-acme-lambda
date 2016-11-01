#!/usr/bin/env bash

timestamp() {
  date +"%b-%d-%Y-%H_%M_%S"
}

dist_file=dist-`timestamp`.zip
printenv
npm run clean
echo $letsencrypt_config > ./config/default.json
npm run dist
echo $cf_template > cf_template.json
echo $cf_parameters | sed "s/dist.zip/${dist_file}/g" > cf_parameters.json
aws-sdk-cli cp dist.zip s3://lambda-cloudformation-test/$dist_file
aws-sdk-cli update-stack -t cf_template.json -p cf_parameters.json letsencrypt-stack
