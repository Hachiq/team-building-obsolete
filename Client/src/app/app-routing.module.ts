import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { TeamFormComponent } from './components/team-form/team-form.component';
import { TeamPanelComponent } from './components/team-panel/team-panel.component';
import { StatPanelComponent } from './components/stat-panel/stat-panel.component';
import { PendingUsersComponent } from './components/pending-users/pending-users.component';

const routes: Routes = [
  { path: '',   redirectTo: 'login', pathMatch: 'full' },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "home", component: HomeComponent },
  { path: "new", component: TeamFormComponent },
  { path: "panel", component: TeamPanelComponent },
  { path: "stat/:username", component: StatPanelComponent },
  { path: "pending", component: PendingUsersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
