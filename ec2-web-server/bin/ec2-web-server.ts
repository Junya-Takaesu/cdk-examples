#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { Ec2WebServerStack } from "../lib/ec2-web-server-stack";
import config from "../cdk-config";
import { exec } from "child_process";
import path = require("path");

exec(`[ -x "$(command -v figlet)" ] && figlet -W '${path.basename(process.cwd())}'`, (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stdout);
});

console.log({ "config values": config });

const app = new cdk.App();
new Ec2WebServerStack(app, config.StackName, {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  env: { account: config.AWSAccount, region: config.AWSRegion },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */

  description: config.StackDescription,
});
