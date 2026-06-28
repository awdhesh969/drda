// components/auth/Can.js

import useAbility from "@/hooks/useAbility";

export default function Can({
  action,
  subject,
  children,
}) {
  const ability = useAbility();

  if (!ability.can(action, subject)) {
    return null;
  }

  return children;
}