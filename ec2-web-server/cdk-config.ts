import * as dotenv from "dotenv";
import * as path from "path";
dotenv.config({ path: path.resolve(__dirname, "./.env") });

export interface IConfig {
  StackName: string;
  StackDescription: string;
  AWSAccount: string;
  AWSRegion: string;
  AWSVpcId: string;
}

const config: IConfig = {
  StackName: path.basename(process.cwd()),
  StackDescription: "Web Server Stack running on EC2",
  // Use account id in .env file otherwise use the default account in the current shell environment
  AWSAccount: <string>(process.env.AWS_ACCOUNT_ID ?? process.env.CDK_DEFAULT_ACCOUNT),
  // Use region in .env file otherwise use the default region in the current shell environment
  AWSRegion: <string>(process.env.AWS_REGION ?? process.env.CDK_DEFAULT_REGION),
  AWSVpcId: <string>process.env.AWS_VPC_ID,
};

export default config;
