import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TampilanProduk from "@/views/produk";
import useSWR from "swr";
import fetcher from "../utils/swr/fetcher";

const kategori = () => {
    const [products, setProducts] = useState([]);
    const { data, error, isLoading } = useSWR("/api/produk", fetcher);

    return (
        <div>
            <TampilanProduk
            products={data?.data || []}
            isLoading={isLoading}
            />
        </div>
    );
};

export default kategori;