import { AbilityBuilder, createMongoAbility } from "@casl/ability";
import { getPermissionsByRoles } from "./permissions";

export default function defineAbility(user) {
  const { can, build } = new AbilityBuilder(createMongoAbility);

  if (!user) return build();

  // SUPERADMIN shortcut
  if (user.role_name === "Super Admin") {
    can("manage", "all");
    return build();
  }
  const roles = Array.isArray(user.role_name)
    ? user.role_name
    : [user.role_name];

  const permissions = getPermissionsByRoles(roles);

  permissions.forEach((permission) => {
    const [action, subject] = permission.split(":");

    if (action && subject) {
      can(action, subject);
    }
  });

  return build();
}