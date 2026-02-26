import { useRouter } from "next/router";
import { useEffect } from "react";
import TampilanProduk from "@/views/produk";

const ProdukPage = () => {

    const { push } = useRouter();

    // Cek status login saat halaman dibuka
    useEffect(() => {
        const loginStatus = localStorage.getItem("isLogin");

        if (loginStatus !== "true") {
            push("/auth/login");
        }
    }, []);

    return (
        <div>
            <TampilanProduk />
        </div>
    );
};

export default ProdukPage;