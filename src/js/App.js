import Tabs from "./Tabs";
import Data from "./Data";

const JSON_URL = "https://www.iport.ru/upload/front/data.json";

// Initializing tabs
const configuratorTabs = new Tabs(".js-tabs-container");
configuratorTabs.init();

// Receiving data
const data = new Data(JSON_URL);
data.receive().then((data) => {
  console.log(data);

  const tabTypeFragment = document.createDocumentFragment();
  const tabPropsFragment = document.createDocumentFragment();
  const tabSetFragment = document.createDocumentFragment();

  data.forEach((prop) => {

  });
});
