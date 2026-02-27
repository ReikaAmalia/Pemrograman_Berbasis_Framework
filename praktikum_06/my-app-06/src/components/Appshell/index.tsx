import Navbar from "@/components/navbar";
import { useRouter } from "next/router";

const disableNavbar = ["/auth/login", "/auth/register", "/404"];
type AppShellProps = {
    children: React.ReactNode;
}

const AppShell = (props:AppShellProps) => {
    const { children } = props;
    const { pathname } = useRouter();
    const router = useRouter();
    console.log(router);
    
    return (
        <main>
            {!disableNavbar.includes(pathname) && <Navbar />}
        {children}
        <footer style={{ marginTop: "20px" }}>
            <hr />
            <p> © 2026 - Praktikum Next.js</p>
        </footer>
        <div>
        </div>
        </main>
    );
    };
    
export default AppShell;