import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from "@ngrx/signals";
import { withIsLoadingFeature } from "./features/is-loading.feature";
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
  { providedIn: "root", protectedState: true },
  withState<AppState>(initialAppState),
  withIsLoadingFeature(),

  withComputed((store) => ({
    computedTimesInSecond: computed<number>(() => store.timesInSecond()),
  })),

  withMethods(() => ({
    incrementTime: () => console.log("incrementTime"),
  })),
);
