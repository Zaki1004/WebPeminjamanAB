"use client";

import Buttons from "@/components/atoms/buttons";
import Inputs from "@/components/atoms/inputs";
import Labels from "@/components/atoms/labels";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Api from "@/services/api";
import { useState } from "react";
import Swal from "sweetalert2";

interface angkatanMapalaProps {}

interface angkatanKampusProps {}

const BuatAkunUser = (): JSX.Element => {
  const [nama, setNama] = useState("");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [email, setEmail] = useState("");
  const [nra, setNra] = useState("");
  const [angkatanKampus, setAngkatanKampus] = useState("");
  const [angkatanMapala, setAngkatanMapala] = useState("");
  const [nim, setNim] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [fakultas, setFakultas] = useState("");
  const [noHp, setNoHp] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedAngkatanKampus, setSelectedAngkatanKampus] =
    useState<angkatanKampusProps | null>(null);
  const [listAngkatanKampus, setListAngkatanKampus] = useState<
    angkatanKampusProps[]
  >([]);
  const [selectedAngkatanMapala, setSelectedAngkatanMapala] =
    useState<angkatanMapalaProps | null>(null);

  // const fetchData = async () => {
  //   try {
  //     const [resAngkatanMapala, resAngkatanKampus] = await Promise.all([
  //       Api.get("/angkatan-mapala"),
  //       Api.get("/angkatan-kampus"),
  //     ]);

  //     const angkatanMapalaData = resAngkatanMapala.data.data;
  //     const angkatanKampusData = resAngkatanKampus.data.data;

  //     setAngkatanKampus(angkatanKampusData);
  //     setAngkatanMapala(angkatanMapalaData);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const handleSubmit = async () => {
    // Validasi input
    if (!nama || !namaLengkap || !email || !nra || !nim || !noHp) {
      await Swal.fire({
        icon: "warning",
        title: "Perhatian",
        text: "Harap isi semua field yang wajib",
      });
      return;
    }

    setLoading(true);
    const body = {
      nama,
      nama_lengkap: namaLengkap,
      email,
      nra,
      angkatan_kampus: angkatanKampus,
      angkatan_mapala: angkatanMapala,
      nim,
      jurusan,
      fakultas,
      no_hp: noHp,
    };
    console.log("Request Body:", body);

    try {
      const response = await Api.post("/register-user", body);
      const { status, message } = response.data;

      if (status === "success") {
        await Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: message,
        });

        // Reset form
        setNama("");
        setNamaLengkap("");
        setEmail("");
        setNra("");
        setAngkatanKampus("");
        setAngkatanMapala("");
        setNim("");
        setJurusan("");
        setFakultas("");
        setNoHp("");
      } else {
        await Swal.fire({
          icon: "error",
          title: "Gagal",
          text: message,
        });
      }
    } catch (error: any) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.response?.data?.message ||
          "Terjadi kesalahan saat menghubungi server",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center flex flex-col items-center justify-center border border-gray-300 px-8 py-6 rounded-lg bg-white shadow-lg">
        <h1 className="text-xl font-semibold mb-4">
          Silahkan Buat Akun untuk User Baru
        </h1>

        <div className="flex flex-col gap-4 w-96 mb-4">
          <div className="flex flex-col gap-2">
            <Labels htmlFor="nama" className="text-left font-medium">
              Nama<span className="text-red-500">*</span>
            </Labels>
            <Inputs
              type="text"
              placeholder="Masukkan Nama"
              value={nama}
              className="border border-gray-300 rounded px-3 py-2"
              onChange={(e) => setNama(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Labels htmlFor="namaLengkap" className="text-left font-medium">
              Nama Lengkap<span className="text-red-500">*</span>
            </Labels>
            <Inputs
              type="text"
              placeholder="Masukkan Nama Lengkap"
              value={namaLengkap}
              className="border border-gray-300 rounded px-3 py-2"
              onChange={(e) => setNamaLengkap(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Labels htmlFor="email" className="text-left font-medium">
              Email<span className="text-red-500">*</span>
            </Labels>
            <Inputs
              type="email"
              placeholder="Masukkan Email"
              value={email}
              className="border border-gray-300 rounded px-3 py-2"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Labels htmlFor="nra" className="text-left font-medium">
              NRA<span className="text-red-500">*</span>
            </Labels>
            <Inputs
              type="text"
              placeholder="Masukan NRA"
              value={nra}
              className="border border-gray-300 rounded px-3 py-2"
              onChange={(e) => setNra(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Labels htmlFor="angkatanKampus" className="text-left font-medium">
              Angkatan Kampus<span className="text-red-500">*</span>
            </Labels>
            <Select
              onValueChange={(val) => {
                const selected = JSON.parse(val);
                setSelectedAngkatanKampus(selected);
              }}
              value={
                selectedAngkatanKampus
                  ? JSON.stringify(selectedAngkatanKampus)
                  : ""
              }
            >
              <SelectTrigger className="w-full border rounded px-2 py-1">
                <SelectValue placeholder="Pilih nama pemegang HAKI" />
              </SelectTrigger>
              <SelectContent>
                {angkatanKampus && angkatanKampus.length > 0 ? (
                  listAngkatanKampus.map((item: any) => (
                    <SelectItem
                      key={item.id}
                      value={JSON.stringify(item)}
                      qa-select-option={`select-nama-pemegang-haki-${item.nama}`}
                    >
                      {item.nama}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="loading" disabled>
                    Loading...
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Labels htmlFor="angkatanMapala" className="text-left font-medium">
              Angkatan Mapala<span className="text-red-500">*</span>
            </Labels>
            <Inputs
              type="text"
              placeholder="Masukkan Angkatan Mapala"
              value={angkatanMapala}
              className="border border-gray-300 rounded px-3 py-2"
              onChange={(e) => setAngkatanMapala(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Labels htmlFor="nim" className="text-left font-medium">
              NIM<span className="text-red-500">*</span>
            </Labels>
            <Inputs
              type="text"
              placeholder="Masukkan NIM"
              value={nim}
              className="border border-gray-300 rounded px-3 py-2"
              onChange={(e) => setNim(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Labels htmlFor="jurusan" className="text-left font-medium">
              Jurusan<span className="text-red-500">*</span>
            </Labels>
            <Inputs
              type="text"
              placeholder="Masukkan Jurusan"
              value={jurusan}
              className="border border-gray-300 rounded px-3 py-2"
              onChange={(e) => setJurusan(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Labels htmlFor="fakultas" className="text-left font-medium">
              Fakultas<span className="text-red-500">*</span>
            </Labels>
            <Inputs
              type="text"
              placeholder="Masukkan Fakultas"
              value={fakultas}
              className="border border-gray-300 rounded px-3 py-2"
              onChange={(e) => setFakultas(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Labels htmlFor="noHp" className="text-left font-medium">
              No HP<span className="text-red-500">*</span>
            </Labels>
            <Inputs
              type="text"
              placeholder="Masukkan No HP"
              value={noHp}
              className="border border-gray-300 rounded px-3 py-2"
              onChange={(e) => setNoHp(e.target.value)}
            />
          </div>
          <Buttons
            variant="default"
            size=""
            className="bg-blue-500 text-white rounded px-3 py-2 hover:bg-blue-600 cursor-pointer disabled:bg-gray-400"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Memproses..." : "Buat Akun"}
          </Buttons>
        </div>
      </div>
    </div>
  );
};

export default BuatAkunUser;
