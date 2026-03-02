import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TampilanProduk from "@/views/produk";

type ProductType = {
    id: string;
    name: string;
    price: number;
    size: string;
}

const kategori = () => {
    const [products, setProducts] = useState([]);
    // const ProdukPage = () => {
    // const { push } = useRouter();

    // Cek status login saat halaman dibuka
    // useEffect(() => {
    //     const loginStatus = localStorage.getItem("isLogin");

    //     if (loginStatus !== "true") {
    //         push("/auth/login");
    //     }
    // }, []);

    useEffect(() => {
        fetch("/api/produk")
            .then((response) => response.json())
            .then((responsdata) => {
                //console.log("Data produk:", responsdata.data);
                setProducts(responsdata.data);
            })
            .catch((error) => {
                console.error("Error fetching produk:", error);
            });
    }, []);

    return (
        <div>
        <h1>Daftar Produk</h1>
        {products.map((products: ProductType) => (
            <div key={products.id}>
                <h2>{products.name}</h2>
                <p>Harga: Rp {products.price}</p>
                <p>Ukuran: {products.size}</p>
            </div>
        ))}
        </div>
    );
};

export default kategori;