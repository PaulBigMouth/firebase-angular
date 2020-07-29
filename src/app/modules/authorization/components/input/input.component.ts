import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() public placeholder: string;
  @Input() public type: string;
  @Input() public valid: string;
  @Input() public errors?: Object;
  @Input() public password?: string;

  isTouched: boolean = false;
  onChange: (_: any) => void = () => {};
  onTouched: () => void = () => {};
  isDisabled: boolean = false;
  value: string | number

  constructor(private cd: ChangeDetectorRef) {}

  changeValue($event: any): void {
    this.writeValue($event.target.value);
  }

  setTouched(): void {
    this.onTouched();
    this.isTouched = true;
  }

  writeValue(value: any): void {
    this.value = value
    this.onChange(value);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this.cd.detectChanges();
  }
}
