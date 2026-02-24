import { useRouter } from "next/router";

const halamanToko = () => {
    // const Router = useRouter();
    // console.log(Router);
    const { query } = useRouter();
    const slug = query.slug as string[] | undefined;

return (
<div>
    <h1>Halaman Toko</h1>
    <p>Kategori: {slug ? slug[0] : "Semua Kategori"}</p>
     <p>
        Toko: {Array.isArray(slug) ? slug.join("-") : "-"}
      </p>
    {/* <p>Toko: {`${query.slug && query.slug[0]+"-"+ query.slug[1]}`}</p>  menggunakan backtick bukan petik satu */}
    {/* <p>Toko: {Array.isArray(query.slug) ? query.slug.join("-") : query.slug}</p>  Berapapun banyaknya seqment tetap terbaca  */}
</div>
    );
};

export default halamanToko;