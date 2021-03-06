"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var imagesList_component_1 = require("./components/imagesList-component/imagesList.component");
var image_component_1 = require("./components/image-component/image.component");
exports.routes = [
    { path: "", component: imagesList_component_1.ImagesListComponent },
    { path: "image-component/:photo_id", component: image_component_1.ImageComponent },
];
exports.navigatableComponents = [
    imagesList_component_1.ImagesListComponent,
    image_component_1.ImageComponent
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtGQUE2RjtBQUM3RixnRkFBOEU7QUFFakUsUUFBQSxNQUFNLEdBQUc7SUFDbEIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSwwQ0FBbUIsRUFBRTtJQUM1QyxFQUFFLElBQUksRUFBRSwyQkFBMkIsRUFBRSxTQUFTLEVBQUUsZ0NBQWMsRUFBRTtDQUNuRSxDQUFDO0FBRVcsUUFBQSxxQkFBcUIsR0FBRztJQUNqQywwQ0FBbUI7SUFDbkIsZ0NBQWM7Q0FDakIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEltYWdlc0xpc3RDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL2ltYWdlc0xpc3QtY29tcG9uZW50L2ltYWdlc0xpc3QuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBJbWFnZUNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvaW1hZ2UtY29tcG9uZW50L2ltYWdlLmNvbXBvbmVudFwiO1xuXG5leHBvcnQgY29uc3Qgcm91dGVzID0gW1xuICAgIHsgcGF0aDogXCJcIiwgY29tcG9uZW50OiBJbWFnZXNMaXN0Q29tcG9uZW50IH0sXG4gICAgeyBwYXRoOiBcImltYWdlLWNvbXBvbmVudC86cGhvdG9faWRcIiwgY29tcG9uZW50OiBJbWFnZUNvbXBvbmVudCB9LFxuXTtcblxuZXhwb3J0IGNvbnN0IG5hdmlnYXRhYmxlQ29tcG9uZW50cyA9IFtcbiAgICBJbWFnZXNMaXN0Q29tcG9uZW50LFxuICAgIEltYWdlQ29tcG9uZW50XG5dO1xuIl19