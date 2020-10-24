
/**
  *
  * chain-selector
  *
  * scryfall search query chaining words (and, or, not)
  *
  *
  **/

import {AppElement, html} from '@smyd/app-shared/app-element.js';
import htmlString from './chain-selector.html';
import './operator-selector'


class ASGChainSelector extends AppElement {
  static get is() { return 'chain-selector'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
    return {

      _selected: {
        type: String,
        value: 'and'
      },

      _chains: {
        type: Array,
        value: ['and', 'or', 'not']
      }

    };
  }


  __menuValueChanged(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const {selected} = event.detail;
    this._selected   = selected;
    this.fire('chain-selector-selected-changed', {selected});
  }


  reset() {
    this.$.selector.reset();
  }

}

window.customElements.define(ASGChainSelector.is, ASGChainSelector);
