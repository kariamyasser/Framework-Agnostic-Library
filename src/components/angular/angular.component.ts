// MyAngularComponent.ts
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'my-angular-element',
  standalone: true,
  imports: [CommonModule],
  template: `<div>Angular Component: {{text}}</div>`,
  styles: [`
    :host {
      display: block;
      background: var(--background);
      color: var(--color);
    }
  `],
})
export class MyAngularComponent {
  @Input() text: string = '';
}
