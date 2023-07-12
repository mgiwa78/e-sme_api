"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const access_control_1 = require("../services/access-control");
const resolveUserRoles_1 = __importDefault(require("../_utils/resolveUserRoles"));
const hasPermission = (action) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { user } = req.body;
        const { asset } = req.params;
        const userRoles = yield (0, resolveUserRoles_1.default)(user);
        const allowed = userRoles === null || userRoles === void 0 ? void 0 : userRoles.reduce((perms, role) => {
            let permissions;
            switch (action) {
                case "gather":
                    permissions = access_control_1.AccessControlInstance.can(role).readAny(asset);
                    if (permissions.granted) {
                        perms = perms.concat(permissions);
                    }
                    break;
                case "consume":
                    permissions = access_control_1.AccessControlInstance.can(role).updateAny(asset);
                    if (permissions.granted) {
                        perms = perms.concat(permissions);
                    }
                    break;
                case "destroy":
                    permissions = access_control_1.AccessControlInstance.can(role).deleteAny(asset);
                    if (permissions.granted) {
                        perms = perms.concat(permissions);
                    }
                    break;
            }
            return perms;
        }, []);
        if (allowed === null || allowed === void 0 ? void 0 : allowed.length) {
            const result = allowed.map((perm) => {
                return {
                    asRole: perm.roles
                };
            });
            res.locals = result;
            next();
        }
        else {
            res.status(403).send("Forbidden");
        }
    });
};
//# sourceMappingURL=has-permission.js.map