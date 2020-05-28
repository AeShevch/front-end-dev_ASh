/**
 * (*) TODO Изначально планировалось, что json будет браться аяксом с сервера,
 * Поэтому компонент Data получает json и возвращает promise,
 * Но сейчас получение данных закомментировано и компонент просто отдаёт json
 * Как будто это проект в прод и, как бэк подготовит сервер, мы раскомментируем
 */

import Tabs from "./Tabs";
import Data from "./Data";
import Form from "./Form";

// Url for fetch (*)
const JSON_URL = "https://www.iport.ru/upload/front/data.json";

// Initializing tabs
const configuratorTabs = new Tabs(".js-tabs-container");
configuratorTabs.init();

// Receiving data and filling tabs (*)
new Data(JSON_URL).receive().then((data) => configuratorTabs.fill(data));

// Initializing form
new Form().init();
