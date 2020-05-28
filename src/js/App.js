import Tabs from "./Tabs";
import Data from "./Data";

const JSON_URL = "https://www.iport.ru/upload/front/data.json";

// Initializing tabs
const configuratorTabs = new Tabs(".js-tabs-container");
configuratorTabs.init();


// Receiving data
// TODO Изначально планировалось, что json будет браться аяксом с сервера,
// Компонент Data получает json и возвращает promise,
// Но сейчас получение данных закомментировано и компонент просто отдаёт json
// Как будто это проект в прод и как бэк подготовит сервер, мы раскомментируем
const data = new Data(JSON_URL);
data.receive().then((data) => configuratorTabs.fill(data));

const formElement = document.forms["constructor-form"];
const resultsElement = document.querySelector(".js-form-results");

/**
 * Form update handler
 * Updates the result value
 */
const onFormChange = () => {
  const resultsArr = Array.from(new FormData(formElement).values());

  resultsElement.textContent = resultsArr.join(", ");
};
formElement.addEventListener("change", onFormChange);
