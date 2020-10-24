/**
 * `set-card`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
import {AppElement, html} from '@smyd/app-shared/app-element.js';
import htmlString from './set-card.html';
import './filter-card.js';
import './chain-selector.js';
import './set-item.js';


class ASGSetCard extends AppElement {
  static get is() { return 'set-card'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
    return {
      
      selected: Object,

      _chain: String,

    };
  }


  static get observers() {
    return [
      '__valuesChanged(selected, _chain)'
    ];
  }


  connectedCallback() {
    super.connectedCallback();

    this.selected = {name: 'All'};
  }


  __chainSelected(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    this._chain = event.detail.selected;
  }


  __valuesChanged(selected, chain) {
    if (!selected || !chain) { return; }
    this.fire('set-card-value-changed', {
      value: {
        ...selected,
        chain
      }
    });
  }

  // hit db only after user interacts with dropdown
  async __itemClicked() {
    try {
      await this.clicked();
      this.fire('set-card-open-sets-overlay');
    }
    catch (error) {
      if (error === 'click debounced') { return; }
      console.error(error);
    }
  }


  reset() {
    this.$.selector.reset();
    this.selected = {name: 'All'};
  }

}

window.customElements.define(ASGSetCard.is, ASGSetCard);
