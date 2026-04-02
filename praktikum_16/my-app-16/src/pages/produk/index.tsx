import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TampilanProduk from "@/views/produk";
import useSWR from "swr";
import fetcher from "../../utils/swr/fetcher";

const kategori = () => {
    const { push } = useRouter();
    const [products, setProducts] = useState([]);
    
    
    const { data, error, isLoading } = useSWR("/api/produk", fetcher);
    // cek apakah data, error, dan isLoading sudah bnar

    return (
        <div>
            <TampilanProduk
            products={isLoading ? [] : data.data} />
        </div>
    );
};

export default kategori;