import Head from "next/head";
import styles from "@/styles/404.module.scss";

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>404 - Halaman Tidak Ditemukan</title>
        <meta
          name="description"
          content="Halaman yang Anda cari tidak tersedia."
        />
      </Head>

      <div className={styles.error}>
        <h1 className={styles.error_title}>
          404 - Halaman Tidak Ditemukan
        </h1>

        <p className={styles.error_desc}>
          Maaf, halaman yang Anda cari mungkin telah dipindahkan atau tidak tersedia.
        </p>

        <img
          src="/page-not-found.png"
          alt="Halaman tidak ditemukan"
          className={styles.error_image}
        />
      </div>
    </>
  );
};

export default Custom404;