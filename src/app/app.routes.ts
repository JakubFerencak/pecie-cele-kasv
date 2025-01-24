import { Routes } from '@angular/router';
import { RecipeLandingComponent } from './components/recipe-landing/recipe-landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {NotAuthGuard} from './guards/not-auth.guard';


export const routes: Routes = [
  { path: '', component: RecipeLandingComponent },
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard] },
  { path: 'app-recipe-landing', component: RecipeLandingComponent }
];
