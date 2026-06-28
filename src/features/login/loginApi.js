import api from "@/utils/api";

export const loginUser = async (credentials) => {
    const response = await api.post("/login/auth?action=login", credentials);
    return response.data;
};

export const logoutUser = async () => {
    const response = await api.post("/login/auth?action=logout");
    return response.data;
}

export const getUserProfile = async () => {
    const response = await api.get("/login/profile");
    return response.data;
}