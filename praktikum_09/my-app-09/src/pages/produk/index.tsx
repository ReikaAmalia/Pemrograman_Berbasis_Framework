import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TampilanProduk from "@/views/produk";
import useSWR from "swr";
import fetcher from "../utils/swr/fetcher";

// type ProductType = {
//     id: string;
//     name: string;
//     price: number;
//     size: string;
//     category: string;
//     image: string;
// }

// const fetcher = (url: string) => fetch(url).then((res) => res.json());
const kategori = () => {
    const [products, setProducts] = useState([]);
    const { data, error, isLoading } = useSWR("/api/produk", fetcher);
    // const ProdukPage = () => {
    // const { push } = useRouter();

    // Cek status login saat halaman dibuka
    // useEffect(() => {
    //     const loginStatus = localStorage.getItem("isLogin");

    //     if (loginStatus !== "true") {
    //         push("/auth/login");
    //     }
    // }, []);

  //   useEffect  (() => {
  //   fetch("/api/produk")
  //     .then((response) => response.json())
  //     .then((responsdata) => {
  //       setProducts(responsdata.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching produk:", error);
  //     });
  // }, []);


    return (
        <div>
        <TampilanProduk products={isLoading ? [] : data.data } />

        {/* <button onClick={fetchProducts}>
        Refresh Data
        </button> */}

        {/* {products.map((products: ProductType) => (
            <div key={products.id}>
                <h2>{products.name}</h2>
                <p>Harga: Rp {products.price}</p>
                <p>Ukuran: {products.size}</p>
                <p>Kategori: {products.category}</p>
                <img src={products.image} alt={products.name} width="200" />
            </div>
        ))} */}
        </div>
    );
};

export default kategori;