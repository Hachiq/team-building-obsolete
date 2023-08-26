import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthInterceptorService } from './services/auth.interceptor.service';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { LogoutComponent } from './components/logout/logout.component';
import { NewTeamItemComponent } from './components/new-team-item/new-team-item.component';
import { TeamFormComponent } from './components/team-form/team-form.component';
import { TeamPanelComponent } from './components/team-panel/team-panel.component';
import { StatPanelComponent } from './components/stat-panel/stat-panel.component';
import { AddDaysSectionComponent } from './components/add-days-section/add-days-section.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    LogoutComponent,
    NewTeamItemComponent,
    TeamFormComponent,
    TeamPanelComponent,
    StatPanelComponent,
    AddDaysSectionComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  },
  provideAnimations(),
  provideToastr()],
  bootstrap: [AppComponent]
})
export class AppModule { }
