const fieldTemplate = document
  .querySelector(".js-field-template")
  .content.querySelector("li");

export default class Field {
  constructor(prop) {
    this._prop = prop;
    this._template = fieldTemplate;
  }

  // Rendering field
  render(item) {
    let fieldElement = this._template.cloneNode(true);

    const labelElement = fieldElement.querySelector("label");
    labelElement.textContent = item.text;
    labelElement.setAttribute("for", `property-${this._prop.code}-${item.id}`);

    const inputElement = fieldElement.querySelector("input");
    inputElement.id = `property-${this._prop.code}-${item.id}`;
    inputElement.name = this._prop.code;
    inputElement.value = JSON.stringify(item);

    return fieldElement;
  }
}
