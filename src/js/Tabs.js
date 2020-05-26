// CSS class-modificator of active tab button
const ACTIVE_TAB_CONTROL_MOD = "c-tabs__switch_active";
// CSS class-modificator of active tab
const ACTIVE_TAB_MOD = "c-tab__link--active";
// CSS selector of tab buttons
const TAB_BTNS_SELECTOR = ".js-open-tab";
//  CSS selector of tabs
const TABS_SELECTOR = ".js-tab-content";

export default class Tabs {
  constructor(containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._controlBtns = this._container.querySelectorAll(TAB_BTNS_SELECTOR);
    this._contentBlocks = this._container.querySelectorAll(TABS_SELECTOR);
  }

  init() {
    this._controlBtns.forEach((controlBtn) => {
      controlBtn.addEventListener("click", this._openTab.bind(this));
    });
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
