// TODO @apply rures
export const template = document.createElement('template');
template.innerHTML = `
<style>
    * { box-sizing: border-box; }
    :host {
        display:flex;
        justify-content: center;
    }

    input[type=number]::-webkit-outer-spin-button,
    input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: textfield; apperarance:textfield;
        margin: 0;
    }
    input {
        -moz-appearance: textfield;
        border: 2px solid #999;
        cursor: default;
        margin-left: 1em;
        margin-right: 1em;
        padding: .5em 1em;
        text-align: center;
        width: var(--spinner-input-width,80px);
        @apply --apply-rules;
    }
    input:focus, button:focus {
        outline: 0;
    }
    button {
        background-color: #fff;
        border: 2px solid currentColor;
        border-radius: var(--spinner-btn-border-radius,2px);
        cursor: pointer;
        font: inherit;
        padding: .5em .75em;
    }
    button:hover {
        color: #fff;
    }
    button[disabled] {
        color: #999;
        cursor: not-allowed;
    }
    [decrement] {
        color: var(--spinner-decrement-color,red);
    }
    [decrement]:not([disabled]):hover {
        background-color: var(--spinner-decrement-color,red);
    }
    [increment] {
        color: var(--spinner-increment-color,green);
    }
    [increment]:not([disabled]):hover  {
        background-color: var(--spinner-increment-color,green);
    }
</style>

<button type="button" decrement>-</button>
<input type="number" name="spinner-val" value="0" readonly tabindex="-1"/>
<button type="button" increment>+</button>
`;
