#!/usr/bin/env bash

timestamp() {
  date +"%b-%d-%Y-%H_%M_%S"
}

dist_file=dist-`timestamp`.zip
npm run clean
npm run dist
echo $cf_template > cf_template.json
echo $cf_parameters | sed "s|dist.zip|${LAMBCI_REPO}/${dist_file}|g" > cf_parameters.json
aws-sdk-cli cp dist.zip s3://lambci-build-artifacts/$LAMBCI_REPO/$dist_file
aws-sdk-cli update-stack -t cf_template.json -p cf_parameters.json acme-stack
