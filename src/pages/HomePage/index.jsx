import { useState } from "react";
import { CartModal } from "../../components/CartModal";
import { Header } from "../../components/Header";
import { ProductList } from "../../components/ProductList";
import { productApi } from "../../services/api";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const HomePage = () => {
  const localCartList = localStorage.getItem("@BurguerKenzie");
  const [cartList, setCartList] = useState(
    localCartList ? JSON.parse(localCartList) : []
  );

  const [productList, setProductList] = useState([]);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(cartList.length);
  const [isOpen, setIsOpen] = useState(false);

  const productResult = productList.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const productListFinal = search ? productResult : productList;
  // useEffect montagem - carrega os produtos da API e joga em productList
  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await productApi.get("/products");
        setProductList(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  // useEffect atualização - salva os produtos no localStorage (carregar no estado)
  useEffect(() => {
    localStorage.setItem("@BurguerKenzie", JSON.stringify(cartList));
  }, [cartList]);

  // adição, exclusão, e exclusão geral do carrinho
  const addItemCart = (item) => {
    if (!cartList.some((cartItem) => cartItem.id === item.id)) {
      setCartList([...cartList, item]);
      addCount();
      toast.success("Produto adicionado com sucesso.");
    } else {
      toast.error("Produto já adicionado");
    }
  };

  const removeItemCart = (itemId) => {
    const newCartList = cartList.filter((cartItem) => cartItem.id !== itemId);
    setCartList(newCartList);
  };

  const addCount = () => {
    setCount(count + 1);
  };
  const removeCount = () => {
    setCount(count - 1);
  };
  // renderizações condições e o estado para exibir ou não o carrinho
  // filtro de busca
  // estilizar tudo com sass de forma responsiva

  return (
    <>
      <Header setIsOpen={setIsOpen} count={count} setSearch={setSearch} />
      <main>
        <ProductList
          addCount={addCount}
          addItemCart={addItemCart}
          productListFinal={productListFinal}
        />
        {isOpen ? (
          <CartModal
            setIsOpen={setIsOpen}
            removeItemCart={removeItemCart}
            removeCount={removeCount}
            cartList={cartList}
            productListFinal={productListFinal}
            setCartList={setCartList}
            setCount={setCount}
          />
        ) : null}
      </main>
    </>
  );
};
