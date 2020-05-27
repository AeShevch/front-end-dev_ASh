import Tabs from "./Tabs";
import Data from "./Data";

const JSON_URL = "https://www.iport.ru/upload/front/data.json";

const fieldsetTemplate = document.querySelector('.js-fieldset-template').content.querySelector('fieldset');
const fieldTemplate = document.querySelector('.js-field-template').content.querySelector('label');

// Initializing tabs
const configuratorTabs = new Tabs(".js-tabs-container");
configuratorTabs.init();
const tabTypeElement = document.querySelector('.js-tab-type');

// Receiving data
const data = new Data(JSON_URL);
data.receive().then((data) => {

  const tabTypeFragment = document.createDocumentFragment();
  const tabPropsFragment = document.createDocumentFragment();
  const tabSetFragment = document.createDocumentFragment();

  data.forEach((prop) => {
    let fieldsetHtml = fieldsetTemplate.cloneNode(true);

    fieldsetHtml.querySelector('.js-fieldset-title').textContent = prop.title;

    const fieldsContainerElement = fieldsetHtml.querySelector('.js-fieldset-inner');
    prop.config.forEach((item) => {
      let field = fieldTemplate.cloneNode(true);
      field.append(item.text);

      const inputElement = field.querySelector('.js-radio-input');
      inputElement.id = item.id;
      inputElement.name = prop.code;

      fieldsContainerElement.append(field);
    });

    if (prop.code === 'model') {
      tabTypeFragment.append(fieldsetHtml);
    }
  });
  console.log(tabTypeFragment);
  tabTypeElement.appendChild(tabTypeFragment);
});
