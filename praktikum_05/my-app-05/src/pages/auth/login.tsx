import Link from "next/link";
import { useRouter } from "next/router";

const halamanLogin = () => {
    const {push} = useRouter();
    const handleLogin = () => {
        // Simpan status login
        localStorage.setItem("isLogin", "true");

        // logic login disini
        push("/produk");
    }
    return (
        <div>

            <h1>Halaman Login</h1>
            
            {/* <button onClick={handleLogin}>Login</button> <br /> */}
            {/* <button onClick={() => push('/produk')}>Login</button> <br /> */}

            {/* Navigasi Imperatif */}
            <button onClick={() => handleLogin()}>Login</button> <br />

            {/* Navigasi Link */}
            <Link href="/auth/register">Ke Halaman Register</Link>
        </div>
    );
};

export default halamanLogin;