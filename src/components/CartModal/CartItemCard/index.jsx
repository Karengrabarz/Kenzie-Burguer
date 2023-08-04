
import { MdDelete } from "react-icons/md";
import style from "./style.module.scss";
export const CartItemCard = ({ removeItemCart, removeCount, product }) => {

  return (
    <li className={style.flexBox}>
      <div>
        <img src={product.img} alt={product.name} />
      </div>
      <div>
        <h3 className="title grey600">{product.name}</h3>
       
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
    </li>
  );
};
