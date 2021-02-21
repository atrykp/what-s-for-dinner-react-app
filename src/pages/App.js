import { useEffect, useState } from "react";
import "../styles/App.css";
import FilterArr from "./FileterArr";
import DrawnDishList from "./DrawnDishList";
import AddDish from "./AddDish";
import Dish from "./Dish";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
} from "react-router-dom";
import UserProducts from "./UserProducts";
import checkBanStatus from "../components/checkBanStatus";
import BannedDishes from "./BannedDishes";
import MoreMenu from "../components/MoreMenu";
let mainArr = [
  {
    name: "Klasyczna zapiekanka",
    ingredient: [
      { name: "bagietka długa", quantity: "1" },
      { name: "pieczarki", quantity: "500g" },
      { name: "ser żółty", quantity: "250g" },
      { name: "cebula", quantity: "1" },
      { name: "masło", quantity: "50g" },
      { name: "czosnek", quantity: "2 ząbki" },
      { name: "sól, pieprz, zioła prowansalskie, oregano", quantity: "" },
    ],
    description:
      "Powrót do przeszłości- zapiekanka z budki jak za dawnych lat. Ja przygotowuję ją w wersji klasycznej, ale można ją wzbogacić o szynkę, salami czy inne pyszności z lodówki.",
    steps: [
      {
        number: 1,
        value:
          "bagietkę przekrajamy na pół, następnie obie połówki dzielimy również na dwie części. Układamy je na blachę wyłożoną papierem do pieczenia.",
      },
      {
        number: 2,
        value:
          "Pieczarki obieramy i trzemy na tarce o dużych oczkach. Cebulę kroimy w kostkę. Na łyżce masła podsmażamy cebulę następnie dodajemy pieczarki. Smażymy do odparowania wody, następnie doprawiamy solą, pieprzem i ziołami prowansalskimi.",
      },
      {
        number: 3,
        value:
          "Pozostałe masło rozgniatamy, przyprawiamy solą, pieprzem i oregano. Dodajemy przeciśnięty przez praskę czosnek i mieszamy. Tak przygotowanym masłem smarujemy bagietki.",
      },
      {
        number: 4,
        value:
          "Na bagietki układamy pieczarki i tak przygotowane zapiekanki wstawiamy do piekarnika nagrzanego do temp. 200 st. i pieczemy przez 5 min. Następnie wyjmujemy, posypujemy startym serem i wstawiamy na ok 12 min- do rozpuszczenia sera. ",
      },
      {
        number: 5,
        value:
          "Tak przygotowane zapiekanki doskonale smakują polane keczupem i posypane rukolą.",
      },
    ],
    id: 1,
    ban: { status: false, howLong: "", sinceWhen: "" },
  },
  {
    name: "Tagliatelle z mascarpone",
    ingredient: [
      { name: "makaron tagliatelle", quantity: "200g" },
      { name: "cukinia", quantity: "1" },
      { name: "cebula", quantity: "1" },
      { name: "mascarpone", quantity: "250g" },
      { name: "pierś z kurczaka", quantity: "500g" },
      { name: "sól, pieprz, kurkuma, przyprawa do kurczaka", quantity: "" },
    ],
    description:
      "Uwielbiam makaron tagliatelle, a połączenie z kremowym sosem mascarpone tworzy idealną kompozycję smakową.",
    steps: [
      {
        number: 1,
        value: "Makaron gotujemy zgodnie z instrukcją na opakowaniu.",
      },
      {
        number: 2,
        value:
          "Kurczka myjemy, kroimy w kostkę, doprawiamy przyprawą do kurczaka, solą, pieprzem i kurkumą. Cebulę i cukinię także kroimy w kostkę.",
      },
      {
        number: 3,
        value:
          "Na patelni na łyżce oleju podsmażamy cebulkę, gdy się zarumieni dodajemy cukinię. Smażymy przez chwilę, następnie dodajemy kurczaka. Gdy wszystkie składniki są podsmażone dodajemy mascarpone. gotujemy do całkowitego rozpuszczenia mascarpone. ",
      },
      {
        number: 4,
        value: "Makaron łączymy z sosem i podajemy na głębokich talerzach.",
      },
    ],
    id: 2,
    ban: { status: false, howLong: "", sinceWhen: "" },
  },
  {
    name: "Schab pieczony w ziemniakach",
    ingredient: [
      { name: "schab", quantity: "1 kg" },
      { name: "papryka czerwona", quantity: "1" },
      { name: "cebula", quantity: "3" },
      { name: "ziemniak", quantity: "6" },
      { name: "sól, pieprz, papryka słodka", quantity: "" },
    ],
    description: "Świetna propozycja na jednogarnkowe i pyszne danie.",
    steps: [
      {
        number: 1,
        value:
          "Schab myjemy osuszamy i kroimy w plastry. Lekko rozbijamy. Posypujemy solą, pieprzem i słodką papryką.",
      },
      {
        number: 2,
        value:
          "Paprykę kroimy w paski, cebulę w półksiężyce. Ziemniaki na ćwiartki.",
      },
      {
        number: 3,
        value:
          "Piekarnik nastawiamy na 200 st. W naczyniu żaroodpornym wysmarowanym masłem układamy schab na przemian z papyką i cebulą. Po bokach wokół schabu układamy ziemniaki.",
      },
      {
        number: 4,
        value:
          "Schab do piekarnika wstawiamy pod przykryciem na 1h 40min, następnie odkrywamy i pieczemy przez kolejne 20 min.",
      },
    ],
    id: 3,
    ban: { status: false, howLong: "", sinceWhen: "" },
  },
];

