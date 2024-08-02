import * as cdk from 'aws-cdk-lib';
import { Role } from 'aws-cdk-lib/aws-iam';
import { IConstruct } from 'constructs';

export class RoleNamingConventionAspect implements cdk.IAspect {
  constructor(private prefix: string) {}

  public visit(node: IConstruct): void {
    // Check if the node is an IAM Role
    if (node instanceof Role) {
        
       const cfnRole = node.node.defaultChild as cdk.CfnResource;
       let roleName = `${this.prefix}-${cfnRole.node.addr}`;
      // Trim the role name if it exceeds 64 characters
      if (roleName.length > 64) {
        const trimLength = 64 - this.prefix.length - 1; // Account for prefix and hyphen
        roleName = `${this.prefix}-${roleName.slice(0, trimLength)}`;
      }

      // Perform override to add a prefix to the role name
       cfnRole.addPropertyOverride('RoleName', roleName);

    }
  }
}