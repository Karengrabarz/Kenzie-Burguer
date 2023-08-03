import { ProductCard } from "./ProductCard";
import styles from "./style.module.scss";
export const ProductList = ({ addItemCart, productListFinal, addCount }) => {
  return (
    <div className="container">
      {productListFinal.length > 0 ? (
        <ul className={styles.productList}>
          {productListFinal.map((product) => (
            <ProductCard
              addCount={addCount}
              addItemCart={addItemCart}
              key={product.id}
              product={product}
            />
          ))}
        </ul>
      ) : (
        <p>Nenhum produto encontrado</p>
      )}
    </div>
  );
};
