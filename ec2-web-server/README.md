# ec2-web-server

This is an example demostrates how you can set up a web server with port 80 open.

## How to deploy

### 1. Set up aws cli environment

Install aws cli and related things.
Configure credentials or profiles so that cdk can use these to access aws cli/api.
One way to set up a profile with credentials is to use `AWS IAM Identity Center`. This way you don't need to use API keys and secrets.

However, the method you choose to allow aws cli to access aws cli/api doesn't matter.
All you have to do is to have a cli environment where you can access aws resources through aws cli/api.

#### Use AWS IAM Identity Center

In case if you want to use AWS IAM Identity Center, follow these links below to set it up and aws cli profile as well.

- [Token provider configuration with automatic authentication refresh for AWS IAM Identity Center (successor to AWS Single Sign-On) - AWS Command Line Interface (amazon.com)](https://docs.aws.amazon.com/cli/latest/userguide/sso-configure-profile-token.html)

- [Using an IAM Identity Center enabled named profile - AWS Command Line Interface (amazon.com)](https://docs.aws.amazon.com/cli/latest/userguide/sso-using-profile.html)

### 2. Set values in .env file.

Just replace xxxx... to whatever proper values for you.
Note that when AWS_VPC_ID is left empty, default VPC will be used.

```
AWS_ACCOUNT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxx
AWS_REGION=xxxxxxxxxxxxxxxxxxxxxxxxxxx
# Leave blank if you want to use default VPC
AWS_VPC_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 3. Deploy

```
cdk deploy
```

## How to delete all the resources

```
cdk destroy
```

## No ssh shall be used, SSM is used to connect to the shell of the ec2.

Below is the command to connect to ec2 instance deployed using this example cdk stack.

```bash
$ aws ssm start-session --target i-xxxxxxxxxxxx --region us-east-2
```

Replace `i-xxxxxxxxxxxx` with an actual instance id.

## References

- [Part 3 - Simple EC2 instance - Awesome AWS CDK - DEV Community](https://dev.to/emmanuelnk/part-3-simple-ec2-instance-awesome-aws-cdk-37ia)

- [How to put Bash Scripts on the Web - YouTube](https://www.youtube.com/watch?v=Jzcu4JheCtY)

- [Learning Apache http server - Executing CGI scripts - YouTube](https://www.youtube.com/watch?v=aWWK5tqvuyg&t=74s)

- [The Magic of cgi-bin - YouTube](https://www.youtube.com/watch?v=NwRVJX0Ieno)
