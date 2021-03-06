import { NgModule } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { registerElement } from "nativescript-angular/element-registry";

var map =require("nativescript-mapbox");
registerElement("Mapbox", () => map.Mapbox);

import { AppComponent } from "./app.component";
import {routes, navigatableComponents} from "./app.routing";
import {FlickrService} from "./services/flickr.service";
import {GeolocationService} from "./services/geolocation.service";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(routes)
    ],
    declarations: [
        AppComponent,
        ...navigatableComponents
    ],
    providers: [
      FlickrService,
      GeolocationService
    ]
})

export class AppModule { }
