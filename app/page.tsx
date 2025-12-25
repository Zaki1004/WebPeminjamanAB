"use client";

import Buttons from "@/components/atoms/buttons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

import { useState } from "react";

interface jurusanProps {
  code: string;
  name: string;
}
const Page = () => {
  const [selectedJurusan, setSelectedJurusan] = useState("");
  const router = useRouter();
  const jurusan: jurusanProps[] = [
    { name: "Teknologi Informasi", code: "TI" },
    { name: "Sistem Informasi", code: "SI" },
    { name: "Teknik Telekomunikasi", code: "TT" },
    { name: "Desain Komunikasi Visual", code: "DKV" },
  ];

  const handleClick = () => {
    router.push("/buat-akun-user");
  };
  return (
    <>
      <div className="w-full m-8 gap-4 flex flex-col items-center">
        <div
          className="border border-gray-300 w-60 h-80 rounded-2xl flex flex-col
        items-center justify-center gap-4 px-4"
        >
          <Buttons
            variant="default"
            size=""
            className="cursor-pointer"
            onClick={() => handleClick()}
          >
            Klik Saya
          </Buttons>
          <Select onValueChange={setSelectedJurusan}>
            <SelectTrigger className="w-full border rounded px-2 py-1">
              <SelectValue placeholder="Pilih Jurusan" />
            </SelectTrigger>

            <SelectContent>
              {jurusan.map((jurusan: jurusanProps) => (
                <SelectItem
                  key={jurusan.code}
                  value={jurusan.code} // <- simpan object
                >
                  {jurusan.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};

export default Page;