function App() {
  const [allDishes, setAllDishes] = useState(
    JSON.parse(localStorage.getItem("allDishes")) || [...mainArr]
  );
  const [userDishes, setUserDishes] = useState(
    JSON.parse(localStorage.getItem("userDishes")) || null
  );
  const [matchDishes, setMatchDishes] = useState([]);
  const [isUserProductsActive, setIsUserProductsActive] = useState(false);
  const [selectedDish, setSelectedDish] = useState(
    JSON.parse(localStorage.getItem("selectedDish")) || ""
  );

  // checks if dish can be added
  const compare = (element) => {
    let userDishesArray = [];
    // pobranie aktualnych filtrów użytkownika
    const filtersArray =
      JSON.parse(localStorage.getItem("userFilterArr")) || null;
    // jeżeli jakieś są
    if (filtersArray) {
      // aktywne filtry
      const activeFilters = filtersArray.filter((item) => item.active);
      let flag = false;
      // element czyli danie aktualnie sprawdzane jego składniki jeden po drugim
      element.ingredient.forEach((item) => {
        //porównanie każdego filtra aktywnego ze składnikiem jeżeli nazwa składnika będzie zgodna z nazwą aktywnego filtra flaga na true
        activeFilters.forEach((elem) => {
          if (elem.name === item.name) {
            console.log("przefiltrowane");
            flag = true;
          }
        });
      });
      // jeżeli żaden aktywny filtr nie wyklucza składnika sprawdzanego elemetnu dodajemy element do tablicy
      // jakiś błąd is not iterable w 104 linii jak się zbanuje dwa i czeka się na ich powrót
      if (!flag) {
        setUserDishes((prevValue) => {
          userDishesArray = [...prevValue, element];
        });
        setLocalStorage(userDishesArray, "userDishes");
      }
    } else {
      setUserDishes((prevValue) => {
        if (prevValue) {
          userDishesArray = [...prevValue, element];
        } else {
          userDishesArray = [...allDishes, element];
        }
        return userDishesArray;
      });
      setLocalStorage(userDishesArray, "userDishes");
    }
  };

  useEffect(() => {
    const banInterval = setInterval(() => {
      checkBanStatus(allDishes, setAllDishes, setLocalStorage, compare);
    }, 6000);
    return () => {
      clearInterval(banInterval);
    };
  }, [allDishes]);

  const updateUserDishes = (arr) => {
    setUserDishes(arr);
    setLocalStorage(arr, "userDishes");
  };
  const banDish = (id, time, howLong) => {
    const dishes = [...allDishes];
    const dishIndex = dishes.findIndex((elem) => elem.id === id);
    const dish = dishes[dishIndex];
    dish.ban = {
      status: true,
      sinceWhen: time,
      howLong,
    };
    setAllDishes(dishes);
    setLocalStorage(dishes, "allDishes");

    if (userDishes) {
      let arr = [...userDishes];
      const userDishIndex = arr.findIndex((element) => element.id === id);
      if (userDishIndex !== -1) {
        arr.splice(userDishIndex, 1);
        setUserDishes(arr);
        setLocalStorage(arr, "userDishes");
      }
    } else {
      const arrWithActive = dishes.filter((element) => !element.ban.status);
      setUserDishes(arrWithActive);
      setLocalStorage(arrWithActive, "userDishes");
    }
  };
  const UserProductsSection = (
    <UserProducts
      setSelectedDish={setSelectedDish}
      userDishes={userDishes}
      allDishes={allDishes}
      setMatchDishes={setMatchDishes}
      setIsUserProductsActive={setIsUserProductsActive}
    />
  );

  const fileterSection = (
    <FilterArr
      setSelectedDish={setSelectedDish}
      userDishes={userDishes}
      allDishes={allDishes}
      updateUserDishes={updateUserDishes}
      isUserProductsActive={isUserProductsActive}
    />
  );

  const updateAllDishes = (dish) => {
    const allDishesArr = [...allDishes];
    allDishesArr.push(dish);
    setAllDishes(allDishesArr);
    setLocalStorage(allDishesArr, "allDishes");
    compare(dish);
  };
  const setLocalStorage = (arr, name) => {
    localStorage.setItem(name, JSON.stringify(arr));
  };

  const getDishesArray = () => {
    if (isUserProductsActive) {
      return matchDishes;
    }
    if (userDishes) {
      return userDishes;
    } else {
      return allDishes;
    }
  };

  const dishesCounter = (
    <p>
      Liczba dań <span>{getDishesArray().length}</span>
    </p>
  );
  const mainPageStructure = (
    <>
      <div className="upperNav">
        <div className="upperNav__userProducts">{UserProductsSection}</div>
        <div className="upperNav__counter">{dishesCounter}</div>
        <div className="upperNav__filters">{fileterSection}</div>
      </div>
      <div>
        <DrawnDishList
          selectedDish={selectedDish}
          setSelectedDish={setSelectedDish}
          customedArr={getDishesArray()}
          banDish={banDish}
          setIsUserProductsActive={setIsUserProductsActive}
        />
      </div>

      <div className="lowerNav">
        <NavLink to="/addDish" className="lowerNav__add">
          Dodaj
        </NavLink>
        <MoreMenu />
      </div>
    </>
  );

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {mainPageStructure}
        </Route>
        <Route path="/bannedDishes">
          <BannedDishes
            allDishes={allDishes}
            setAllDishes={setAllDishes}
            setLocalStorage={setLocalStorage}
            compare={compare}
          />
        </Route>
        <Route path="/addDish">
          <AddDish updateAllDishes={updateAllDishes} />
        </Route>
        <Route path="/dish/:id">
          <Dish selectedDish={selectedDish} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
