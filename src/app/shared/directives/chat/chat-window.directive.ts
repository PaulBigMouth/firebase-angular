import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[chat-window]',
})
export class ChatWindowDirective {
  private oldScroll: number = 0;
  constructor(private ref: ElementRef<HTMLDivElement>) {}

  @HostListener('scroll', ['$event'])
  public scroll(event) {
    const element = this.ref.nativeElement.querySelector(
      '.chat__messages'
    ) as HTMLDivElement;
    console.log(this.ref.nativeElement.scrollTop);
    element.style.transform = `rotateX(180deg) translateY(${
      this.ref.nativeElement.scrollTop * 2
    }px)`
  }
}
