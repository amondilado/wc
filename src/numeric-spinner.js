import { template } from './spinner-template.js';
import '../node_modules/@webcomponents/shadycss/apply-shim.min.js';

window.ShadyCSS && window.ShadyCSS.prepareTemplate(template, 'numeric-spinner');

export class NumericSpinner extends HTMLElement {
    constructor() {
        super();

        this.step = this.step || 1;
        this.min = this.min || 0;
        this.max = this.max || 100;
        this.value = this.value || this.min;
        this.template = template;

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }

    connectedCallback() {
        window.ShadyCSS &&
        window.ShadyCSS.styleElement(this);

        this.attachShadow({mode:'open'});

        this.shadowRoot.appendChild(this.template.content.cloneNode(true));

        // Shadow DOM
        this.valueElement = this.shadowRoot.querySelector('input');

        this.decrementButton = this.shadowRoot.querySelector('[decrement]');
        this.incrementButton = this.shadowRoot.querySelector('[increment]');
        // Add event listeners
        this.decrementButton.addEventListener('click', this.decrement);
        this.incrementButton.addEventListener('click', this.increment);

        // Init input value
        this.valueElement.setAttribute('value',!this.hasAttribute('value') ? this.min : this.value);

        if (this.value <= this.min) {
            this.decrementButton.setAttribute('disabled', '');
        } else if (this.value <= this.min || this.value >= this.max) {
            this.incrementButton.setAttribute('disabled', '');
        }
    }

    disconnectedCallback() {
        this.decrementButton.removeEventListener('click', this.decrement);
        this.incrementButton.removeEventListener('click', this.increment);
    }

    attributeChangedCallback(attr, o, n) {
        if (attr === 'value') {
            this.valueElement && this.valueElement.setAttribute('value',n);

            this.dispatchEvent(new CustomEvent('valueChanged', {
                bubbles: true,
                composed: true,
                detail: this.value
            }));
        }
    }

    increment() {
        const newVal = this.value + this.step;
        if (newVal < this.min || newVal > this.max) {
            return;

        } else if (newVal <= this.min || newVal >= this.max) {
            this.incrementButton.setAttribute('disabled', '');

        } else if (this.decrementButton.hasAttribute('disabled')) {
            this.decrementButton.removeAttribute('disabled');
        }
        this.value = newVal;
    }
    decrement() {
        const newVal = this.value - this.step;
        if (newVal < this.min) {
            return;

        } else if (newVal <= this.min) {
            this.decrementButton.setAttribute('disabled', '');

        } else if (this.incrementButton.hasAttribute('disabled')) {
            this.incrementButton.removeAttribute('disabled');
        }
        this.value = newVal;
    }

    // Observe
    static get observedAttributes() {
      return ['value'];
    }

    // Value
    get value() {
        return parseInt(this.getAttribute('value'));
    }
    set value(value) {
        this.setAttribute('value', value);
    }
    // Step
    get step() {
        return parseInt(this.getAttribute('step'));
    }
    set step(step) {
        this.setAttribute('step', parseInt(step));
    }
    // Min
    get min() {
        return parseInt(this.getAttribute('min'));
    }
    set min(min) {
        this.setAttribute('min', min);
    }
    // Max
    get max() {
        return parseInt(this.getAttribute('max'));
    }
    set max(max) {
        this.setAttribute('max', max);
    }
}
customElements.define('numeric-spinner', NumericSpinner);
