import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Create a custom element from a React component.
 * @param {React.ComponentType} ReactComponent - The React component to wrap.
 */
export function createReactCustomElement(ReactComponent) {
  class CustomElement extends HTMLElement {
    constructor() {
      super();
      this.mountPoint = document.createElement('div');
      this.attachShadow({ mode: 'open' }).appendChild(this.mountPoint);
    }

    static get observedAttributes() {
      // Define the attributes you expect to be passed to the React component
      return ['text', 'theme'];
    }

    connectedCallback() {
      this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      this.render();
    }

    getProps() {
      const props = {};
      CustomElement.observedAttributes.forEach(attr => {
        let value = this.getAttribute(attr);
        if (value === 'true' || value === 'false') {
          value = value === 'true';
        } else if (!isNaN(value) && value !== null) {
          value = parseFloat(value);
        }
        // Convert kebab-case to camelCase for React props
        const camelCaseAttr = attr.replace(/-([a-z])/g, g => g[1].toUpperCase());
        props[camelCaseAttr] = value;
      });
      return props;
    }

    render() {
      // Avoid rendering if mountPoint is not attached
      if (!this.mountPoint) return;

      ReactDOM.render(
        React.createElement(ReactComponent, this.getProps()),
        this.mountPoint
      );
    }
  }

  return CustomElement;
}
