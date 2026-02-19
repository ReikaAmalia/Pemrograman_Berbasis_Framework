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
        <div>
            footer
        </div>
        </main>
    );
    };
    
export default AppShell;