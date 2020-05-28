import Tabs from "./Tabs";
import Data from "./Data";

import Spoiler from "./Spoiler";

const JSON_URL = "https://www.iport.ru/upload/front/data.json";

// Initializing tabs
const configuratorTabs = new Tabs(".js-tabs-container");
configuratorTabs.init();
const tabTypeElement = document.querySelector(".js-tab-type");
const tabPropsElement = document.querySelector(".js-tab-props");
const tabSetElement = document.querySelector(".js-tab-set");

// Receiving data
// TODO Изначально планировалось, что json будет браться аяксом с сервера,
// Компонент Data получает json и возвращает promise,
// Но сейчас получение данных закомментировано и компонент просто отдаёт json
// Как будто это проект в прод и как бэк подготовит сервер, мы раскомментируем
const data = new Data(JSON_URL);
data.receive().then((data) => {
  // Filling form tabs
  // Creating tabs fragments
  const tabTypeFragment = document.createDocumentFragment();
  const tabPropsFragment = document.createDocumentFragment();
  const tabSetFragment = document.createDocumentFragment();

  // Rendering spoilers, filling the fragments
  data.forEach((prop) => {
    const spoilerHtml = new Spoiler().render(prop);

    // Inserting elements in fragments
    switch (prop.code) {
      case "model":
        tabTypeFragment.append(spoilerHtml);
        break;
      case "mouse":
      case "keyboard":
        tabSetFragment.append(spoilerHtml);
        break;
      default:
        tabPropsFragment.append(spoilerHtml);
        break;
    }
  });

  // Inserting fragments in to tabs
  tabTypeElement.appendChild(tabTypeFragment);
  tabPropsElement.appendChild(tabPropsFragment);
  tabSetElement.appendChild(tabSetFragment);
});

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
