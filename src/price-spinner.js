import { NumericSpinner } from './numeric-spinner.js';
import { styles } from './spinner-styles.js';
'use strict';
class PriceSpinner extends NumericSpinner {
    constructor() {
        super();

        let newTemplate = this.template;
        newTemplate.innerHTML = styles + newTemplate.innerHTML + `<div class="total">Total: <strong id="price">PRICE</strong></div>`;
        this.price = this.price || 0;
    }
    connectedCallback() {
        super.connectedCallback();
        this.priceElement = this.shadowRoot.querySelector('#price');
        this.priceElement.innerHTML = this.price * this.value + '&euro;';
    }
    attributeChangedCallback(attr, o, n) {
        if (attr === 'value') {
            this.valueElement && this.valueElement.setAttribute('value',this.value);
            if(this.priceElement) this.priceElement.innerHTML = n * this.price + '&euro;';

            this.dispatchEvent(new CustomEvent('valueChanged', {
                bubbles: true,
                composed: true,
                detail: {value: this.value, price: this.price}
            }));
        }
    }

    static get observedAttributes() {
        return ['value', 'price'];
    }

    // Price
    get price() {
        return parseInt(this.getAttribute('price'));
    }
    set price(price) {
        this.setAttribute('price', price);
    }

}
customElements.define('price-spinner', PriceSpinner);
