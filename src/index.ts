
import { defineCustomElement as vueDefineCustomElement } from 'vue';
import { createReactCustomElement } from './components/react/webComponent';
import 'zone.js';
import '@angular/compiler';
import '@angular/common';

// REACT
import MyReactComponent from './components/react/MyReactComponent';
customElements.define('my-react-element', createReactCustomElement(MyReactComponent));

// VUE
import MyVueComponent from './components/vue/MyVueComponent.vue';
customElements.define('my-vue-element', vueDefineCustomElement(MyVueComponent));

// Vanilla JS
import './components/vanilla/my-vanilla-component';


// Angular
import './components/angular/angular-elements.bootstrap'; // Lazy load

// Import styles
import './styles/themes.css';


// Export theme service
import  { ThemeService } from './components/themes/theme-service';
(window as any).ThemeService = ThemeService;