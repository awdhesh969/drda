import api from "@/utils/api";

export const getDistrictDetails = async (id) => {
    const res = await api.get(`districts/details/${id}`);
    return res.data || {};
}

export const saveUpdateDistricts = async ({url, data}) => {
    const res = await api.post(url, data);
    return res.data || {};
}

export const deleteDistrict = async (id) => {
    const res = await api.delete(`districts/${id}`);
    return res.data || {};
}

export const getTalukas = async () => {
    const res = await api.get("talukas");
    return res.data || [];
}

export const getTalukaDetails = async (id) => {
    const res = await api.get(`talukas/details/${id}`);
    return res.data || {};
};

export const saveUpdateTalukas = async ({url, data}) => {
    const res = await api.post(url, data);
    return res.data || {};
}

export const deleteTaluka = async (id) => {
    const res = await api.delete(`talukas/${id}`);
    return res.data || {};
}

export const getVillages = async (districtId = null, talukaId = null) => {
    const params = new URLSearchParams();
    if (districtId) params.append("district_id", districtId);
    if (talukaId) params.append("taluka_id", talukaId);
    const endpoint = params.toString() ? `villages?${params.toString()}` : "villages";

    const res = await api.get(endpoint);
    return res.data || [];
}

export const getVillageDetails = async (id) => {
    const res = await api.get(`villages/details/${id}`);
    return res.data || {};
};

export const saveUpdateVillages = async ({url, data}) => {
    const res = await api.post(url, data);
    return res.data || {};
}

export const deleteVillage = async (id) => {
    const res = await api.delete(`villages/${id}`);
    return res.data || {};
}
