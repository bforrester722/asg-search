
/**
  *
  * keyword-items-selector
  *
  * dropdown selector for scryfall search operators
  *
  *
  **/

import {AppElement, html} from '@smyd/app-shared/app-element.js';
import htmlString from './keyword-items-selector.html';
import '@polymer/paper-item/paper-item.js';
import './app-dropdown-menu.js';
import './keyword-item.js';


class ASGKeywordItemsSelector extends AppElement {
  static get is() { return 'keyword-items-selector'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
    return {

      items: {
        type: Array,
        value: [{
          icon: 'description',
          name: 'Name',
          value: 'name'
        }, {
          icon: 'logo',
          name: 'ASG',
          value: 'logo'
        }]
      },

      keyword: String,

      name: String,

      selected: Object

    };
  }


  static get observers() {
    return [
      '__itemsKeywordSelectedChanged(items, keyword, selected)'
    ];
  }


  __menuValueChanged(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const {value} = event.detail;
    this.selected = value;
  }


  __itemsKeywordSelectedChanged(items, keyword, selected) {
    if (!Array.isArray(items) || !keyword || !selected) { return; }
    this.fire('keyword-items-selector-selected-changed', {
      keyword,
      selected
    });
  }


  reset() {
    this.$.menu.reset();
  }

}

window.customElements.define(ASGKeywordItemsSelector.is, ASGKeywordItemsSelector);
