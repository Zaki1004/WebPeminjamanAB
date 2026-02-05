import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { barangService } from "../services/list-barang-services";
import {
  DetailBarangTypes,
  ListBarangTypes,
} from "../types/list-barang-types";
import useLoadingStore from "@/store/useLoadingStore";

type ActionType = "detail" | "edit" | "delete" | null;

const useBarang = () => {
  const { data: session, status } = useSession();
  const token = session?.user?.accessToken ?? "";

  const [data, setData] = useState<ListBarangTypes[]>([]);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState<ActionType>(null);
  const [selectedRow, setSelectedRow] =
    useState<DetailBarangTypes | null>(null);
  const [imagePreview, setImagePreview] =
    useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const {start, stop} = useLoadingStore();

  /* ======================
     FETCH LIST
     ====================== */
  const fetchList = async () => {
    if (!token) return;

    start();
    try {
      const res = await barangService.getList(token);
      setData(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (error) {
      console.error("Fetch barang error:", error);
      setData([]);
    } finally {
      stop();
    }
  };

  /* ======================
     OPEN DIALOG
     ====================== */
  const openDialog = async (type: ActionType, kode: string) => {
    if (!token) return;

    setAction(type);
    setOpen(true);
    start();

    try {
      const res = await barangService.getDetail(kode, token);
      const detail = res.data.data;

      setSelectedRow(detail);

      if (detail.cover_url) {
        setImagePreview(
          `${process.env.NEXT_PUBLIC_API_URL}${detail.cover_url}`
        );
      } else {
        setImagePreview(null);
      }
    } finally {
      stop();
    }
  };

  /* ======================
     CLOSE DIALOG
     ====================== */
  const closeDialog = () => {
    setOpen(false);
    setAction(null);
    setSelectedRow(null);
    setImagePreview(null);
    setUploading(false);
    setUploadProgress(0);
  };


/* ======================
       UPDATE DATA BARANG
       ====================== */
   const updateBarang = async (
    kode: string,
    payload: Partial<DetailBarangTypes>,
    file?: File | null
  ) => {
    if (!token) return;

    console.log('=== UPDATE BARANG DEBUG ===');
    console.log('File:', file);
    console.log('File exists?', !!file);
    console.log('Payload:', payload);

      try {
        // 1. Upload foto HANYA jika ada file baru
        let payloadWithoutCoverUrl = { ...payload };
        const { cover_url, ...rest } = payloadWithoutCoverUrl;
        payloadWithoutCoverUrl = rest;

        if (file) {
          console.log("🔄 Uploading file...");
          setUploading(true);
          setUploadProgress(0);

          const res = await barangService.uploadPhoto(
            kode,
            file,
            token,
            (percent) => setUploadProgress(percent)
          );

          const newUrl = res?.data?.data?.cover_url;

          console.log("✅ File uploaded successfully", newUrl);

          // update local selected row and preview
          setSelectedRow((prev) => (prev ? { ...prev, cover_url: newUrl } : prev));
          setImagePreview(newUrl ? `${process.env.NEXT_PUBLIC_API_URL}${newUrl}` : null);

          // include new cover_url in update payload (some backends set it via upload, but include to be safe)
          payloadWithoutCoverUrl = { ...payloadWithoutCoverUrl, cover_url: newUrl };
        } else {
          console.log("⏭️ Skipping file upload (no file provided)");
        }

        console.log("📤 Sending to API PUT:", payloadWithoutCoverUrl);

        // 2. Update data barang
        await barangService.update(kode, payloadWithoutCoverUrl, token);

        console.log("✅ Data updated successfully");

        // 3. Refresh list
        await fetchList();
        closeDialog();
      } catch (error) {
        console.error("Update barang error:", error);
        setUploading(false);
        setUploadProgress(0);
        throw error;
      } finally {
        setUploading(false);
        setUploadProgress(0);
      }
  };




  /* ======================
     UPLOAD FOTO BARANG
     ====================== */
  const uploadCoverImage = async (file: File) => {
    if (!token || !selectedRow) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      const res = await barangService.uploadPhoto(
        selectedRow.kode,
        file,
        token,
        (percent) => setUploadProgress(percent)
      );

      const newUrl = res.data.data.cover_url;

      setSelectedRow((prev) =>
        prev ? { ...prev, cover_url: newUrl } : prev
      );

      setImagePreview(
        `${process.env.NEXT_PUBLIC_API_URL}${newUrl}`
      );
    } finally {
      setUploading(false);
       await fetchList();
    }
  };

  /* ======================
     DELETE
     ====================== */
  const deleteBarang = async () => {
    if (!token || !selectedRow) return;

    await barangService.delete(selectedRow.kode, token);
    closeDialog();
    fetchList();
  };

  /* ======================
     INIT
     ====================== */
  useEffect(() => {
    if (status === "authenticated") {
      fetchList();
    }
  }, [status]);

  return {
    // data
    data,

    // dialog
    open,
    action,
    selectedRow,

    // image upload
    imagePreview,
    uploading,
    uploadProgress,

    // actions
    openDialog,
    closeDialog,
    updateBarang,
    uploadCoverImage,
    deleteBarang,
    refetch: fetchList,
  };
};

export default useBarang;