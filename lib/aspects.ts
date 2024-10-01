// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import * as cdk from 'aws-cdk-lib';
import { Role } from 'aws-cdk-lib/aws-iam';
import { IConstruct } from 'constructs';

export class RoleNamingConventionAspect implements cdk.IAspect {
  constructor(private prefix: string) {}

  public visit(node: IConstruct): void {
    // Check if the node is an IAM Role
    if (node instanceof Role) {
        
       const cfnRole = node.node.defaultChild as cdk.CfnResource;
       const resolvedLogicalId = cdk.Stack.of(node).resolve(cfnRole.logicalId)
       let roleName = `${this.prefix}-${resolvedLogicalId}`.substring(0, 63)
      // Perform override to add a prefix to the role name
       cfnRole.addPropertyOverride('RoleName', roleName);

    }
  }
}