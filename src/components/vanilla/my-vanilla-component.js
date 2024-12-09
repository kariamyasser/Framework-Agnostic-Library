// my-vanilla-component.js
export class MyVanillaComponent extends HTMLElement {
  static get observedAttributes() {
    return ['text'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  render() {
    const text = this.getAttribute('text') || '';
    this.shadowRoot.innerHTML = `
      <style>
        .dark { background: black; color: white; }
        .light { background: white; color: black; }
      </style>
      <div style="background: var(--background); color: var(--color);">Vanilla Component: ${text}</div>
    `;
  }
}

customElements.define('my-vanilla-component', MyVanillaComponent);
