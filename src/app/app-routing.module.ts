// src/app/app-routing.module.ts
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PlayerComponent } from "./pages/player/player.component";
import { LoginComponent } from "./pages/login/login.component";

const routes: Routes = [
  { path: "", component: PlayerComponent },
  { path: "login", component: LoginComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}