import { useGetUserProfile } from "@/features/login/useLogin";

export default function useAuth() {
  const {
    data,
    isLoading,
    isError,
  } = useGetUserProfile();

  return {
    user: data || null,
    loading: isLoading,
    error: isError,
    isAuthenticated: !!data,
  };
}