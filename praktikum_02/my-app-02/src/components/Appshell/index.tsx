import Navbar from "@/components/index";

type AppShellProps = {
children: React.ReactNode;
}

const AppShell = (props:AppShellProps) => {
    const { children } = props;
    return (
        <main>
        <Navbar />
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