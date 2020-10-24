/**
 * `direction-button`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
import {AppElement, html} from '@smyd/app-shared/app-element.js';
import htmlString from './direction-button.html';
import '@smyd/asg-icons/asg-icons.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-icon-button/paper-icon-button.js';


class ASGDirectionButton extends AppElement {
  static get is() { return 'direction-button'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
    return {

    	direction: {
    		type: String,
    		value: 'asc' // 'desc'
    	}

    };
  }


  async __directionBtnClicked() {
  	try {
  		await this.clicked();
  		this.direction = this.direction === 'asc' ? 
  												'desc' : 'asc';
  		this.fire('direction-button-value-changed', {
  			value: this.direction
  		});
  	}
  	catch (error) {
  		if (error === 'click debounced') { return; }
  		console.error(error);
  	}
  }

}

window.customElements.define(ASGDirectionButton.is, ASGDirectionButton);
