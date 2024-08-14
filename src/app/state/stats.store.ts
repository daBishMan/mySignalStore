import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from "@ngrx/signals";
import {
  setLoadingToFalse,
  setLoadingToTrue,
  withIsLoadingFeature,
} from "./features/is-loading.feature";
import { computed } from "@angular/core";

export type AppStoreType = InstanceType<typeof AppStore>;

export type AppState = {
  selectedTeam: string;
  timesInSecond: number;
};

export const initialAppState: AppState = {
  selectedTeam: "none",
  timesInSecond: 0,
};

export const AppStore = signalStore(
  { providedIn: "root" },
  withState<AppState>(initialAppState),

  withComputed((store) => ({
    computedTimesInSecond: computed<number>(() => store.timesInSecond() * 2),
  })),

  withMethods((store) => ({
    incrementTime: () => console.log("incrementTime"),
  })),

  // You need to add the feature after all the requirements are met
  withIsLoadingFeature(),

  withMethods((store) => ({
    setIsLoading: () => patchState(store, setLoadingToTrue()),
    setLoadingComplete: () => patchState(store, setLoadingToFalse()),
  })),
);
