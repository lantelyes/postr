import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth-guard.service';
import { LoginComponent } from '../login/login.component'
import { RegisterComponent } from '../register/register.component'
import { AllComponent } from '../all/all.component'
import { FeedComponent } from '../feed/feed.component'
import { ProfileComponent } from '../profile/profile.component'
import { ProfileviewComponent } from '../profileview/profileview.component'


const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },  
    {
        path: 'all',
        component: AllComponent
    },
    {
        path: 'feed',
        component: FeedComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'profileview',
        component: ProfileviewComponent,
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }