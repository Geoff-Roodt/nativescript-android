import { Component } from "@angular/core";
import {ImagesListComponent} from "./components/imagesList-component/imagesList.component";
import {ImageComponent} from "./components/image-component/image.component";

@Component({
    selector: "main",
    templateUrl:"app.component.html"
})

export class AppComponent { }

export const routes = [
  {path: "", component: ImagesListComponent}
];

export const navigatableComponents = [
  ImagesListComponent
];
