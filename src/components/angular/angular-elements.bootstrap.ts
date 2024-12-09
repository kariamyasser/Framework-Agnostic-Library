import { bootstrapApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { Injector } from '@angular/core';
import { MyAngularComponent } from './angular.component';
import 'zone.js'; // Ensure zone.js is loaded

export function loadAngularElements() {
  bootstrapApplication(MyAngularComponent)
    .then(appRef => {
      const injector: Injector = appRef.injector;
      const AngularElement = createCustomElement(MyAngularComponent, { injector });
      customElements.define('my-angular-element', AngularElement);
    })
    .catch(err => console.error(err));
}

// Check if the element exists in the DOM and then load the Angular elements
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('my-angular-element')) {
    loadAngularElements();  // Initialize Angular dynamically
  }
});