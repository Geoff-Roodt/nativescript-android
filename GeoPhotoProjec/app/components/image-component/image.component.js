"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var flickr_service_1 = require("../../services/flickr.service");
var ImageComponent = /** @class */ (function () {
    function ImageComponent(activatedRoute, flickrService) {
        this.activatedRoute = activatedRoute;
        this.flickrService = flickrService;
    }
    ImageComponent.prototype.getPhoto = function (photoId) {
        var _this = this;
        this.flickrService.getPhotoInfo(photoId).subscribe(function (photo) {
            _this.url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_n.jpg";
        }, function (error) { return console.log(error); });
    };
    ImageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var photoId = params["photo_id"];
            _this.getPhoto(photoId);
        });
    };
    ImageComponent = __decorate([
        core_1.Component({
            selector: "image-component",
            templateUrl: "components/image-component/image.component.html",
            providers: [flickr_service_1.FlickrService]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, flickr_service_1.FlickrService])
    ], ImageComponent);
    return ImageComponent;
}());
exports.ImageComponent = ImageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW1hZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWdEO0FBQ2hELDBDQUErQztBQUUvQyxnRUFBNEQ7QUFRNUQ7SUFJRSx3QkFBMkIsY0FBOEIsRUFBVSxhQUE0QjtRQUFwRSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtJQUFFLENBQUM7SUFFM0YsaUNBQVEsR0FBZixVQUFnQixPQUFjO1FBQTlCLGlCQUlDO1FBSEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSztZQUN0RCxLQUFJLENBQUMsR0FBRyxHQUFHLGlCQUFlLEtBQUssQ0FBQyxJQUFJLDBCQUFxQixLQUFLLENBQUMsTUFBTSxTQUFJLEtBQUssQ0FBQyxFQUFFLFNBQUksS0FBSyxDQUFDLE1BQU0sV0FBUSxDQUFDO1FBQzVHLENBQUMsRUFBRSxVQUFBLEtBQUssSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQWxCLENBQWtCLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRU0saUNBQVEsR0FBZjtRQUFBLGlCQUtDO1FBSkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUN6QyxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDakMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFqQlUsY0FBYztRQU4xQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixXQUFXLEVBQUUsaURBQWlEO1lBQzlELFNBQVMsRUFBRSxDQUFDLDhCQUFhLENBQUM7U0FDM0IsQ0FBQzt5Q0FNMkMsdUJBQWMsRUFBeUIsOEJBQWE7T0FKcEYsY0FBYyxDQW1CMUI7SUFBRCxxQkFBQztDQUFBLEFBbkJELElBbUJDO0FBbkJZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZX0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuaW1wb3J0IHtGbGlja3JTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvZmxpY2tyLnNlcnZpY2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBcImltYWdlLWNvbXBvbmVudFwiLFxyXG4gIHRlbXBsYXRlVXJsOiBcImNvbXBvbmVudHMvaW1hZ2UtY29tcG9uZW50L2ltYWdlLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgcHJvdmlkZXJzOiBbRmxpY2tyU2VydmljZV1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBJbWFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcclxuXHJcbiAgcHVibGljIHVybDogc3RyaW5nO1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgZmxpY2tyU2VydmljZTogRmxpY2tyU2VydmljZSl7fVxyXG5cclxuICBwdWJsaWMgZ2V0UGhvdG8ocGhvdG9JZDpudW1iZXIpe1xyXG4gICAgdGhpcy5mbGlja3JTZXJ2aWNlLmdldFBob3RvSW5mbyhwaG90b0lkKS5zdWJzY3JpYmUocGhvdG8gPT4ge1xyXG4gICAgICB0aGlzLnVybCA9IGBodHRwczovL2Zhcm0ke3Bob3RvLmZhcm19LnN0YXRpY2ZsaWNrci5jb20vJHtwaG90by5zZXJ2ZXJ9LyR7cGhvdG8uaWR9XyR7cGhvdG8uc2VjcmV0fV9uLmpwZ2A7XHJcbiAgICB9LCBlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25Jbml0KCl7XHJcbiAgICB0aGlzLmFjdGl2YXRlZFJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcclxuICAgICAgbGV0IHBob3RvSWQgPSBwYXJhbXNbXCJwaG90b19pZFwiXTtcclxuICAgICAgdGhpcy5nZXRQaG90byhwaG90b0lkKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbn1cclxuIl19