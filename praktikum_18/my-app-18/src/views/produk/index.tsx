import styles from "../../styles/product.module.scss";
import Link from "next/link";
import Image from "next/image";

type ProductType = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

const TampilanProduk = ({ products = [] }: { products: ProductType[] }) => {
  return (
    <div className={styles.produk}>
      <h1 className={styles.produk__title}>Daftar Produk</h1>

      <div className={styles.produk__content}>
        {products.length > 0 ? (
          
          <>
          {products.map((product: ProductType) => (
            <Link href={`/produk/${product.id}`} key={product.id} className={styles.produk__content__item}>
              <div
                // key={product.id}
                // className={styles.produk__content__item}
              >
                <div className={styles.produk__content__item__image}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                  />
                </div>

                <h4 className={styles.produk__content__item__name}>
                  {product.name}
                </h4>

                <p className={styles.produk__content__item__category}>
                  {product.category}
                </p>

                <p className={styles.produk__content__item__price}>
                  Rp {product.price.toLocaleString("id-ID")}
                </p>
              </div>
            </Link>
          ))}
        </>

        ) : (
          <div className={styles.produk__content__skeleton}>
              <div className={styles.produk__content__skeleton__item__image}> </div> 
              <div className={styles.produk__content__skeleton__item__name}> </div>
              <div className={styles.produk__content__skeleton__item__category}> </div>
              <div className={styles.produk__content__skeleton__item__price}> </div> 
            </div>
        )}
      </div>
    </div>
  );
};

export default TampilanProduk;