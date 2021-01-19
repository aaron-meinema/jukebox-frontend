import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlayerComponent} from './pages/player/player.component';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'player', component: PlayerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
