import { useRouter } from "next/router";
import { Roboto } from "next/font/google";
import dynamic from "next/dynamic";

// Navbar dimuat secara dynamic (lazy loading)
// artinya Navbar hanya dimuat saat dibutuhkan, bukan saat halaman pertama render
const Navbar = dynamic(() => import("@/components/navbar"), {
  ssr: false, // tidak dirender di server, hanya di client
  loading: () => <div>Loading navbar...</div>,
});

const disableNavbar = ["/auth/login", "/auth/register", "/404"];

type AppShellProps = {
  children: React.ReactNode;
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const AppShell = (props: AppShellProps) => {
  const { children } = props;
  const { pathname } = useRouter();

  return (
    <main className={roboto.className}>
      {!disableNavbar.includes(pathname) && <Navbar />}
      {children}
    </main>
  );
};

export default AppShell;