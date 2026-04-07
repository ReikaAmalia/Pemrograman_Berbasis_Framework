import styles from "@/styles/404.module.scss";
import Link from "next/link";
import Image from "next/image";

const Custom404 = () => {
  return (
    <>
      {/* <Head>
        <title>404 - Halaman Tidak Ditemukan</title>
        <meta
          name="description"
          content="Halaman yang Anda cari tidak tersedia."
        />
      </Head> */}

      <div className={styles.error}>
        {/* <h1 className={styles.error_title}>
          404 - Halaman Tidak Ditemukan
        </h1>

        <p className={styles.error_desc}>
          Maaf, halaman yang Anda cari mungkin telah dipindahkan atau tidak tersedia.
        </p> */}

        {/* <img
          src="/page-not-found.png"
          alt="Halaman tidak ditemukan"
          className={styles.error_image}
        /> */}

          <Image
          src="/page-not-found.png"
          alt="404"
          width={400}
          height={200}
          className={styles.error_image}
          />

          <h1>404 - Halaman Tidak Ditemukan</h1>
          <p>Maaf, halaman yang Anda cari mungkin telah dipindahkan atau tidak tersedia.</p>


    {/* TUGAS 3: TOMBOL KEMBALI KE HOME */}
        {/* <Link href="/">
        <button className={styles.back_button}>
            Kembali ke Home
        </button>
        </Link> */}

      </div>
    </>
  );
};

export default Custom404;