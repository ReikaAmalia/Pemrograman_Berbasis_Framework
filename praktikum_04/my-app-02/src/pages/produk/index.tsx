import { useRouter } from "next/router";
import { useEffect } from "react";

const produk = () => {

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
            Produk User Page
        </div>
    );
};

export default produk;