import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AppStore, AppStoreType } from "./state/stats.store";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
})
 export class AppComponent {
  title = "My Signal Store";

  protected readonly appStore: AppStoreType = inject( AppStore );


}
