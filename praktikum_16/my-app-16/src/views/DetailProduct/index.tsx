import { ProductType } from "../../types/product.type";
import styles from "../DetailProduct/detailProduct.module.scss";

const DetailProduk = ({ products }: { products: ProductType }) => {
  return (
    <>
    <h1 className={styles.produkDetail__title}>Detail Produk</h1>
    <div className={styles.produkDetail}>
      <div className={styles.produkDetail__image}>
        <img src={products.image && products.image} alt={products.name} />
      </div>

      <div className={styles.produkDetail__info}>
        <h1 className={styles.produkDetail__name}>{products.name}</h1>
        <p className={styles.produkDetail__category}>{products.category}</p>
        <p className={styles.produkDetail__price}>
          Rp {products.price && products.price.toLocaleString("id-ID")}
        </p>
      </div>
    </div>
    </>
  );
};

export default DetailProduk;