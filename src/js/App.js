import Tabs from "./Tabs";
import Data from "./Data";

const JSON_URL = "https://www.iport.ru/upload/front/data.json";

const fieldsetTemplate = document
  .querySelector(".js-fieldset-template")
  .content.querySelector("fieldset");
const fieldTemplate = document
  .querySelector(".js-field-template")
  .content.querySelector("label");

// Initializing tabs
const configuratorTabs = new Tabs(".js-tabs-container");
configuratorTabs.init();
const tabTypeElement = document.querySelector(".js-tab-type");
const tabPropsElement = document.querySelector(".js-tab-props");
const tabSetElement = document.querySelector(".js-tab-set");

// Receiving data
const data = new Data(JSON_URL);
data.receive().then((data) => {
  const tabTypeFragment = document.createDocumentFragment();
  const tabPropsFragment = document.createDocumentFragment();
  const tabSetFragment = document.createDocumentFragment();

  data.forEach((prop) => {
    let fieldsetHtml = fieldsetTemplate.cloneNode(true);

    fieldsetHtml.querySelector(".js-fieldset-title").textContent = prop.title;

    const fieldsContainerElement = fieldsetHtml.querySelector(
      ".js-fieldset-inner"
    );
    prop.config.forEach((item) => {
      let field = fieldTemplate.cloneNode(true);
      field.append(item.text);

      const inputElement = field.querySelector(".js-radio-input");
      inputElement.id = item.id;
      inputElement.name = prop.code;

      fieldsContainerElement.append(field);
    });

    switch (prop.code) {
      case "model":
        tabTypeFragment.append(fieldsetHtml);
        break;
      case "mouse":
      case "keyboard":
        tabSetFragment.append(fieldsetHtml);
        break;
      default:
        tabPropsFragment.append(fieldsetHtml);
        break;
    }
  });

  tabTypeElement.appendChild(tabTypeFragment);
  tabPropsElement.appendChild(tabPropsFragment);
  tabSetElement.appendChild(tabSetFragment);
});
const formElement = document.forms["constructor-form"];

const onFormChange = () => {
  let result = '';
  let formData = Array.from(new FormData(formElement).keys());
  formData.forEach((fieldName) => {
    result += formElement.querySelector(`[name="${fieldName}"]`).nextSibling.textContent.trim() + ", ";
  });
  result.trim();
  console.log(result);
};
formElement.addEventListener("change", onFormChange)
