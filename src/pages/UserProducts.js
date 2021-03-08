import { v4 } from "uuid";
import AnimateHeight from "react-animate-height";
import "../styles/UserProducts.css";

import { useDispatch, useSelector } from "react-redux";
import { editProduct, changeActiveStatus } from "../actions/actions";

const UserProducts = () => {
  const dispatch = useDispatch();
  const productsStore = useSelector((state) => state.productsReducer);
  const isSectionActive = useSelector((state) => state.activeSectionReducer);
  const { isUserProductsActive } = isSectionActive;

  const showSection = () => {
    dispatch(changeActiveStatus("isUserProductsActive", !isUserProductsActive));
  };

  const changeActiveStat = (id, status) => {
    dispatch(editProduct(id, !status));
  };
  const filters = productsStore.map((item) => (
    <li key={v4()} className="userProducts__filter">
      <button
        className={`${
          item.active ? "activeFilter" : ""
        } userProducts__filterBtn`}
        onClick={() => changeActiveStat(item.id, item.active)}
      >
        {item.name}
      </button>
    </li>
  ));
  const height = isUserProductsActive ? "auto" : 0;

  const section = (
    <AnimateHeight duration={600} height={height}>
      <div className="userProducts__filters">
        <p>Zaznacz poniżej, które produkty już masz</p>
        <ul className="userProducts__filtersList">{filters}</ul>
      </div>
    </AnimateHeight>
  );

  return (
    <>
      <div className="userProducts">
        <button
          onClick={showSection}
          className={`userProducts__activeBtn ${
            isUserProductsActive && "userProducts__activeBtn--active"
          }`}
        >
          Produkty
        </button>
        {section}
      </div>
    </>
  );
};

export default UserProducts;
