import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as iam from "aws-cdk-lib/aws-iam";
import config from "../cdk-config";
import * as fs from "fs";

export class Ec2WebServerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Use default VPC if AWSVpcId is not specified in .env file
    const vpc = ec2.Vpc.fromLookup(this, "VPC", config.AWSVpcId ? { vpcId: config.AWSVpcId } : { isDefault: true });

    // Create IAM Role with SSM Managed Policy
    const role = new iam.Role(this, "roleForSSM", {
      assumedBy: new iam.ServicePrincipal("ec2.amazonaws.com"),
    });
    role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonSSMManagedInstanceCore"));

    // Create Security Group
    const securityGroup = new ec2.SecurityGroup(this, "SecurityGroupForSampleEc2WebServer", {
      vpc,
    });
    securityGroup.addIngressRule(ec2.Peer.ipv4("0.0.0.0/0"), ec2.Port.tcp(80), "allow http access from anywhere");

    // Create EC2 Instance
    const instance = new ec2.Instance(this, "SampleEc2WebServer", {
      vpc,
      role,
      securityGroup,
      instanceName: "SampleEc2WebServer",
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      machineImage: ec2.MachineImage.latestAmazonLinux2(),
    });

    // Create UserData
    instance.addUserData(fs.readFileSync("./lib/user-data/apache-cgi-example.sh", "utf8"));

    // Display URLs
    new cdk.CfnOutput(this, "SampleEc2WebServerUrl", { value: `http://${instance.instancePublicIp}` });
    new cdk.CfnOutput(this, "hoge.sh", { value: `http://${instance.instancePublicIp}/my-scripts/hoge.sh` });
    new cdk.CfnOutput(this, "hoge.php", { value: `http://${instance.instancePublicIp}/my-scripts/hoge.php` });

    // Display ssm start session command
    new cdk.CfnOutput(this, "SampleEc2WebServerSsmStartSessionCommand", {
      value: `aws ssm start-session --target ${instance.instanceId} --region ${config.AWSRegion}`,
    });
  }
}
