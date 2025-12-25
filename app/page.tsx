"use client";

import Buttons from "@/components/atoms/buttons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";

interface jurusanProps {
  code: string;
  name: string;
}
const Page = () => {
  const [selectedJurusan, setSelectedJurusan] = useState("");
  const jurusan: jurusanProps[] = [
    { name: "Teknologi Informasi", code: "TI" },
    { name: "Sistem Informasi", code: "SI" },
    { name: "Teknik Telekomunikasi", code: "TT" },
    { name: "Desain Komunikasi Visual", code: "DKV" },
  ];
  return (
    <div className="w-40">
      <Buttons variant="default" size="" className="">
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
  );
};

export default Page;
