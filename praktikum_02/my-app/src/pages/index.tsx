import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Halaman Utama</h1>

      <p>Selamat datang di praktikum Next.js</p>

      <Link href="/about">
        <button>Lihat Halaman About</button>
      </Link>
    </div>
  );
}
