import Head from 'next/head'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import styles from '@/styles/Home.module.css'

type HomeProps = {
  appName: string
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  return {
    props: {
      appName: process.env.APP_NAME ?? 'Tugas Paas Saya',
    },
  }
}

export default function Home({ appName }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Praktikum Next.js Pages Router</title>
      </Head>

      <div>
        <h1>Praktikum Next.js Pages Router</h1>
        {/* <p>Mahasiswa D4 Pengembangan Web</p> */}
        <p className={styles.appName}><strong>{appName}</strong></p>
      </div>
    </>
  );
}
