import styles from "./style.module.scss";
export const ProductCard = ({ addItemCart, product }) => {
  return (
    <li className={styles.productCard}>
      <div className={styles.imgBox}>
        <img src={product.img} alt={product.name} />
      </div>
      <div className={styles.textBox}>
        <h3 className="title grey600">{product.name}</h3>
        <span className="span2 grey300">{product.category}</span>
        <span className="span1 primary">
          {product.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
        <button
          className="btn"
          onClick={() => {
            addItemCart(product);
          }}
        >
          Adicionar
        </button>
      </div>
    </li>
  );
};
