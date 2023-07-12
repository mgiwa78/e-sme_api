import { AccessControlInstance } from "@services/access-control";
import { NextFunction, Request, Response } from "express";
import resolveUserRoles from "_utils/resolveUserRoles";
import { Permission } from "accesscontrol";

const hasPermission = (action: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const { asset } = req.params;
    const userRoles = await resolveUserRoles(user);

    const allowed = userRoles?.reduce((perms: Array<Permission>, role) => {
      let permissions: Permission;
      switch (action) {
        case "gather":
          permissions = AccessControlInstance.can(role).readAny(asset);
          if (permissions.granted) {
            perms = perms.concat(permissions);
          }
          break;
        case "consume":
          permissions = AccessControlInstance.can(role).updateAny(asset);
          if (permissions.granted) {
            perms = perms.concat(permissions);
          }
          break;
        case "destroy":
          permissions = AccessControlInstance.can(role).deleteAny(asset);
          if (permissions.granted) {
            perms = perms.concat(permissions);
          }
          break;
      }
      return perms;
    }, []);

    if (allowed?.length) {
      const result = allowed.map((perm: Permission) => {
        return {
          asRole: perm.roles
        };
      });

      res.locals = result;
      next();
    } else {
      res.status(403).send("Forbidden");
    }
  };
};
