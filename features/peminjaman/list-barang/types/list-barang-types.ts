export interface ListBarangTypes {
  id: number
  kode: string
  nama: string
  merk: string
  kategori: string
  stok_total: number
  stok_sisa: number
  cover_url: string
  status: "aktif" | "nonaktif"
}
