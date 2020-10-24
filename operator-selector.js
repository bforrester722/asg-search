
/**
  *
  * operator-selector
  *
  * dropdown selector for scryfall search operators
  *
  *
  **/

import {AppElement, html} from '@smyd/app-shared/app-element.js';
import htmlString from './operator-selector.html';
import '@polymer/paper-icon-button/paper-icon-button.js';
import './app-dropdown-menu.js';


class ASGOperatorSelector extends AppElement {
  static get is() { return 'operator-selector'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
    return {

      operators: {
        type: Array,
        value: ['=', '>=', '>', '<', '<=']
      },

      selected: String,

    };
  }


  static get observers() {
    return [
      '__selectedChanged(selected)'
    ];
  }


  __menuValueChanged(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const {value} = event.detail;
    this.selected = value;
  }


  __selectedChanged(selected) {    
    this.fire('operator-selector-selected-changed', {selected});
  }


  reset() {
    this.$.menu.reset();
  }

}

window.customElements.define(ASGOperatorSelector.is, ASGOperatorSelector);
