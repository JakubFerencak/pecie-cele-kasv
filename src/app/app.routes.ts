import { Routes } from '@angular/router';
import { RecipeLandingComponent } from './components/recipe-landing/recipe-landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  { path: '', component: RecipeLandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
