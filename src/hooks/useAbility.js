import { useGetUserProfile } from "@/features/login/useLogin";
import { useMemo } from "react";
import defineAbility from "@/lib/casl/defineAbility";

export default function useAbility() {
  const { data } = useGetUserProfile();

  
  const user = data?.data;

  return useMemo(() => {
    return defineAbility(user);
  }, [user]);
}