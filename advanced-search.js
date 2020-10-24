/**
 * `advanced-search`
 * displays all mtg sets as styled selectable items
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
import {AppElement, html} from '@smyd/app-shared/app-element.js';
import {
  listen,
  schedule
}                 from '@smyd/app-functions/utils.js';
import htmlString from './advanced-search.html';
import '@smyd/app-shared/app-icons.js';
import '@smyd/app-overlays/app-header-overlay.js';
import '@polymer/paper-fab/paper-fab.js';
import './search-input.js';
import './advanced-search-content.js';


class ASGAdvancedSearch extends AppElement {
  static get is() { return 'advanced-search'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
    return {
      // raw search string from a search-input
      search: String,

      _advanced: String,

      _isBuylist: {
        type: Boolean,
        value: false
      },
      // glue between content and sets overlay
      _selectedSet: Object

    };
  }


  static get observers() {
    return [
      '__advancedChanged(_advanced)'
    ];
  }
  

  connectedCallback() {
    super.connectedCallback();

    listen(this, 'set-card-open-sets-overlay',    this.__openSetsOverlay.bind(this));
    listen(this, 'sets-overlay-selected-changed', this.__setSelected.bind(this));
    listen(this.$.overlay, 'overlay-reset',       this.__reset.bind(this));   
  }

  // from 'Reset All' btn in advanced-search-content
  async __contentReset() {
    if (this.$.setsOverlay.reset) { // may not have been lazy loaded yet
      this.$.setsOverlay.reset();
    }
    // make sure reset runs after 'advanced-search-value-changed'
    await schedule();
    this.fire('advanced-search-reset');
  }

  // listener in main-app, for highlighting button if a filter is on
  __advancedChanged(value) {
    this.fire('advanced-search-value-changed', {value});
  }

  // glue between search-input and content
  __searchChanged(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    this.search = event.detail.value;
  }


  __searchInputSearch(event) {    
    event.stopImmediatePropagation();
    event.stopPropagation();
    this.__fireSearch();
  }

  // from advanced-search-content
  __advancedSearchChanged(event) {    
    event.stopImmediatePropagation();
    event.stopPropagation();
    this._advanced = event.detail.value;
  }


  async __openSetsOverlay(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    await import(
      /* webpackChunkName: 'sets-overlay' */ 
      './sets-overlay.js'
    );
    this.$.setsOverlay.open();
  }

  // glue between content and sets overlay
  __setSelected(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    this._selectedSet = event.detail.selected;
  }

  // enter button on search input focus or paper-fab click
  async __fireSearch() {
    await this.$.search.closeAutoComplete();
    await this.$.overlay.close();
    await schedule();
    if (this._isBuylist) {
      this.fire('search-input-search', {
        str:       this.search,
        location: 'buylist'
      });
      return;
    }
    this.fire('search-input-search', {
      str:       this.search,
      location: 'advanced'
    });
  }


  async __fabClicked() {
    try {
      await this.clicked();
      if (!this._advanced || this._advanced.length < 2) { return; }    
      this.__fireSearch();
    }
    catch (error) {
      if (error === 'click debounced') { return; }
      console.error(error);
    }
  }


  __reset() {
    this.$.content.reset();
  }


  resetFilters() {
    this.$.content.resetFilters();
    this.fire('advanced-search-reset-filters');
  }


  async open(event) {
    await  this.$.overlay.open();
    this._isBuylist = event.detail.isBuylist;
    return this.$.content.fetchRandom();
  }

}

window.customElements.define(ASGAdvancedSearch.is, ASGAdvancedSearch);
