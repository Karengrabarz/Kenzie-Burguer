// import { useState } from "react";
import { MdDelete } from "react-icons/md";
import style from "./style.module.scss";
export const CartItemCard = ({ removeItemCart, removeCount, product }) => {
  // const [count,setCount] =useState(0)
  return (
    <li className={style.flexBox}>
      <div>
        <img src={product.img} alt={product.name} />
      </div>
      <div>
        <h3 className="title grey600">{product.name}</h3>
        {/* <p className="span2">Quantidade: {count}</p> */}

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
