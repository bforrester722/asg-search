/**
 * `filter-card`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
import {AppElement, html} from '@smyd/app-shared/app-element.js';
import htmlString from './filter-card.html';
import '@polymer/paper-card/paper-card.js';


class ASGFilterCard extends AppElement {
  static get is() { return 'filter-card'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
  	return {

  		heading: String

  	};
  }

}

window.customElements.define(ASGFilterCard.is, ASGFilterCard);
