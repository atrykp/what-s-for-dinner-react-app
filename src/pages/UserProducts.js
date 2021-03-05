import { v4 } from "uuid";
import "../styles/UserProducts.css";
import { CSSTransition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { editProduct, changeActiveStatus } from "../actions/actions";

const UserProducts = () => {
  const dispatch = useDispatch();
  const productsStore = useSelector((state) => state.productsReducer);
  const isSectionActive = useSelector((state) => state.activeSectionReducer);
  const setIsUserProductsActive = isSectionActive.find(
    (element) => element.name === "isUserProductsActive"
  );

  const showSection = () => {
    dispatch(
      changeActiveStatus(
        setIsUserProductsActive.name,
        !setIsUserProductsActive.status
      )
    );
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
  const section = (
    <CSSTransition
      in={setIsUserProductsActive.status}
      timeout={300}
      classNames="sample"
      unmountOnExit
      appear
    >
      <div className="userProducts__filters">
        <p>Zaznacz poniżej, które produkty już masz</p>
        <ul className="userProducts__filtersList">{filters}</ul>
      </div>
    </CSSTransition>
  );

  return (
    <>
      <div className="userProducts">
        <button
          onClick={showSection}
          className={`userProducts__activeBtn ${
            setIsUserProductsActive.status && "userProducts__activeBtn--active"
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
