import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import {
  tap,
  catchError,
  first,
  take,
  filter,
  concatMap,
  switchMap,
} from 'rxjs/operators';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  //#region private properties

  title = 'rxjs-playground';

  form: FormGroup;

  myFilteredList: string[];

  private qualquerCoisa: string;

  //#endregion

  public filteredList$: Observable<string[]>;
  public search$: Observable<string>;

  constructor(
    private formBuilder: FormBuilder,
    private ApiService: ApiService
  ) {
    this.filteredList$ = this.ApiService.filteredList$;
    this.search$ = this.ApiService.search$;
  }

  //#region Public API

  public ngOnInit() {
    this.form = this.formBuilder.group({
      search: ['', [Validators.required]],
    });
  }

  public onSubmit(search: string) {
    this.ApiService.executeSearch(search);
  }

  //#endregion

  // Private methods
}
