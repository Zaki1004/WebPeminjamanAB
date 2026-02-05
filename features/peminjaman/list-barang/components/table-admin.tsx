"use client";

import { DataTable } from "@/shared/organism/data-table";
import { AdminColumns } from "../config/admin-config";
import useBarang from "../hooks/useBarang";

import { formatDateTime } from "@/lib/date";
import Dropdown from "@/shared/molecules/dropdown";
import FormField from "@/shared/molecules/form-field";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { useEffect, useState } from "react";
import {
  BARANG_STATUS_CONFIG,
  BarangStatus,
  DetailBarangTypes,
} from "../types/list-barang-types";

export function AdminTableListBarang() {
  const barang = useBarang();

  const [editForm, setEditForm] = useState<
    (DetailBarangTypes & { preview?: string | null }) | null
  >(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [hasNewFile, setHasNewFile] = useState(false);

  useEffect(() => {
    if (barang.action === "edit" && barang.selectedRow) {
      console.log("🔄 Reset edit form and file state");
      setEditForm({
        ...barang.selectedRow,
        preview: barang.selectedRow.cover_url
          ? `${process.env.NEXT_PUBLIC_API_URL}${barang.selectedRow.cover_url}`
          : null,
      });
      setFile(null);
      setUploadProgress(0);
    }

    if (!barang.open) {
      setFile(null);
      setHasNewFile(false);
      setEditForm(null);
    }
  }, [barang.action, barang.selectedRow, barang.open]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setHasNewFile(true);
    setEditForm((prev) =>
      prev ? { ...prev, preview: URL.createObjectURL(f) } : null,
    );
  };

  const handleRemoveImage = () => {
    setFile(null);
    setHasNewFile(false);
    setEditForm((prev) =>
      prev
        ? {
            ...prev,
            preview: barang.selectedRow?.cover_url
              ? `${process.env.NEXT_PUBLIC_API_URL}${barang.selectedRow.cover_url}`
              : null,
          }
        : null,
    );
  };

  const handleSaveEdit = async () => {
    if (!editForm?.kode) return; // ✅ Null check
    console.log("=== HANDLE SAVE EDIT DEBUG ===");
    console.log("editForm:", editForm);
    console.log("file state:", file);
    console.log("file is null?", file === null);
    console.log("file is undefined?", file === undefined);
    // Hapus property 'preview' sebelum kirim
    const { preview, cover_url, ...dataToSubmit } = editForm;

    console.log("dataToSubmit:", dataToSubmit);

    await barang.updateBarang(editForm.kode, dataToSubmit, file);

    await barang.updateBarang(
      editForm.kode,
      dataToSubmit,
      hasNewFile ? file : null, // ✅ Kirim null jika tidak ada file baru
    );
  };

  return (
    <>
      <DataTable
        columns={AdminColumns(barang)}
        data={barang.data}
        loading={barang.loading}
        emptyText="Data barang belum tersedia"
      />

      {/* DETAIL DIALOG */}
      <Dialog
        open={barang.open && barang.action === "detail"}
        onOpenChange={barang.closeDialog}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Detail Barang</DialogTitle>
          </DialogHeader>

          {barang.selectedRow && (
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <DetailItem label="Kode" value={barang.selectedRow.kode} />
                <DetailItem label="Nama" value={barang.selectedRow.nama} />
                <DetailItem label="Merk" value={barang.selectedRow.merk} />
                <DetailItem
                  label="Kategori"
                  value={barang.selectedRow.kategori}
                />
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <span
                    className={`mt-2 inline-block
                     ${
                       BARANG_STATUS_CONFIG[barang.selectedRow?.status]
                         .className
                     }
                    `}
                  >
                    {BARANG_STATUS_CONFIG[barang.selectedRow?.status].label}
                  </span>
                </div>

                <div className="col-span-2">
                  <p className="text-muted-foreground mb-1">Gambar</p>

                  {barang.selectedRow.cover_url ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}${barang.selectedRow.cover_url}`}
                      alt="Cover Barang"
                      className="max-h-48 rounded border object-contain"
                    />
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Tidak ada gambar
                    </p>
                  )}
                </div>

                <DetailItem
                  label="Created At"
                  value={formatDateTime(barang.selectedRow.created_at)}
                />
                <DetailItem
                  label="Update At"
                  value={formatDateTime(barang.selectedRow.updated_at)}
                />
                <DetailItem label="Harga" value={barang.selectedRow.haraga} />
                <DetailItem
                  label="Total Unit"
                  value={barang.selectedRow.stats.total_unit}
                />
                <DetailItem
                  label="Siap"
                  value={barang.selectedRow.stats.siap}
                />
                <DetailItem
                  label="Dipinjam"
                  value={barang.selectedRow.stats.dipinjam}
                />
                <DetailItem
                  label="Siap Terbatas"
                  value={barang.selectedRow.stats.siap_terbatas}
                />
                <DetailItem
                  label="Maintenance"
                  value={barang.selectedRow.stats.maintenance}
                />
                <DetailItem
                  label="Total Unit Tidak Aktif"
                  value={barang.selectedRow.all_units_inactive ? "Ya" : "Tidak"}
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* EDIT DIALOG */}
      <Dialog
        open={barang.open && barang.action === "edit"}
        onOpenChange={barang.closeDialog}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Barang</DialogTitle>
          </DialogHeader>

          {editForm && (
            <div className="grid grid-cols-2 gap-4">
              <FormField
                htmlFor="nama_barang"
                placeholder="Masukkan Nama Barang"
                value={editForm.nama}
                onChange={(e) =>
                  setEditForm({ ...editForm, nama: e.target.value })
                }
              >
                Nama Barang
              </FormField>

              <FormField
                htmlFor="merk"
                type="text"
                placeholder="Masukkan Merk Barang"
                value={editForm.merk}
                onChange={(e) =>
                  setEditForm({ ...editForm, merk: e.target.value })
                }
              >
                Merk Barang
              </FormField>

              <FormField
                htmlFor="deskripsi"
                type="text"
                placeholder="Masukkan Deskripsi Barang"
                value={editForm.deskripsi}
                onChange={(e) =>
                  setEditForm({ ...editForm, deskripsi: e.target.value })
                }
              >
                Deskripsi Barang
              </FormField>

              <FormField
                htmlFor="kategori"
                type="text"
                placeholder="Masukkan Kategori Barang"
                value={editForm.kategori}
                onChange={(e) =>
                  setEditForm({ ...editForm, kategori: e.target.value })
                }
              >
                Kategori Barang
              </FormField>

              <Dropdown<BarangStatus>
                htmlFor="status"
                value={editForm.status}
                options={BARANG_STATUS_CONFIG}
                onChange={(value) =>
                  setEditForm({
                    ...editForm,
                    status: value,
                  })
                }
              >
                Status Barang
              </Dropdown>

              {/* IMAGE UPLOAD */}
              <div className="col-span-2 space-y-2">
                <label htmlFor="file-upload" className="text-sm font-medium">
                  Upload Gambar
                </label>

                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {editForm.preview ? (
                  <div className="space-y-2">
                    <img
                      src={editForm.preview}
                      className="h-40 w-full rounded object-contain border"
                      alt="Preview"
                    />

                    {/* ICON ACTION — SELALU MUNCUL */}
                    <div className="flex gap-4 justify-center">
                      <button
                        type="button"
                        className="p-2 hover:bg-gray-100 rounded"
                        onClick={() =>
                          document.getElementById("file-upload")?.click()
                        }
                        title="Ganti gambar"
                      >
                        ✏️
                      </button>

                      <button
                        type="button"
                        className="p-2 hover:bg-gray-100 rounded"
                        onClick={handleRemoveImage}
                        title="Hapus gambar"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="border-2 border-dashed border-blue-400 rounded p-8 text-center cursor-pointer hover:bg-blue-50"
                    onClick={() =>
                      document.getElementById("file-upload")?.click()
                    }
                  >
                    <p className="text-blue-500 underline font-medium">
                      Klik atau drag file gambar di sini
                    </p>
                  </div>
                )}
              </div>

              <FormField
                htmlFor="haraga"
                type="number"
                placeholder="Harga Barang"
                value={editForm.haraga}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    haraga: Number(e.target.value),
                  })
                }
              >
                Harga Barang
              </FormField>

              <FormField
                htmlFor="barang_stats_total_unit"
                type="number"
                placeholder="Total Unit Barang"
                value={editForm.stats.total_unit}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    stats: {
                      ...editForm.stats,
                      total_unit: Number(e.target.value),
                    },
                  })
                }
              >
                Stok Sisa Barang
              </FormField>

              <FormField
                htmlFor="barang_stats_siap"
                type="number"
                placeholder="Total Siap Barang"
                value={editForm.stats.siap}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    stats: {
                      ...editForm.stats,
                      siap: Number(e.target.value),
                    },
                  })
                }
              >
                Stok Siap Barang
              </FormField>

              <FormField
                htmlFor="barang_stats_dipinjam"
                type="number"
                placeholder="Total Dipinjam Barang"
                value={editForm.stats.dipinjam}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    stats: {
                      ...editForm.stats,
                      dipinjam: Number(e.target.value),
                    },
                  })
                }
              >
                Stok Dipinjam Barang
              </FormField>

              <FormField
                htmlFor="barang_stats_siap_terbatas"
                type="number"
                placeholder="Total Siap Terbatas Barang"
                value={editForm.stats.siap_terbatas}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    stats: {
                      ...editForm.stats,
                      siap_terbatas: Number(e.target.value),
                    },
                  })
                }
              >
                Stok Siap Terbatas Barang
              </FormField>

              <FormField
                htmlFor="barang_stats_maintenance"
                type="number"
                placeholder="Total Maintenance Barang"
                value={editForm.stats.maintenance}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    stats: {
                      ...editForm.stats,
                      maintenance: Number(e.target.value),
                    },
                  })
                }
              >
                Total Maintenance Barang
              </FormField>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={barang.closeDialog}>
              Batal
            </Button>
            <Button onClick={handleSaveEdit} disabled={barang.uploading}>
              {barang.uploading
                ? `Uploading... ${barang.uploadProgress}%`
                : "Simpan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DELETE DIALOG */}
      <Dialog
        open={barang.open && barang.action === "delete"}
        onOpenChange={barang.closeDialog}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Hapus Barang</DialogTitle>
          </DialogHeader>

          {barang.selectedRow && (
            <p className="text-sm">
              Apakah Anda yakin ingin menghapus barang{" "}
              <span className="font-semibold">{barang.selectedRow.nama}</span>?
              Tindakan ini tidak dapat dibatalkan.
            </p>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={barang.closeDialog}>
              Batal
            </Button>
            <Button variant="destructive" onClick={barang.deleteBarang}>
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function DetailItem({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <p className="text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
