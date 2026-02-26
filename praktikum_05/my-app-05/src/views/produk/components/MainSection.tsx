import Link from "next/link";

const MainSection = () => {
  return (
    <section style={{ padding: "20px" }}>
      <h2>Daftar Produk</h2>
      <ul>
        <li>
          <Link href="/produk/1">Produk 1</Link>
        </li>
        <li>
          <Link href="/produk/2">Produk 2</Link>
        </li>
        <li>
          <Link href="/produk/3">Produk 3</Link>
        </li>
      </ul>
    </section>
  );
};

export default MainSection;