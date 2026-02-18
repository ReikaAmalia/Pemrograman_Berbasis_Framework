import { useRouter } from "next/router";

const HalamanProduk = () => {
  const router = useRouter();
  console.log(router);  

  return (
    <div>
      <h1>Halaman Produk</h1>
      <p>Produk:</p>
    </div>
  );
};

export default HalamanProduk;
