const FORM_NAME = "constructor-form";
const RESULTS_ELEMENT_SELECTOR = ".js-form-results";

export default class Form {
  constructor() {
    this._container = document.forms[FORM_NAME];
    this._resultsElement = document.querySelector(RESULTS_ELEMENT_SELECTOR);

  }

  init() {
    this._container.addEventListener("change", this._onFormChange.bind(this));
  }

  _getFormData() {
    const resultsArr = Array.from(new FormData(this._container).values());
    return resultsArr.join(", ");
  }

  /**
   * Form update handler
   * Updates the result value
   */
  _onFormChange() {
    this._resultsElement.textContent = this._getFormData();
  }
}
