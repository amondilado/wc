// TODO @apply rures
export const template = document.createElement('template');
template.innerHTML = `
<style>
    * {
        box-sizing: border-box;
    }
    /* :host { display:block; @apply --spinner-total; } */
    .spinner {margin-bottom: 1rem;}
    input[type=number]::-webkit-outer-spin-button,
    input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: textfield; apperarance:textfield;
        margin: 0;
    }
    input {
        -moz-appearance: textfield;
        border: 1px solid #999;
        cursor: default;
        margin-left: 6px;
        margin-right: 6px;
        padding: 6px;
        text-align: center;
        width: var(--spinner-input-width,52px);
    }
    input:focus, button:focus {
        outline: 0;
    }
    button {
        background-color: #fff;
        border: 1px solid currentColor;
        border-radius: var(--spinner-btn-border-radius,2px);
        cursor: pointer;
        padding: 6px 10px;
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
<div class="spinner">
    <button type="button" decrement>minus</button>
    <input type="number" name="spinner-val" value="0" readonly tabindex="-1"/>
    <button type="button" increment>plus</button>
</div>
`;
