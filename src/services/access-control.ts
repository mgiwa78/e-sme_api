import { AccessControl } from "accesscontrol";
let grantsObjects = {
  organizationSuperAdmin: {
    organization: {
      "read:own": ["*"],
      "update:own": ["*"],
      "delete:own": ["*"]
    },
    organizationAdmin: {
      "read:any": ["*"],
      "update:any": ["*"],
      "delete:any": ["*"],
      "create:any": ["*"]
    }
  },
  organizationEditor: {
    organization: {
      "read:own": ["*"]
    }
  },
  superAdmin: {
    organization: {
      "create:own": ["*"],
      "read:any": ["*"],
      "update:own": ["*"],
      "delete:own": ["*"]
    },
    organizationAdmin: {
      "create:own": ["*"],
      "read:any": ["*"],
      "update:own": ["*"],
      "delete:own": ["*"]
    },
    organizationEditor: {
      "create:own": ["*"],
      "read:any": ["*"],
      "update:own": ["*"],
      "delete:own": ["*"]
    }
  }
};

export const AccessControlInstance = new AccessControl(grantsObjects);
