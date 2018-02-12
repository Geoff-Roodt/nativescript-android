import {Component} from "@angular/core";
import { LoginComponent } from "./pages/login/login.component";

@Component({
  selector:"main",
  template: "<page-router-outlet></page-router-outlet>"
})

export class AppComponent{}

export const routes = [
  { path: "", component: LoginComponent }
];

export const navigatableComponents = [
  LoginComponent
];
