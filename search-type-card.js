/**
 * `search-type-card`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
import {AppElement, html} from '@smyd/app-shared/app-element.js';
import htmlString from './search-type-card.html';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import './filter-card.js';


class ASGSearchTypeCard extends AppElement {
  static get is() { return 'search-type-card'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
    return {

      _value: {
        type: String,
        value: 'name'
      }

    };
  }


  static get observers() {
    return [
      '__valueChanged(_value)'
    ];
  }


  __radioSelectedChanged(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    this._value = event.detail.value;
  }


  __valueChanged(value) {
    if (!value) { return; }
    this.fire('search-type-card-value-changed', {value});
  }


  reset() {
    this._value = 'name';
  }

}

window.customElements.define(ASGSearchTypeCard.is, ASGSearchTypeCard);
