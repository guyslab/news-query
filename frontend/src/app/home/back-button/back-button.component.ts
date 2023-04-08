import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent {
  @Input() position: string;
  @Output() click = new EventEmitter<void>();

  constructor() {
    this.position = 'top-left';
  }

  onClick() {
    this.click.emit();
  }
}
