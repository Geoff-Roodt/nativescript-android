"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var core_1 = require("@angular/core");
var forms_1 = require("nativescript-angular/forms");
var http_1 = require("nativescript-angular/http");
var router_1 = require("nativescript-angular/router");
var element_registry_1 = require("nativescript-angular/element-registry");
var map = require("nativescript-mapbox");
element_registry_1.registerElement("Mapbox", function () { return map.Mapbox; });
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var flickr_service_1 = require("./services/flickr.service");
var geolocation_service_1 = require("./services/geolocation.service");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [
                app_component_1.AppComponent
            ],
            imports: [
                nativescript_module_1.NativeScriptModule,
                forms_1.NativeScriptFormsModule,
                http_1.NativeScriptHttpModule,
                router_1.NativeScriptRouterModule,
                router_1.NativeScriptRouterModule.forRoot(app_routing_1.routes)
            ],
            declarations: [
                app_component_1.AppComponent
            ].concat(app_routing_1.navigatableComponents),
            providers: [
                flickr_service_1.FlickrService,
                geolocation_service_1.GeolocationService
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxnRkFBOEU7QUFDOUUsc0NBQXlDO0FBQ3pDLG9EQUFxRTtBQUNyRSxrREFBbUU7QUFDbkUsc0RBQXVFO0FBQ3ZFLDBFQUF3RTtBQUV4RSxJQUFJLEdBQUcsR0FBRSxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUN4QyxrQ0FBZSxDQUFDLFFBQVEsRUFBRSxjQUFNLE9BQUEsR0FBRyxDQUFDLE1BQU0sRUFBVixDQUFVLENBQUMsQ0FBQztBQUU1QyxpREFBK0M7QUFDL0MsNkNBQTREO0FBQzVELDREQUF3RDtBQUN4RCxzRUFBa0U7QUF1QmxFO0lBQUE7SUFBeUIsQ0FBQztJQUFiLFNBQVM7UUFyQnJCLGVBQVEsQ0FBQztZQUNOLFNBQVMsRUFBRTtnQkFDUCw0QkFBWTthQUNmO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHdDQUFrQjtnQkFDbEIsK0JBQXVCO2dCQUN2Qiw2QkFBc0I7Z0JBQ3RCLGlDQUF3QjtnQkFDeEIsaUNBQXdCLENBQUMsT0FBTyxDQUFDLG9CQUFNLENBQUM7YUFDM0M7WUFDRCxZQUFZO2dCQUNSLDRCQUFZO3FCQUNULG1DQUFxQixDQUMzQjtZQUNELFNBQVMsRUFBRTtnQkFDVCw4QkFBYTtnQkFDYix3Q0FBa0I7YUFDbkI7U0FDSixDQUFDO09BRVcsU0FBUyxDQUFJO0lBQUQsZ0JBQUM7Q0FBQSxBQUExQixJQUEwQjtBQUFiLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5XCI7XG5cbnZhciBtYXAgPXJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtbWFwYm94XCIpO1xucmVnaXN0ZXJFbGVtZW50KFwiTWFwYm94XCIsICgpID0+IG1hcC5NYXBib3gpO1xuXG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XG5pbXBvcnQge3JvdXRlcywgbmF2aWdhdGFibGVDb21wb25lbnRzfSBmcm9tIFwiLi9hcHAucm91dGluZ1wiO1xuaW1wb3J0IHtGbGlja3JTZXJ2aWNlfSBmcm9tIFwiLi9zZXJ2aWNlcy9mbGlja3Iuc2VydmljZVwiO1xuaW1wb3J0IHtHZW9sb2NhdGlvblNlcnZpY2V9IGZyb20gXCIuL3NlcnZpY2VzL2dlb2xvY2F0aW9uLnNlcnZpY2VcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBib290c3RyYXA6IFtcbiAgICAgICAgQXBwQ29tcG9uZW50XG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdEh0dHBNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvclJvb3Qocm91dGVzKVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEFwcENvbXBvbmVudCxcbiAgICAgICAgLi4ubmF2aWdhdGFibGVDb21wb25lbnRzXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgIEZsaWNrclNlcnZpY2UsXG4gICAgICBHZW9sb2NhdGlvblNlcnZpY2VcbiAgICBdXG59KVxuXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfVxuIl19