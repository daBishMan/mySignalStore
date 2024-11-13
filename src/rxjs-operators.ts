import { filter, map, Observable, pairwise } from "rxjs";

/**
 * Filters emissions until the source changes from a truthy value to a false value.
 * Always ignores initial source value, requires a new emission after subscription.
 * @returns emitted value passed through filter
 */
export function distinctUntilFalseChanged() {
  return (source$: Observable<boolean | null | undefined>) =>
    source$.pipe(
      pairwise(),
      filter(([prev, next]) => !next && prev !== next),
      map(() => false)
    );
}

export function distinctUntilTrueChanged() {
  return (source$: Observable<boolean | null | undefined>) =>
    source$.pipe(
      pairwise(),
      filter(([prev, next]) => next === true && prev !== next),
      map(() => true),
    );
}


export function filterIsDefined<T>() {
  return (source$: Observable<undefined | T>) =>
    source$.pipe(
      filter((input: undefined | T): input is T => input !== undefined),
    );
}

export function filterIsNotNullOrUndefined<T>() {
  return (source$: Observable<null | undefined | T>) =>
    source$.pipe(
      filter(
        (input: null | undefined | T): input is T =>
          input !== null && input !== undefined,
      ),
    );
}

export function filterIsTruthy<T>() {
  return (source$: Observable<null | undefined | T>) =>
    source$.pipe(filter((input: null | undefined | T): input is T => !!input));
}
