import * as cdk from 'aws-cdk-lib';
import { Role } from 'aws-cdk-lib/aws-iam';
import { IConstruct } from 'constructs';

export class RoleNamingConventionAspect implements cdk.IAspect {
  constructor(private prefix: string) {}

  public visit(node: IConstruct): void {
    // Check if the node is an IAM Role
    if (node instanceof Role) {

     // Perform override to add a prefix to the role name
       const cfnRole = node.node.defaultChild as cdk.CfnResource;
       cfnRole.addPropertyOverride('RoleName', `${this.prefix}-${cfnRole.logicalId}`);

    }
  }
}