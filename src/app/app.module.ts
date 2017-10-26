import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule}  from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { RegisterComponent } from './register/register.component';


import { AuthenticationService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { FeedComponent } from './feed/feed.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    FeedComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    ToastModule.forRoot()
  ],
  providers: [AuthenticationService,
              AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

