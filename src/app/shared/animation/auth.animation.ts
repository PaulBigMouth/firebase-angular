import {
  trigger,
  transition,
  query,
  style,
  animate,
} from '@angular/animations';

export const authAnimation = trigger('authAnimation', [
  transition('* <=> *', [
    query(':enter, :leave', [
      style({
        opacity: 0,
      }),
    ]),
    query(':enter', [
      animate(
        '1000ms ease',
        style({
          opacity: 1,
        })
      ),
    ]),
  ]),
]);
