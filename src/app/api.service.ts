import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { Observable, of, Subject, throwError } from 'rxjs';
import {
  catchError,
  delay,
  filter,
  map,
  mapTo,
  switchMap,
  tap,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private completeListSubject = new BehaviorSubject([
    'breno',
    'kiefer',
    'aderbal',
  ]);
  private searchSubject = new BehaviorSubject('');

  constructor() {}

  public get completeList$() {
    return this.completeListSubject.asObservable();
  }

  public get filteredList$() {
    return combineLatest([this.completeList$, this.validatedSearch$]).pipe(
      map(([list, search]) =>
        list.filter((item) => (search ? item === search : true))
      )
    );
  }

  public get validatedSearch$() {
    return this.search$.pipe(
      switchMap((search) => {
        return this.validateSearchInput(search).pipe(
          catchError((error) => {
            console.warn(error);
            return of('');
          })
        );
      })
    );
  }

  public get search$() {
    return this.searchSubject.asObservable();
  }

  public executeSearch(search: string): void {
    console.log('Execute Search');
    this.searchSubject.next(search);
  }

  private validateSearchInput(search: string) {
    return of(search).pipe(
      tap(() => {
        if (Math.random() > 0.2) {
          throw new Error('invalid');
        }
      }),
      delay(1000)
    );
  }
}
