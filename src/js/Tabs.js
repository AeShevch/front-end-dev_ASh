// CSS class-modificator of active tab button
import Spoiler from "./Spoiler";

/**
 * Components configurations
 */
const ACTIVE_TAB_CONTROL_MOD = "c-tabs__switch_active";
// CSS class-modificator of active tab
const ACTIVE_TAB_MOD = "c-tab__link--active";
// CSS selector of tab buttons
const TAB_BTNS_SELECTOR = ".js-open-tab";
// CSS selector of tabs
const TABS_SELECTOR = ".js-tab-content";
// CSS selector of type tab (first)
const TABS_TYPE_SELECTOR = ".js-tab-type";
// CSS selector of properties tab (second)
const TABS_PROPS_SELECTOR = ".js-tab-props";
// CSS selector of set tab (third)
const TABS_SET_SELECTOR = ".js-tab-set";

export default class Tabs {
  constructor(containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._controlBtns = this._container.querySelectorAll(TAB_BTNS_SELECTOR);
    this._contentBlocks = this._container.querySelectorAll(TABS_SELECTOR);

    this._tabType = this._container.querySelector(TABS_TYPE_SELECTOR);
    this._tabProps = this._container.querySelector(TABS_PROPS_SELECTOR);
    this._tabSet = this._container.querySelector(TABS_SET_SELECTOR);
  }

  init() {
    this._controlBtns.forEach((controlBtn) => {
      controlBtn.addEventListener("click", this._openTab.bind(this));
    });
  }

  fill(data) {
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
    this._tabType.appendChild(tabTypeFragment);
    this._tabProps.appendChild(tabPropsFragment);
    this._tabSet.appendChild(tabSetFragment);
  }

  _openTab(evt) {
    const btnClicked = evt.target;
    const tabToOpenId = btnClicked.getAttribute("aria-controls");

    this._updateControlsAttrs(btnClicked, this._controlBtns);
    this._updateTabsAttrs(tabToOpenId, this._contentBlocks);

    this._contentBlocks.forEach(function (tab) {
      if (!tab.hasAttribute("hidden")) tab.setAttribute("hidden", true);
      if (tab.id === tabToOpenId) tab.removeAttribute("hidden");
    });
  }

  _updateControlsAttrs(btnClicked, controlBtns) {
    controlBtns.forEach((btn) => {
      const isSelected = btn.getAttribute("aria-selected");
      if (isSelected === "true") {
        btn.setAttribute("aria-selected", "false");
        btn.setAttribute("tabindex", "0");
        btn.classList.remove(ACTIVE_TAB_CONTROL_MOD);
      }
    });

    btnClicked.setAttribute("aria-selected", "true");
    btnClicked.setAttribute("tabindex", "1");
    btnClicked.classList.add(ACTIVE_TAB_CONTROL_MOD);
  }

  _updateTabsAttrs(tabToOpenId, contentBlocks) {
    contentBlocks.forEach((tab) => {
      if (!tab.hasAttribute("hidden")) {
        tab.setAttribute("hidden", true);
        tab.classList.remove(ACTIVE_TAB_MOD);
      }
      if (tab.id === tabToOpenId) {
        tab.removeAttribute("hidden");
        tab.classList.add(ACTIVE_TAB_MOD);
      }
    });
  }
}
