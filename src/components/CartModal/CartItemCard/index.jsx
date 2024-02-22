
import { MdDelete } from "react-icons/md";
import style from "./style.module.scss";

export const CartItemCard = ({removeItemCart, removeCount, product,addItemCart }) => {
   
  return (
    <li className={style.flexBox}>
      <div>
        <img src={product.img} alt={product.name} />
      </div>
      <div className={style.cart} >
        <h3 className="title-sm grey600">{product.name}</h3>
        <div className={style.priceCart} >
          <div className={style.qty}>
            <button onClick={()=>{
              removeItemCart(product.id)
              removeCount()
            }}
            >-</button>
            <span>{product.quantity}</span>
            <button  onClick={() => {
                addItemCart(product);
              }}>+</button>
          </div>
          <div>
            R$ {product.price * product.quantity}
          </div>
          <button
            aria-label="delete"
            title="Remover item"
            onClick={() => {
              removeCount();
              removeItemCart(product.id);
            }}
          >
            <MdDelete size={21} />
          </button>
        </div>
      </div>
    </li>
  );
};
