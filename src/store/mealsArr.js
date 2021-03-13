export let mealsArr = [
  {
    name: "Klasyczna zapiekanka",
    ingredient: [
      { name: "bagietka długa", quantity: "1", id: 1 },
      { name: "pieczarki", quantity: "500g", id: 2 },
      { name: "ser żółty", quantity: "250g", id: 3 },
      { name: "cebula", quantity: "1", id: 4 },
      { name: "masło", quantity: "50g", id: 5 },
      { name: "czosnek", quantity: "2 ząbki", id: 6 },
      {
        name: "sól, pieprz, zioła prowansalskie, oregano",
        quantity: "",
        id: 7,
      },
    ],
    description:
      "Powrót do przeszłości- zapiekanka z budki jak za dawnych lat. Ja przygotowuję ją w wersji klasycznej, ale można ją wzbogacić o szynkę, salami czy inne pyszności z lodówki.",
    steps: [
      {
        number: 1,
        value:
          "bagietkę przekrajamy na pół, następnie obie połówki dzielimy również na dwie części. Układamy je na blachę wyłożoną papierem do pieczenia.",
        id: 1,
      },
      {
        number: 2,
        value:
          "Pieczarki obieramy i trzemy na tarce o dużych oczkach. Cebulę kroimy w kostkę. Na łyżce masła podsmażamy cebulę następnie dodajemy pieczarki. Smażymy do odparowania wody, następnie doprawiamy solą, pieprzem i ziołami prowansalskimi.",
        id: 2,
      },
      {
        number: 3,
        value:
          "Pozostałe masło rozgniatamy, przyprawiamy solą, pieprzem i oregano. Dodajemy przeciśnięty przez praskę czosnek i mieszamy. Tak przygotowanym masłem smarujemy bagietki.",
        id: 3,
      },
      {
        number: 4,
        value:
          "Na bagietki układamy pieczarki i tak przygotowane zapiekanki wstawiamy do piekarnika nagrzanego do temp. 200 st. i pieczemy przez 5 min. Następnie wyjmujemy, posypujemy startym serem i wstawiamy na ok 12 min- do rozpuszczenia sera. ",
        id: 4,
      },
      {
        number: 5,
        value:
          "Tak przygotowane zapiekanki doskonale smakują polane keczupem i posypane rukolą.",
        id: 5,
      },
    ],
    id: 1,
    ban: { status: false, howLong: "", sinceWhen: "" },
    isSelected: false,
  },
  {
    name: "Tagliatelle z mascarpone",
    ingredient: [
      { name: "makaron tagliatelle", quantity: "200g", id: 1 },
      { name: "cukinia", quantity: "1", id: 2 },
      { name: "cebula", quantity: "1", id: 3 },
      { name: "mascarpone", quantity: "250g", id: 4 },
      { name: "pierś z kurczaka", quantity: "500g", id: 5 },
      {
        name: "sól, pieprz, kurkuma, przyprawa do kurczaka",
        quantity: "",
        id: 6,
      },
    ],
    description:
      "Uwielbiam makaron tagliatelle, a połączenie z kremowym sosem mascarpone tworzy idealną kompozycję smakową.",
    steps: [
      {
        number: 1,
        value: "Makaron gotujemy zgodnie z instrukcją na opakowaniu.",
        id: 1,
      },
      {
        number: 2,
        value:
          "Kurczka myjemy, kroimy w kostkę, doprawiamy przyprawą do kurczaka, solą, pieprzem i kurkumą. Cebulę i cukinię także kroimy w kostkę.",
        id: 2,
      },
      {
        number: 3,
        value:
          "Na patelni na łyżce oleju podsmażamy cebulkę, gdy się zarumieni dodajemy cukinię. Smażymy przez chwilę, następnie dodajemy kurczaka. Gdy wszystkie składniki są podsmażone dodajemy mascarpone. gotujemy do całkowitego rozpuszczenia mascarpone. ",
        id: 3,
      },
      {
        number: 4,
        value: "Makaron łączymy z sosem i podajemy na głębokich talerzach.",
        id: 4,
      },
    ],
    id: 2,
    ban: { status: false, howLong: "", sinceWhen: "" },
    isSelected: false,
  },
  {
    name: "Schab pieczony w ziemniakach",
    ingredient: [
      { name: "schab", quantity: "1 kg", id: 1 },
      { name: "papryka czerwona", quantity: "1", id: 2 },
      { name: "cebula", quantity: "3", id: 3 },
      { name: "ziemniak", quantity: "6", id: 4 },
      { name: "sól, pieprz, papryka słodka", quantity: "", id: 5 },
    ],
    description: "Świetna propozycja na jednogarnkowe i pyszne danie.",
    steps: [
      {
        number: 1,
        value:
          "Schab myjemy osuszamy i kroimy w plastry. Lekko rozbijamy. Posypujemy solą, pieprzem i słodką papryką.",
        id: 1,
      },
      {
        number: 2,
        value:
          "Paprykę kroimy w paski, cebulę w półksiężyce. Ziemniaki na ćwiartki.",
        id: 2,
      },
      {
        number: 3,
        value:
          "Piekarnik nastawiamy na 200 st. W naczyniu żaroodpornym wysmarowanym masłem układamy schab na przemian z papyką i cebulą. Po bokach wokół schabu układamy ziemniaki.",
        id: 3,
      },
      {
        number: 4,
        value:
          "Schab do piekarnika wstawiamy pod przykryciem na 1h 40min, następnie odkrywamy i pieczemy przez kolejne 20 min.",
        id: 4,
      },
    ],
    id: 3,
    ban: { status: false, howLong: "", sinceWhen: "" },
    isSelected: false,
  },
  {
    name: "Spaghetti",
    ingredient: [
      { name: "makaron spaghetti", quantity: "300g", id: 1 },
      { name: "sos pomidorowy Dawtona", quantity: "1 słoik", id: 2 },
      { name: "mięso mielone", quantity: "500g", id: 3 },
      {
        name: "sól, pieprz, słodka papryka, ostra papryka",
        quantity: "",
        id: 4,
      },
      { name: "olej do smażenia", quantity: "", id: 5 },
    ],
    description:
      "Spaghetti to szybkie i pożywne danie, które z pewnością gości na większości stołów. Sposobów na jego wykonanie jest wiele- można je zrobić z pomidorami z puszki, z passatą pomidorową czy też z gotowym sosem z torebki. Ja zastępuję passatę sosem pomidorowym Dawtona, który można kupić w Auchan.",
    steps: [
      {
        number: 1,
        value: "Makaron ugotój zgodnie z instrukcją na opakowaniu. ",
        id: 1,
      },
      {
        number: 2,
        value:
          "Na patelni rozgrzej łyżkę oleju, wrzuć mięso i smaż aż stanie się brązowe. Następnie dopraw solą, pieprzem, papryką słodką oraz ostrą.",
        id: 2,
      },
      {
        number: 3,
        value: "Do mięsa wlej cały słoik sosu i duś jeszcze przez ok. 5min. ",
        id: 3,
      },
      {
        number: 4,
        value: "Połącz makaron z sosem. Danie podawaj posypane parmezanem.",
        id: 4,
      },
      {
        number: 5,
        value:
          "Jeżeli chcesz wzbogacić swoje danie możesz dodać do sosu oliwki i pokrojoną w kostkę czerwoną paprykę.",
        id: 5,
      },
    ],
    id: 4,
    ban: { status: false, howLong: "", sinceWhen: "" },
    isSelected: false,
  },
  {
    name: "Schab w sosie koperkowym",
    ingredient: [
      { name: "schab bez kości ", quantity: "600g", id: 1 },
      { name: "bulion drobiowy", quantity: "500 ml", id: 2 },
      { name: "marchewka", quantity: "1", id: 3 },
      { name: "cebula", quantity: "1/2", id: 4 },
      { name: "czosnek", quantity: "ząbek", id: 5 },
      { name: "śmietana 30%", quantity: "150 ml", id: 6 },
      { name: "mąka pszenna", quantity: "2 łyżki ", id: 7 },
      { name: "koperek", quantity: "2 łyżki ", id: 8 },
      { name: "olej", quantity: "1 łyżka", id: 9 },
      { name: "sól, pieprz", quantity: "", id: 10 },
    ],
    description:
      "Niesamowicie pyszne danie! Kiedy zrobiłam go po raz pierwszy polecałam go wszystkim znajomym. Może i Tobie posmakuje równie mocno jak mi ;)",
    steps: [
      {
        number: 1,
        value:
          "Mięso kroimy w plastry i robijamy. Na patelni rozgrzewamy olej i smażymy plastry schabu przez ok. 5 min z każdej strony",
        id: 1,
      },
      {
        number: 2,
        value:
          "Gotujemy bulion, wlewamy go do mięsa i przyprawiamy solą i pieprzem. ",
        id: 2,
      },
      {
        number: 3,
        value:
          "Kiedy bulion się zagotuje zmniejszamy ogień i dusimy pod przykryciem przez godzinę. Po pół godziny dodajemy przeciśnięty przez praskę czosnek, startą marchewkę i pokrojoną w kostkę cebulę.",
        id: 3,
      },
      {
        number: 4,
        value:
          "Mieszamy mąkę ze śmietaną i dodajemy do mięsa. Zagotowujemy i dodajemy koperek.",
        id: 4,
      },
      {
        number: 5,
        value:
          "Schab przepysznie smakuje z gotowanymi ziemniakami i ulubioną surówką.",
        id: 5,
      },
    ],
    id: 5,
    ban: { status: false, howLong: "", sinceWhen: "" },
    isSelected: false,
  },
  {
    name: "Zapiekanka ziemniaczana z mięsem mielonym",
    ingredient: [
      { name: "mięso mielone", quantity: "500g", id: 1 },
      { name: "ziemniaki", quantity: "8 sztuk", id: 2 },
      { name: "pomidory krojone ", quantity: "1 puszka", id: 3 },
      { name: "cebula", quantity: "1", id: 4 },
      { name: "czosnek", quantity: "2 ząbki", id: 5 },
      { name: "śmietana 18%", quantity: "330g", id: 6 },
      { name: "jajko", quantity: "2", id: 7 },
      { name: "ser żółty", quantity: "pół kostki", id: 8 },
      {
        name: "sól, pieprz, słodka papryka, papryka chilli, tymianek",
        quantity: "",
        id: 9,
      },
      { name: "olej", quantity: "1 łyżka", id: 10 },
    ],
    description:
      "Zapiekanka ziemniaczana z mięsem mielonym świetnie sprawdzi się jako obiad na dwa dni, bo po podgrzaniu jest tak samo pyszna.",
    steps: [
      {
        number: 1,
        value:
          "Ziemniaki obrać, pokroić w plastry i gotować przez 8 min w osolonej wodzie.",
        id: 1,
      },
      {
        number: 2,
        value:
          "Cebulę i czosnek pokroić w kostkę i podsmażyć na rozgrzanym oleju. Dodać mięso, smażyć, aż będzie brązowe.",
        id: 2,
      },
      {
        number: 3,
        value:
          "Na patelnię dodajemy puszkę pomidorów i przyprawiamy. Smażymy jeszcze przez chwilę.",
        id: 3,
      },
      {
        number: 4,
        value:
          "w naczyniu żaroodpornym układamy połowę ziemniaków, wykładamy na nie mięso z patelni, na mięso układamy drugą połowę ziemniaków.",
        id: 4,
      },
      {
        number: 5,
        value:
          "W osobnym naczyniu przygotowujemy sos. Łączymy śmietanę z jajkami i serem. Wylewamy na zapiekankę. ",
        id: 5,
      },
      {
        number: 6,
        value:
          "Zapiekankę wstawiamy do nagrzanego do 180 st. piekarnika i pieczemy przez ok 30 min. Do całkowitej miękkości ziemniaków. Pod koniec pieczenia można włączyć termoobieg, żeby przypiec sos z wierzchu.",
        id: 6,
      },
    ],
    id: 6,
    ban: { status: false, howLong: "", sinceWhen: "" },
    isSelected: false,
  },
];

// let ingredientId = mealsArr.map((dish) => {
//   dish.ingredient.forEach((ingredient, index) => (ingredient.id = index + 1));
//   return dish;
// });

// let stepsId = ingredientId.map((dish) => {
//   dish.steps.forEach((step, index) => (step.id = index + 1));
//   return dish;
// });

// console.log(JSON.stringify(stepsId));
