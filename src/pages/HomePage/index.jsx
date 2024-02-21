import { useState } from "react";
import { CartModal } from "../../components/CartModal";
import { Header } from "../../components/Header";
import { ProductList } from "../../components/ProductList";
import { productApi } from "../../services/api";
import { useEffect } from "react";

export const HomePage = () => {
  const localCartList = localStorage.getItem("@BurguerKenzie");
  const [cartList, setCartList] = useState(
    localCartList ? JSON.parse(localCartList) : []
  );

  const [productList, setProductList] = useState([]);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(localCartList ? JSON.parse(localCartList).reduce((acc,item)=>acc+item.quantity,0) : []);
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
    const cartItem = cartList.find((cartItem) => cartItem.id === item.id)
    if (cartItem) {
      const updatedList = cartList.map((cartItem)=>{
        if (cartItem.id === item.id){
          return {...cartItem, quantity: cartItem.quantity+1}
        }
        return cartItem
      })
      setCartList(updatedList);
      addCount();
    } else{
      setCartList([...cartList,{...item,quantity:1}]);
      addCount();
    }
  };
  
  const removeItemCart = (itemId) => {
    const cartItem = cartList.find((cartItem) => cartItem.id === itemId)
      if(cartItem.quantity>1){
        const updatedList = cartList.map((cartItem)=>{
          if (cartItem.id === itemId){
            return {...cartItem, quantity: cartItem.quantity-1}
          }
          return cartItem
        })
        setCartList(updatedList);
      }else{
        const newCartList = cartList.filter((cartItem) => cartItem.id !== itemId);
        setCartList(newCartList);
      }
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
            addItemCart={addItemCart}
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
