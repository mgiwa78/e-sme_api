"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessControlInstance = void 0;
const accesscontrol_1 = require("accesscontrol");
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
exports.AccessControlInstance = new accesscontrol_1.AccessControl(grantsObjects);
//# sourceMappingURL=access-control.js.map