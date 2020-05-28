/**
 * Components configurations
 */
const FORM_NAME = "constructor-form";
const RESULTS_PROPS_ELEMENT_SELECTOR = ".js-form-results-props";
const RESULTS_SET_ELEMENT_SELECTOR = ".js-form-results-set";

export default class Form {
  constructor() {
    this._container = document.forms[FORM_NAME];
    this._resultsPropsElement = document.querySelector(RESULTS_PROPS_ELEMENT_SELECTOR);
    this._resultsSetElement = document.querySelector(RESULTS_SET_ELEMENT_SELECTOR);
  }

  init() {
    this._container.addEventListener("change", this._onFormChange.bind(this));
  }

  _getFormData() {
    const formData = Array.from(new FormData(this._container).values());
    const results = { props: [], set: [] };

    formData.forEach((item) => {
      const value = JSON.parse(item);
      if (value.bundle) {
        if (value.add) results.set.push(value.text);
      } else {
        results.props.push(value.text);
      }
    });

    return results;
  }

  /**
   * Form update handler
   * Updates the result value
   */
  _onFormChange() {
    const results = this._getFormData();
    this._resultsPropsElement.textContent = results.props.join(', ');
    this._resultsSetElement.textContent = results.set.length ? "В комплекте: " + results.set.join(', ') : "";
  }
}
