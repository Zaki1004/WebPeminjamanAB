import Api from "@/services/api";
import { DetailBarangTypes, ListBarangTypes, UploadImageTypes } from "../types/list-barang-types";

interface ListBarangResponse {
  data: ListBarangTypes[];
}

interface DetailBarangResponse {
  data: DetailBarangTypes;
}

interface UploadImageResponse {
  data: UploadImageTypes;
}

export const barangService = {
  getList(token: string) {
    return Api.get<ListBarangResponse>("/api/admin/barang", {
      headers: { Authorization: token },
    });
  },

  getDetail(kode: string, token: string) {
    return Api.get<DetailBarangResponse>(`/api/admin/barang/${kode}`, {
      headers: { Authorization: token },
    });
  },

   // ======================
  // UPDATE DATA BARANG (JSON)
  // ======================
  update(
kode: string, payload: Partial<DetailBarangTypes>, token: string) {
    return Api.put(
      `/api/admin/barang/${kode}`,
      payload,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
  },

  // ======================
  // UPLOAD FOTO BARANG
  // ======================
  uploadPhoto(
    kode: string,
    file: File,
    token: string,
    onProgress?: (percent: number) => void
  ) {
    const formData = new FormData();
    // Append common field names to be compatible with different backends
    formData.append("file", file);
    formData.append("photo", file);

    return Api.post<UploadImageResponse>(
      `/api/admin/barang/${kode}/photo`,
      formData,
      {
        headers: {
          Authorization: token,
          // Let the browser/axios set Content-Type with boundary
        },
        onUploadProgress: (event) => {
          if (!event.total) return;
          const percent = Math.round((event.loaded * 100) / event.total);
          onProgress?.(percent);
        },
      }
    );
  },

  delete(kode: string, token: string) {
    return Api.delete(`/api/admin/barang/${kode}`, {
      headers: { Authorization: token },
    });
  },
};
