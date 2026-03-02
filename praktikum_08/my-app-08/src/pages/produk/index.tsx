import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TampilanProduk from "@/views/produk";

type ProductType = {
    id: string;
    name: string;
    price: number;
    size: string;
    category: string;
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

    const fetchProducts = () => {
    fetch("/api/produk")
      .then((response) => response.json())
      .then((responsdata) => {
        setProducts(responsdata.data);
      })
      .catch((error) => {
        console.error("Error fetching produk:", error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

    return (
        <div>
        <h1>Daftar Produk</h1>

        <button onClick={fetchProducts}>
        Refresh Data
        </button>

        {products.map((products: ProductType) => (
            <div key={products.id}>
                <h2>{products.name}</h2>
                <p>Harga: Rp {products.price}</p>
                <p>Ukuran: {products.size}</p>
                <p>Kategori: {products.category}</p>
            </div>
        ))}
        </div>
    );
};

export default kategori;