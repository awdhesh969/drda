export const ROLES = {
  "Super Admin": [
    "manage:all",
  ],

  "District Manager": [
    "read:Dashboard",
    "read:Location",
    "read:Districts",
    "create:Districts",
    "update:Districts",
    "read:Talukas",
    "create:Talukas",
    "update:Talukas",
    "read:Villages",
    "create:Villages",
    "update:Villages",
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