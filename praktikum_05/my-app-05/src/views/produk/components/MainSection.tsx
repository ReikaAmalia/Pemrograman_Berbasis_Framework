import Link from "next/link";

const MainSection = () => {
  return (
    <section className="p-8">
      <h2 className="text-2xl font-semibold mb-4">
        Daftar Produk
      </h2>

      <ul className="space-y-2">
        <li className="bg-gray-100 p-3 rounded-md shadow hover:bg-gray-200">
          <Link href="/produk/1" className="block">
            Produk 1
          </Link>
        </li>

        <li className="bg-gray-100 p-3 rounded-md shadow hover:bg-gray-200">
          <Link href="/produk/2" className="block">
            Produk 2
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default MainSection;