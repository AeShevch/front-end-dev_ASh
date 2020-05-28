import Field from "./Field";

const spoilerTemplate = document
  .querySelector(".js-spoiler-template")
  .content.querySelector("details");

export default class Spoiler {
  render(prop) {
    // Cloning new spoiler template
    let spoilerHtml = spoilerTemplate.cloneNode(true);
    // Inserting titles
    spoilerHtml.querySelector("legend").textContent = prop.title;
    spoilerHtml.querySelector("summary").textContent = prop.title;

    /**
     * Returns field element
     * @param {Object} prop Property object
     * @return {HTMLElement}
     */
    const renderFields = (prop) => {
      let fields = document.createDocumentFragment();

      // Rendering fields
      prop.config.forEach((item) => {
        fields.append(new Field(prop).render(item));
      });
      return fields;
    };

    // Creating fields list
    const fieldsContainerElement = spoilerHtml.querySelector("ul");
    const fieldsHtml = renderFields(prop);
    fieldsContainerElement.append(fieldsHtml);

    return spoilerHtml;
  }
}
