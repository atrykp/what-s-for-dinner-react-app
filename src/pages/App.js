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
import BannedMeals from "./BannedMeals";
import MoreMenu from "../components/MoreMenu";
import { compare } from "../components/compare";

import { useDispatch, useSelector } from "react-redux";
import { changeBanStatus } from "../actions/actions";

// let mainArr = [
//   {
//     name: "Klasyczna zapiekanka",
//     ingredient: [
//       { name: "bagietka długa", quantity: "1" },
//       { name: "pieczarki", quantity: "500g" },
//       { name: "ser żółty", quantity: "250g" },
//       { name: "cebula", quantity: "1" },
//       { name: "masło", quantity: "50g" },
//       { name: "czosnek", quantity: "2 ząbki" },
//       { name: "sól, pieprz, zioła prowansalskie, oregano", quantity: "" },
//     ],
//     description:
//       "Powrót do przeszłości- zapiekanka z budki jak za dawnych lat. Ja przygotowuję ją w wersji klasycznej, ale można ją wzbogacić o szynkę, salami czy inne pyszności z lodówki.",
//     steps: [
//       {
//         number: 1,
//         value:
//           "bagietkę przekrajamy na pół, następnie obie połówki dzielimy również na dwie części. Układamy je na blachę wyłożoną papierem do pieczenia.",
//       },
//       {
//         number: 2,
//         value:
//           "Pieczarki obieramy i trzemy na tarce o dużych oczkach. Cebulę kroimy w kostkę. Na łyżce masła podsmażamy cebulę następnie dodajemy pieczarki. Smażymy do odparowania wody, następnie doprawiamy solą, pieprzem i ziołami prowansalskimi.",
//       },
//       {
//         number: 3,
//         value:
//           "Pozostałe masło rozgniatamy, przyprawiamy solą, pieprzem i oregano. Dodajemy przeciśnięty przez praskę czosnek i mieszamy. Tak przygotowanym masłem smarujemy bagietki.",
//       },
//       {
//         number: 4,
//         value:
//           "Na bagietki układamy pieczarki i tak przygotowane zapiekanki wstawiamy do piekarnika nagrzanego do temp. 200 st. i pieczemy przez 5 min. Następnie wyjmujemy, posypujemy startym serem i wstawiamy na ok 12 min- do rozpuszczenia sera. ",
//       },
//       {
//         number: 5,
//         value:
//           "Tak przygotowane zapiekanki doskonale smakują polane keczupem i posypane rukolą.",
//       },
//     ],
//     id: 1,
//     ban: { status: false, howLong: "", sinceWhen: "" },
//   },
//   {
//     name: "Tagliatelle z mascarpone",
//     ingredient: [
//       { name: "makaron tagliatelle", quantity: "200g" },
//       { name: "cukinia", quantity: "1" },
//       { name: "cebula", quantity: "1" },
//       { name: "mascarpone", quantity: "250g" },
//       { name: "pierś z kurczaka", quantity: "500g" },
//       { name: "sól, pieprz, kurkuma, przyprawa do kurczaka", quantity: "" },
//     ],
//     description:
//       "Uwielbiam makaron tagliatelle, a połączenie z kremowym sosem mascarpone tworzy idealną kompozycję smakową.",
//     steps: [
//       {
//         number: 1,
//         value: "Makaron gotujemy zgodnie z instrukcją na opakowaniu.",
//       },
//       {
//         number: 2,
//         value:
//           "Kurczka myjemy, kroimy w kostkę, doprawiamy przyprawą do kurczaka, solą, pieprzem i kurkumą. Cebulę i cukinię także kroimy w kostkę.",
//       },
//       {
//         number: 3,
//         value:
//           "Na patelni na łyżce oleju podsmażamy cebulkę, gdy się zarumieni dodajemy cukinię. Smażymy przez chwilę, następnie dodajemy kurczaka. Gdy wszystkie składniki są podsmażone dodajemy mascarpone. gotujemy do całkowitego rozpuszczenia mascarpone. ",
//       },
//       {
//         number: 4,
//         value: "Makaron łączymy z sosem i podajemy na głębokich talerzach.",
//       },
//     ],
//     id: 2,
//     ban: { status: false, howLong: "", sinceWhen: "" },
//   },
//   {
//     name: "Schab pieczony w ziemniakach",
//     ingredient: [
//       { name: "schab", quantity: "1 kg" },
//       { name: "papryka czerwona", quantity: "1" },
//       { name: "cebula", quantity: "3" },
//       { name: "ziemniak", quantity: "6" },
//       { name: "sól, pieprz, papryka słodka", quantity: "" },
//     ],
//     description: "Świetna propozycja na jednogarnkowe i pyszne danie.",
//     steps: [
//       {
//         number: 1,
//         value:
//           "Schab myjemy osuszamy i kroimy w plastry. Lekko rozbijamy. Posypujemy solą, pieprzem i słodką papryką.",
//       },
//       {
//         number: 2,
//         value:
//           "Paprykę kroimy w paski, cebulę w półksiężyce. Ziemniaki na ćwiartki.",
//       },
//       {
//         number: 3,
//         value:
//           "Piekarnik nastawiamy na 200 st. W naczyniu żaroodpornym wysmarowanym masłem układamy schab na przemian z papyką i cebulą. Po bokach wokół schabu układamy ziemniaki.",
//       },
//       {
//         number: 4,
//         value:
//           "Schab do piekarnika wstawiamy pod przykryciem na 1h 40min, następnie odkrywamy i pieczemy przez kolejne 20 min.",
//       },
//     ],
//     id: 3,
//     ban: { status: false, howLong: "", sinceWhen: "" },
//   },
//   {
//     name: "Spaghetti",
//     ingredient: [
//       { name: "makaron spaghetti", quantity: "300g" },
//       { name: "sos pomidorowy Dawtona", quantity: "1 słoik" },
//       { name: "mięso mielone", quantity: "500g" },
//       { name: "sól, pieprz, słodka papryka, ostra papryka", quantity: "" },
//       { name: "olej do smażenia", quantity: "" },
//       { name: "", quantity: "" },
//     ],
//     description:
//       "Spaghetti to szybkie i pożywne danie, które z pewnością gości na większości stołów. Sposobów na jego wykonanie jest wiele- można je zrobić z pomidorami z puszki, z passatą pomidorową czy też z gotowym sosem z torebki. Ja zastępuję passatę sosem pomidorowym Dawtona, który można kupić w Auchan.",
//     steps: [
//       {
//         number: 1,
//         value: "Makaron ugotój zgodnie z instrukcją na opakowaniu. ",
//       },
//       {
//         number: 2,
//         value:
//           "Na patelni rozgrzej łyżkę oleju, wrzuć mięso i smaż aż stanie się brązowe. Następnie dopraw solą, pieprzem, papryką słodką oraz ostrą.",
//       },
//       {
//         number: 3,
//         value: "Do mięsa wlej cały słoik sosu i duś jeszcze przez ok. 5min. ",
//       },
//       {
//         number: 4,
//         value: "Połącz makaron z sosem. Danie podawaj posypane parmezanem.",
//       },
//       {
//         number: 5,
//         value:
//           "Jeżeli chcesz wzbogacić swoje danie możesz dodać do sosu oliwki i pokrojoną w kostkę czerwoną paprykę.",
//       },
//     ],
//     id: 4,
//     ban: { status: false, howLong: "", sinceWhen: "" },
//   },
//   {
//     name: "Schab w sosie koperkowym",
//     ingredient: [
//       { name: "schab bez kości ", quantity: "600g" },
//       { name: "bulion drobiowy", quantity: "500 ml" },
//       { name: "marchewka", quantity: "1" },
//       { name: "cebula", quantity: "1/2" },
//       { name: "czosnek", quantity: "ząbek" },
//       { name: "śmietana 30%", quantity: "150 ml" },
//       { name: "mąka pszenna", quantity: "2 łyżki " },
//       { name: "koperek", quantity: "2 łyżki " },
//       { name: "olej", quantity: "1 łyżka" },
//       { name: "sól, pieprz", quantity: "" },
//     ],
//     description:
//       "Niesamowicie pyszne danie! Kiedy zrobiłam go po raz pierwszy polecałam go wszystkim znajomym. Może i Tobie posmakuje równie mocno jak mi ;)",
//     steps: [
//       {
//         number: 1,
//         value:
//           "Mięso kroimy w plastry i robijamy. Na patelni rozgrzewamy olej i smażymy plastry schabu przez ok. 5 min z każdej strony",
//       },
//       {
//         number: 2,
//         value:
//           "Gotujemy bulion, wlewamy go do mięsa i przyprawiamy solą i pieprzem. ",
//       },
//       {
//         number: 3,
//         value:
//           "Kiedy bulion się zagotuje zmniejszamy ogień i dusimy pod przykryciem przez godzinę. Po pół godziny dodajemy przeciśnięty przez praskę czosnek, startą marchewkę i pokrojoną w kostkę cebulę.",
//       },
//       {
//         number: 4,
//         value:
//           "Mieszamy mąkę ze śmietaną i dodajemy do mięsa. Zagotowujemy i dodajemy koperek.",
//       },
//       {
//         number: 5,
//         value:
//           "Schab przepysznie smakuje z gotowanymi ziemniakami i ulubioną surówką.",
//       },
//     ],
//     id: 5,
//     ban: { status: false, howLong: "", sinceWhen: "" },
//   },
//   {
//     name: "Zapiekanka ziemniaczana z mięsem mielonym",
//     ingredient: [
//       { name: "mięso mielone", quantity: "500g" },
//       { name: "ziemniaki", quantity: "8 sztuk" },
//       { name: "pomidory krojone ", quantity: "1 puszka" },
//       { name: "cebula", quantity: "1" },
//       { name: "czosnek", quantity: "2 ząbki" },
//       { name: "śmietana 18%", quantity: "330g" },
//       { name: "jajko", quantity: "2" },
//       { name: "ser żółty", quantity: "pół kostki" },
//       {
//         name: "sól, pieprz, słodka papryka, papryka chilli, tymianek",
//         quantity: "",
//       },
//       { name: "olej", quantity: "1 łyżka" },
//     ],
//     description:
//       "Zapiekanka ziemniaczana z mięsem mielonym świetnie sprawdzi się jako obiad na dwa dni, bo po podgrzaniu jest tak samo pyszna.",
//     steps: [
//       {
//         number: 1,
//         value:
//           "Ziemniaki obrać, pokroić w plastry i gotować przez 8 min w osolonej wodzie.",
//       },
//       {
//         number: 2,
//         value:
//           "Cebulę i czosnek pokroić w kostkę i podsmażyć na rozgrzanym oleju. Dodać mięso, smażyć, aż będzie brązowe.",
//       },
//       {
//         number: 3,
//         value:
//           "Na patelnię dodajemy puszkę pomidorów i przyprawiamy. Smażymy jeszcze przez chwilę.",
//       },
//       {
//         number: 4,
//         value:
//           "w naczyniu żaroodpornym układamy połowę ziemniaków, wykładamy na nie mięso z patelni, na mięso układamy drugą połowę ziemniaków.",
//       },
//       {
//         number: 5,
//         value:
//           "W osobnym naczyniu przygotowujemy sos. Łączymy śmietanę z jajkami i serem. Wylewamy na zapiekankę. ",
//       },
//       {
//         number: 6,
//         value:
//           "Zapiekankę wstawiamy do nagrzanego do 180 st. piekarnika i pieczemy przez ok 30 min. Do całkowitej miękkości ziemniaków. Pod koniec pieczenia można włączyć termoobieg, żeby przypiec sos z wierzchu.",
//       },
//     ],
//     id: 6,
//     ban: { status: false, howLong: "", sinceWhen: "" },
//   },
// ];
export const setLocalStorage = (arr, name) => {
  localStorage.setItem(name, JSON.stringify(arr));
};

