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
            templateUrl: "components/image-component/image.component.html"
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, flickr_service_1.FlickrService])
    ], ImageComponent);
    return ImageComponent;
}());
exports.ImageComponent = ImageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW1hZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWdEO0FBQ2hELDBDQUErQztBQUUvQyxnRUFBNEQ7QUFNNUQ7SUFJRSx3QkFBMkIsY0FBOEIsRUFBVSxhQUE0QjtRQUFwRSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtJQUFFLENBQUM7SUFFM0YsaUNBQVEsR0FBZixVQUFnQixPQUFjO1FBQTlCLGlCQUlDO1FBSEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSztZQUN0RCxLQUFJLENBQUMsR0FBRyxHQUFHLGlCQUFlLEtBQUssQ0FBQyxJQUFJLDBCQUFxQixLQUFLLENBQUMsTUFBTSxTQUFJLEtBQUssQ0FBQyxFQUFFLFNBQUksS0FBSyxDQUFDLE1BQU0sV0FBUSxDQUFDO1FBQzVHLENBQUMsRUFBRSxVQUFBLEtBQUssSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQWxCLENBQWtCLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRU0saUNBQVEsR0FBZjtRQUFBLGlCQUtDO1FBSkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUN6QyxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDakMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFqQlUsY0FBYztRQUoxQixnQkFBUyxDQUFDO1lBQ1QsV0FBVyxFQUFFLGlEQUFpRDtTQUMvRCxDQUFDO3lDQU0yQyx1QkFBYyxFQUF5Qiw4QkFBYTtPQUpwRixjQUFjLENBbUIxQjtJQUFELHFCQUFDO0NBQUEsQUFuQkQsSUFtQkM7QUFuQlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQge0FjdGl2YXRlZFJvdXRlfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcblxyXG5pbXBvcnQge0ZsaWNrclNlcnZpY2V9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9mbGlja3Iuc2VydmljZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgdGVtcGxhdGVVcmw6IFwiY29tcG9uZW50cy9pbWFnZS1jb21wb25lbnQvaW1hZ2UuY29tcG9uZW50Lmh0bWxcIlxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEltYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0e1xyXG5cclxuICBwdWJsaWMgdXJsOiBzdHJpbmc7XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSBmbGlja3JTZXJ2aWNlOiBGbGlja3JTZXJ2aWNlKXt9XHJcblxyXG4gIHB1YmxpYyBnZXRQaG90byhwaG90b0lkOm51bWJlcil7XHJcbiAgICB0aGlzLmZsaWNrclNlcnZpY2UuZ2V0UGhvdG9JbmZvKHBob3RvSWQpLnN1YnNjcmliZShwaG90byA9PiB7XHJcbiAgICAgIHRoaXMudXJsID0gYGh0dHBzOi8vZmFybSR7cGhvdG8uZmFybX0uc3RhdGljZmxpY2tyLmNvbS8ke3Bob3RvLnNlcnZlcn0vJHtwaG90by5pZH1fJHtwaG90by5zZWNyZXR9X24uanBnYDtcclxuICAgIH0sIGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkluaXQoKXtcclxuICAgIHRoaXMuYWN0aXZhdGVkUm91dGUucGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xyXG4gICAgICBsZXQgcGhvdG9JZCA9IHBhcmFtc1tcInBob3RvX2lkXCJdO1xyXG4gICAgICB0aGlzLmdldFBob3RvKHBob3RvSWQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=