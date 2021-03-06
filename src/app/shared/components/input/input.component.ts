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
  @Input() public errors?;
  @Input() public maxLength: string;
  @Input() public value: string | number;
  @Input() public styleType: string;

  public isTouched = false;
  public isDisabled = false;
  public onChange: (_: any) => void = () => {};
  public onTouched: () => void = () => {};

  constructor(private cd: ChangeDetectorRef) {}

  public changeValue($event: any): void {
    this.writeValue($event.target.value);
  }

  public setTouched(): void {
    this.onTouched();
    this.isTouched = true;
  }

  public writeValue(value: any): void {
    this.onChange(value);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this.errors = {};
    this.cd.detectChanges();
  }
}
