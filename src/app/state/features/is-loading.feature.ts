import { computed, Signal } from "@angular/core";
import {
  signalStoreFeature,
  type,
  withComputed,
  withMethods,
  withState,
} from "@ngrx/signals";

export type IsLoadingState = {
  isLoading: boolean;
};

export const initialIsLoadingState: IsLoadingState = {
  isLoading: false,
};

export function withIsLoadingFeature<_>() {
  return signalStoreFeature(
    // Declare properties, methods, and computed signals the parent store MUST have
    {
      state: type<{ timesInSecond: number }>(),
      computed: type<{ computedTimesInSecond: Signal<number> }>(),
      methods: type<{ incrementTime(): void }>(),
    },

    withState<IsLoadingState>(initialIsLoadingState),

    withComputed((store) => {
      // Place Injections Here
      return {
        isLoading: computed<boolean>(
          () => store.computedTimesInSecond() % 2 === 0,
        ),
      };
    }),

    withMethods((store) => {
      // Place Injections Here
      return {
        helloWorld: (): void => store.incrementTime(),
        anotherMethod: (): void => console.log("anotherMethod"),
      };
    }),
  );
}

export function setLoadingToTrue(): IsLoadingState {
  return { isLoading: true };
}

export function setLoadingToFalse(): IsLoadingState {
  return { isLoading: false };
}
