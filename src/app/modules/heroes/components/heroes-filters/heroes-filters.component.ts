import {
  SelectOption,
  Filter,
} from './../../../../shared/interfaces/heroes.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-heroes-filters',
  templateUrl: './heroes-filters.component.html',
  styleUrls: ['./heroes-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroesFiltersComponent implements OnInit {
  public form: FormGroup;
  public visibleFilters = false;
  public statusOptions: SelectOption[] = [{ name: 'Alive' }, { name: 'Dead' }];
  public genderOptions: SelectOption[] = [{ name: 'Male' }, { name: 'Female' }];
  @Output()
  public onFilter = new EventEmitter<Filter>();

  public ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.maxLength(30)),
      status: new FormControl(null),
      gender: new FormControl(null),
    });
  }

  public toggleFilters(): void {
    this.visibleFilters = !this.visibleFilters;
  }

  public submitFilters(): void {
    const filter: Filter = {};
    if (this.form.value.name) {
      filter.name = this.form.value.name.toLowerCase();
    }
    if (this.form.value.gender) {
      filter.gender = this.form.value.gender.toLowerCase();
    }
    if (this.form.value.status) {
      filter.status = this.form.value.status.toLowerCase();
    }
    this.onFilter.emit(filter);
    this.toggleFilters();
  }

  public clearFilters(): void {
    this.onFilter.emit({});
    this.form.reset();
  }
}
