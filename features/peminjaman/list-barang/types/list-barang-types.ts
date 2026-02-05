export type BarangStatus = "tersedia" | "habis" | "nonaktif" | "aktif";

export interface ListBarangTypes {
  id: number
  kode: string
  nama: string
  merk: string
  kategori: string
  harga: number
  total_unit: number
  cover_url: string
  available_unit: number
  status: BarangStatus
}
export interface BarangStats {
  total_unit: number;
  siap: number;
  dipinjam: number;
  siap_terbatas: number;
  maintenance: number;
}


export interface DetailBarangTypes {
  id: number;
  kode: string;
  nama: string;
  merk: string;
  deskripsi: string;
  kategori: string;
  status: BarangStatus;
  cover_url: string;
  created_at: string;
  updated_at: string;
  haraga: number;
  stats: BarangStats;
  all_units_inactive: boolean;
}



export const BARANG_STATUS_CONFIG: Record<
  BarangStatus,
  { label: string; className: string }
> = {
  tersedia: {
    label: "Tersedia",
    className: "text-white rounded-lg bg-green-600 p-2",
  },
  habis: {
    label: "Habis",
    className: "text-white rounded-lg bg-yellow-600 p-2",
  },
  nonaktif: {
    label: "Nonaktif",
    className: "text-white rounded-lg bg-red-600 p-2",
  },
  aktif: {
    label: "Aktif",
    className: "text-white rounded-lg bg-blue-600 p-2",
  },
};

export interface UploadImageTypes{

    cover_url: string;
}