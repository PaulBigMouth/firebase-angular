import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[chat-window]',
})
export class ChatWindowDirective {
  constructor(private ref: ElementRef) {}

  @HostListener('window:resize') public resize() {
    this.ref.nativeElement.parentNode.scroll({
      top: this.ref.nativeElement.clientHeight,
      behavior: 'smooth',
    });
  }
}
