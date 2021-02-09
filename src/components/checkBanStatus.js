const checkBanStatus = (
  allDishes,
  setAllDishes,
  setAllDishesStorage,
  setUserDishes,
  setUserStorage,
  compare
) => {
  console.log("sprawdzam");

  const dishes = [...allDishes];
  console.log(dishes);

  const banDishes = dishes.filter(
    (element) => element.ban.status && element.ban.howLong !== "permament"
  );
  if (banDishes.length !== 0) {
    //pobranie aktualnego czasu
    let date = new Date().getTime();
    // dla każdego zbanowanego ale nie permamentnie
    banDishes.forEach((element) => {
      // destrukturycja element!!
      if (date - (element.ban.howLong + element.ban.sinceWhen) > 0) {
        // przywrócenie wartości domyślnych dla dania
        element.ban.status = false;
        element.ban.sinceWhen = "";
        element.ban.howLong = "";
        // index sprawdzanego dania w tablicy
        const index = dishes.findIndex((elem) => elem.id === element.id);
        // nadpisanie dania poprzedniego teraźniejszym
        dishes[index] = element;
        // wszystkie dania zaktualizowane oraz pamięć wszystkich dań
        console.log(dishes);

        setAllDishes(dishes);
        setAllDishesStorage(dishes);
        // dania uzytkownika nowa tablica pozniej w niej zapisuje dane do local storage
        compare(element);
      }
    });
  }
};

export default checkBanStatus;
