import { useEffect, useState } from "react"
import { ListBarangTypes } from "../types/list-barang-types"

const useBarang = () => {
  const [data, setData] = useState<ListBarangTypes[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch("/api/admin/barang")
      .then(res => res.json())
      .then(res => setData(res.data))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading }
}

export default useBarang