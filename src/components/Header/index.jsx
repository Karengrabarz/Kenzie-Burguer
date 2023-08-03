import { useState } from "react";
import Logo from "../../assets/Logo.svg";
import { MdSearch, MdShoppingCart } from "react-icons/md";
import styles from "./style.module.scss";

export const Header = ({ setIsOpen, setSearch, count }) => {
  const [value, setValue] = useState("");
  const submit = (e) => {
    e.preventDefault();
    setSearch(value);
    setValue("");
  };
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerFlex}>
          <div className={styles.flexBox}>
            <img src={Logo} alt="Logo Kenzie Burguer" />
            <button className={styles.button} onClick={() => setIsOpen(true)}>
              <MdShoppingCart size={25} />
              <span className="btn sm">{count}</span>
            </button>
          </div>
          <form className={styles.form} onSubmit={submit}>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button className="btn md" type="submit">
              <MdSearch size={21} />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};
