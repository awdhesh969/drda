export const ROLES = {
  "Super Admin": [
    "manage:all",
  ],

  "District Manager": [
    "read:Dashboard",
    "read:Users",
    "update:Users",
  ],

  "Block Program Manager": [
    "read:Dashboard",
    "read:Users",
  ],

  "Block Resource Person": [
    "read:Dashboard",
    "read:Users",
  ],
};