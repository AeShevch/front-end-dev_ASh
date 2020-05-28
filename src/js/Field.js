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
    fieldElement.querySelector("label").append(item.text);
    const inputElement = fieldElement.querySelector("input");
    if (item.add === false) inputElement.disabled = true;
    inputElement.id = item.id;
    inputElement.name = this._prop.code;
    inputElement.value = item.text;

    return fieldElement;
  }

}
