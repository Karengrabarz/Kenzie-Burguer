import { MdClose } from "react-icons/md";
import { CartItemCard } from "./CartItemCard";
import styles from "./style.module.scss";
import { useOutClick } from "../../hooks/useOutClick";
import { useKeyDown } from "../../hooks/useKeyDown";

export const CartModal = ({
  setCartList,
  removeItemCart,
  removeCount,
  cartList,
  setCount,
  setIsOpen,
}) => {
  const modalRef = useOutClick(()=>{
    setIsOpen(false)
  })

  const buttonRef = useKeyDown('Escape',(element)=>{
    element.click()
  })
  

  const total = cartList.reduce((prevValue, product) => {
    return prevValue + product.price;
  }, 0);

  return (
    <div className={styles.modalOverlay} role="dialog">
      <div ref={modalRef} className={styles.flexBox}>
        <div className={styles.headerCart}>
          <h2 className="title white">Carrinho de compras</h2>
          <button
            ref={buttonRef}
            className="btnClose"
            aria-label="close"
            title="Fechar"
            onClick={() => setIsOpen(false)}
          >
            <MdClose size={21} />
          </button>
        </div>
        <div>
          <ul>
            {cartList.map((product) => (
              <CartItemCard
                removeItemCart={removeItemCart}
                removeCount={removeCount}
                key={product.id}
                product={product}
              />
            ))}
          </ul>
        </div>
        <div className={styles.footerCart}>
          <div>
            <span className="span1 grey600">Total</span>
            <span className="span1 grey300">
              {total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
          <button
            className="btnBig"
            onClick={() => {
              setCartList([]);
              setCount(0);
            }}
          >
            Remover todos
          </button>
        </div>
      </div>
    </div>
  );
};
