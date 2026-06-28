import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserProfile, loginUser, logoutUser } from "./loginApi";
import { queryClient } from "@/utils/queryClient";

export const useLogin = () => {
    return  useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["me"] });
        },
        onError: (error) => {
            console.error("Login failed:", error);
        },
    })
}

export const useLogout = () => {
    return useMutation({
        mutationFn: logoutUser,
        onSuccess: (data) => {
            console.log("Logout successful:", data);
        },
        onError: (error) => {
            console.error("Logout failed:", error);
        },
    })
}

export function useGetUserProfile() {
  return useQuery({
    queryKey: ["me"],
    queryFn: getUserProfile,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
}