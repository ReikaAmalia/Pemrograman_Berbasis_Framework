import Navbar from "@/components/navbar";
import { useRouter } from "next/router";
import { Roboto } from "next/font/google";

// Daftar path yang tidak menampilkan Navbar
const disableNavbar = ["/auth/login", "/auth/register", "/404"];
type AppShellProps = {
    children: React.ReactNode;
}

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

const AppShell = (props:AppShellProps) => {
    const { children } = props;
    const { pathname } = useRouter();
    const router = useRouter();
    console.log(router);
    
    return (
        <main className={roboto.className}>
            {!disableNavbar.includes(pathname) && <Navbar />}
        {children}
        {/* <footer style={{ marginTop: "20px" }}>
            <hr />
            <p> © 2026 - Praktikum Next.js</p>
        </footer> */}
        </main>
    );
    };
    
export default AppShell;