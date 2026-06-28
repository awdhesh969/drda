import { ROLES } from "./roles";

export function getPermissionsByRoles(userRoles = []) {
  const permissions = new Set();

  userRoles.forEach((role) => {
    const rolePermissions = ROLES[role] || [];

    rolePermissions.forEach((p) => permissions.add(p));
  });

  return Array.from(permissions);
}