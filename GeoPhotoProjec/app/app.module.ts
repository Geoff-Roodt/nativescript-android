import { NativeScriptModule } from "nativescript-angular/platform";
import { NgModule } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { registerElement } from "nativescript-angular/element-registry";

var map =require("nativescript-mapbox");
registerElement("Mapbox", () => map.Mapbox);

import { AppComponent } from "./app.component";
import {routes, navigatableComponents} from "./app.routing";
import {FlickrService} from "./services/flickr.service";

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
      FlickrService
    ]
})

export class AppModule { }