function App() {
  const dispatch = useDispatch(changeBanStatus);
  const mealsStore = useSelector((state) => state.mealsReducer);

  const [allMeals, setAllMeals] = useState(
    JSON.parse(localStorage.getItem("allMeals")) || mealsStore
  );
  const [userMeals, setUserMeals] = useState(
    JSON.parse(localStorage.getItem("userMeals")) || null
  );
  const [matchMeals, setMatchMeals] = useState([]);
  const [isUserProductsActive, setIsUserProductsActive] = useState(false);
  const [selectedDish, setSelectedDish] = useState(
    JSON.parse(localStorage.getItem("selectedDish")) || ""
  );

  useEffect(() => {
    const banInterval = setInterval(() => {
      checkBanStatus(
        allMeals,
        setAllMeals,
        setLocalStorage,
        setUserMeals,
        removeBanStatus
      );
    }, 6000);
    return () => {
      clearInterval(banInterval);
    };
  }, [allMeals]);

  const updateUserMeals = (arr) => {
    setUserMeals(arr);
    setLocalStorage(arr, "userMeals");
  };

  console.log(mealsStore);

  const removeBanStatus = (dish) => {
    dispatch(
      changeBanStatus(dish.id, { status: false, howLong: "", sinceWhen: "" })
    );
  };
  const banDish = (id, time, howLong) => {
    const meals = [...allMeals];
    const dishIndex = meals.findIndex((elem) => elem.id === id);
    const dish = meals[dishIndex];
    // ---------------------------------------

    dispatch(changeBanStatus(id, { status: true, howLong, sinceWhen: time }));

    //------------------------------------------

    dish.ban = {
      status: true,
      sinceWhen: time,
      howLong,
    };
    setAllMeals(meals);
    setLocalStorage(meals, "allMeals");

    if (userMeals) {
      let arr = [...userMeals];
      const userDishIndex = arr.findIndex((element) => element.id === id);
      if (userDishIndex !== -1) {
        arr.splice(userDishIndex, 1);
        setUserMeals(arr);
        setLocalStorage(arr, "userMeals");
      }
    } else {
      const arrWithActive = meals.filter((element) => !element.ban.status);
      setUserMeals(arrWithActive);
      setLocalStorage(arrWithActive, "userMeals");
    }
  };
  const UserProductsSection = (
    <UserProducts
      setSelectedDish={setSelectedDish}
      userMeals={userMeals}
      allMeals={allMeals}
      setMatchMeals={setMatchMeals}
      setIsUserProductsActive={setIsUserProductsActive}
    />
  );

  const fileterSection = (
    <FilterArr
      setSelectedDish={setSelectedDish}
      userMeals={userMeals}
      allMeals={allMeals}
      updateUserMeals={updateUserMeals}
      isUserProductsActive={isUserProductsActive}
    />
  );

  const updateAllMeals = (dish) => {
    const allMealsArr = [...allMeals];
    allMealsArr.push(dish);
    setAllMeals(allMealsArr);
    setLocalStorage(allMealsArr, "allMeals");
    compare(dish, setUserMeals, allMeals);
  };

  const getMealsArray = () => {
    if (isUserProductsActive) {
      return matchMeals;
    }
    if (userMeals) {
      return userMeals;
    } else {
      return allMeals;
    }
  };

  const mealsCounter = (
    <p>
      Liczba dań <span>{getMealsArray().length}</span>
    </p>
  );
  const mainPageStructure = (
    <div className="appWrapper">
      <div className="upperNav">
        <div className="upperNav__userProducts">{UserProductsSection}</div>
        <div className="upperNav__counter">{mealsCounter}</div>
        <div className="upperNav__filters">{fileterSection}</div>
      </div>
      <div>
        <DrawnDishList
          selectedDish={selectedDish}
          setSelectedDish={setSelectedDish}
          customedArr={getMealsArray()}
          banDish={banDish}
          setIsUserProductsActive={setIsUserProductsActive}
        />
      </div>

      <div className="lowerNav">
        <NavLink to="/addDish" className="lowerNav__add">
          <i className="fas fa-plus-circle"></i>
        </NavLink>
        <div className="menu">
          <MoreMenu />
        </div>
      </div>
    </div>
  );

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {mainPageStructure}
        </Route>
        <Route path="/bannedMeals">
          <BannedMeals
            allMeals={allMeals}
            setAllMeals={setAllMeals}
            setLocalStorage={setLocalStorage}
            setUserMeals={setUserMeals}
          />
        </Route>
        <Route path="/addDish">
          <AddDish updateAllMeals={updateAllMeals} />
        </Route>
        <Route path="/dish/:id">
          <Dish selectedDish={selectedDish} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
