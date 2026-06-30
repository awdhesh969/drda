import api from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteDistrict, deleteTaluka, deleteVillage, getDistrict, getDistrictDetails, getTalukaDetails, getTalukas, getVillageDetails, getVillages, saveUpdateDistricts, saveUpdateTalukas } from "../api/locationApi";

export const useDistricts = () => {
  return useQuery({
    queryKey: ["districts"],
    queryFn: getDistrict,
    refetchOnWindowFocus: false,
  });
}

export const useTalukas = (districtId) => {
  return useQuery({
    queryKey: ["talukas", districtId],
    enabled: !!districtId,
    queryFn: async () => {
      const res = await api.get("talukas", {
        params: { district_id: districtId },
      });

      return (res.data?.data || []).map((item) => ({
        label: item.name,
        value: item.id,
      }));
    },
    refetchOnWindowFocus: false,
  });
};

export const useVillages = (districtId, talukaId) => {
  return useQuery({
    queryKey: ["villages", districtId, talukaId],
    enabled: !!districtId && !!talukaId,
    queryFn: async () => {
      const res = await api.get("villages", {
        params: {
          district_id: districtId,
          taluka_id: talukaId,
        },
      });

      return (res.data?.data || []).map((item) => ({
        label: item.name,
        value: item.id,
      }));
    },
    refetchOnWindowFocus: false,
  });
};

export const useDistrictDetails = (id) => {
  return useQuery({
    queryKey: ["districtDetails", id],
    queryFn: () => getDistrictDetails(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};

export const useSaveUpdateDistricts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({url, data}) => {
      return saveUpdateDistricts({url, data});
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["districts"] });
    }
  });
};

export const useDeleteDistrict = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDistrict,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["districts"] });
    }
  });
};

export const useTalukaList = () => {
  return useQuery({
    queryKey: ["talukasLists"],
    queryFn: getTalukas,
    refetchOnWindowFocus: false,
  });
}

export const useRawTalukas = (districtId) => {
  return useQuery({
    queryKey: ["talukas", districtId],
    enabled: !!districtId,
    queryFn: async () => {
      const res = await api.get("talukas", {
        params: { district_id: districtId },
      });

      return (
        res.data
      );
    },
    refetchOnWindowFocus: false,
  });
};

export const useTalukaDetails = (id) => {
  return useQuery({
    queryKey: ["talukaDetails", id],
    queryFn: () => getTalukaDetails(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};

export const useSaveUpdateTalukas = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({url, data}) => {
      return saveUpdateTalukas({url, data});
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["talukasLists"] });
    }
  });
};

export const useDeleteTaluka = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTaluka,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["talukasLists"] });
    }
  });
};

export const useVillagesList = (districtId, talukaId) => {
  return useQuery({
    queryKey: ["villagesLists", districtId, talukaId],
    queryFn:() => getVillages(districtId, talukaId),
    refetchOnWindowFocus: false,
  });
};

export const useVillageDetails = (id) => {
  return useQuery({
    queryKey: ["villageDetails", id],
    queryFn: () => getVillageDetails(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};

export const useSaveUpdateVillages = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({url, data}) => {
      const res = await api.post(url, data);
      return res.data || {};
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["villagesLists"] });
    },
  });
};

export const useDeleteVillage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteVillage,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["villagesLists"] });
    }
  });
};
