import { SelectOption } from './../../interfaces/heroes.interface';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  Component,
  forwardRef,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormSelectComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormSelectComponent implements ControlValueAccessor {
  @Input()
  public options: SelectOption[];
  @Input()
  public placeholder: string;
  @Input()
  public value: string;
  public open = false;
  public isDisabled = false;
  public isTouched = false;
  public onChanged: (_: any) => void = () => {};
  public onTouched: () => void = () => {};

  public select(option: SelectOption): void {
    this.writeValue(option);
    this.toggle();
    this.setTouched();
  }

  public setTouched(): void {
    this.isTouched = true;
    this.onTouched();
  }

  public writeValue(value: any): void {
    if (value?.name) {
      this.onChanged(value.name);
    }
  }

  public toggle(): void {
    if (!this.isDisabled) {
      this.open = !this.open;
    }
  }
  public registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
