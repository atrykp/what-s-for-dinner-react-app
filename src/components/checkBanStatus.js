import { compare } from "./compare";

const checkBanStatus = (
  allMeals,
  setAllMeals,
  setLocalStorage,
  setUserMeals,
  removeBanStatus
) => {
  const meals = [...allMeals];
  const banMeals = meals.filter(
    (element) => element.ban.status && element.ban.howLong !== "permament"
  );
  if (banMeals.length !== 0) {
    //pobranie aktualnego czasu
    let date = new Date().getTime();
    // dla każdego zbanowanego ale nie permamentnie
    banMeals.forEach((element) => {
      // destrukturycja element!!
      if (date - (element.ban.howLong + element.ban.sinceWhen) > 0) {
        removeBanStatus(element);
        // przywrócenie wartości domyślnych dla dania
        element.ban.status = false;
        element.ban.sinceWhen = "";
        element.ban.howLong = "";
        // index sprawdzanego dania w tablicy
        const index = meals.findIndex((elem) => elem.id === element.id);
        // nadpisanie dania poprzedniego teraźniejszym
        meals[index] = element;
        // wszystkie dania zaktualizowane oraz pamięć wszystkich dań

        setAllMeals(meals);
        setLocalStorage(meals, "allMeals");
        // dania uzytkownika nowa tablica pozniej w niej zapisuje dane do local storage
        compare(element, allMeals);
      }
    });
  }
};

export default checkBanStatus;
