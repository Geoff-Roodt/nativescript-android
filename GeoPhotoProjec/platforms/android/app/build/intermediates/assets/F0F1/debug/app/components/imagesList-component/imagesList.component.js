"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var config_1 = require("../../config");
var flickr_service_1 = require("../../services/flickr.service");
var geolocation_service_1 = require("../../services/geolocation.service");
var ImagesListComponent = /** @class */ (function () {
    function ImagesListComponent(flickrService, geolocationService, zone, router) {
        this.flickrService = flickrService;
        this.geolocationService = geolocationService;
        this.zone = zone;
        this.router = router;
        this.mapboxKey = config_1.Config.MapBox.ACCESS_TOKEN;
        console.log("SETUP MAPBOX KEY");
    }
    ImagesListComponent.prototype.onMapReady = function (args) {
        var _this = this;
        console.log("ENTERED INTO MAPREADY");
        this.mapbox = args.map;
        console.log("MAPBOX SETUP");
        this.geolocationService.getLocation().then(function () {
            _this.loadPhotos().subscribe(function (photos) {
                _this.photos = photos.map(function (photo) {
                    photo.distance = _this.geolocationService.getDistanceFrom(parseFloat(photo.latitude), parseFloat(photo.longitude));
                    console.log("GOT DISTANCE");
                    return photo;
                });
                console.log("MAPPED PHOTOS");
                /*
                this.dropMarkers();
                this.mapbox.setCenter({
                  lat: this.geolocationService.latitude,
                  lng: this.geolocationService.longitude,
                  animated: true
                });
                */
            }, function (error) { return console.log(error); });
        });
    };
    ImagesListComponent.prototype.dropMarkers = function () {
        var _this = this;
        var markers = this.photos.map(function (photo, index) {
            return {
                lat: photo.latitude,
                lng: photo.longitude,
                onTop: function () { _this.zone.run(function () { _this.showPhoto({ index: index }); }); }
            };
        });
        this.mapbox.addMarkers(markers);
    };
    ImagesListComponent.prototype.centerMap = function (args) {
        var photo = this.photos[args.index];
        this.mapbox.setCenter({
            lat: parseFloat(photo.latitude),
            lng: parseFloat(photo.longitude),
            animated: false
        });
    };
    ImagesListComponent.prototype.showPhoto = function (args) {
        var photo = this.photos[args.index];
        this.router.navigate(["/image-component", photo.id]);
    };
    ImagesListComponent.prototype.loadPhotos = function () {
        console.log("ENTERED LOADING PHOTOS");
        return this.flickrService.photoSearch(this.geolocationService.latitude, this.geolocationService.longitude);
    };
    ImagesListComponent.prototype.syncPhotos = function (args) {
        var _this = this;
        this.geolocationService.getLocation().then(function () {
            _this.loadPhotos().subscribe(function (photos) {
                _this.photos = photos.map(function (photo) {
                    photo.distance = _this.geolocationService.getDistanceFrom(parseFloat(photo.latitude), parseFloat(photo.longitude));
                    return photo;
                });
            }, function (error) { return console.log(error); });
        });
    };
    ImagesListComponent = __decorate([
        core_1.Component({
            selector: "ImagesListComponent",
            providers: [flickr_service_1.FlickrService, geolocation_service_1.GeolocationService],
            templateUrl: "components/imagesList-component/imagesList.component.html"
        }),
        __metadata("design:paramtypes", [flickr_service_1.FlickrService, geolocation_service_1.GeolocationService, core_1.NgZone, router_1.Router])
    ], ImagesListComponent);
    return ImagesListComponent;
}());
exports.ImagesListComponent = ImagesListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VzTGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbWFnZXNMaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRDtBQUMzRCwwQ0FBdUM7QUFDdkMsdUNBQW9DO0FBSXBDLGdFQUE0RDtBQUM1RCwwRUFBc0U7QUFXdEU7SUFNRSw2QkFBMkIsYUFBMkIsRUFBVSxrQkFBc0MsRUFBVSxJQUFXLEVBQVUsTUFBYztRQUF4SCxrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUFVLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFPO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNqSixJQUFJLENBQUMsU0FBUyxHQUFHLGVBQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRU0sd0NBQVUsR0FBakIsVUFBa0IsSUFBSTtRQUF0QixpQkF1QkM7UUF0QkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDekMsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07Z0JBQ2hDLEtBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEtBQUs7b0JBQzdCLEtBQUssQ0FBQyxRQUFRLEdBQUcsS0FBSSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxL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QWxCLENBQWtCLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUE3RVUsbUJBQW1CO1FBTi9CLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUscUJBQXFCO1lBQy9CLFNBQVMsRUFBRSxDQUFDLDhCQUFhLEVBQUUsd0NBQWtCLENBQUM7WUFDOUMsV0FBVyxFQUFFLDJEQUEyRDtTQUN6RSxDQUFDO3lDQVF5Qyw4QkFBYSxFQUE4Qix3Q0FBa0IsRUFBZSxhQUFNLEVBQWtCLGVBQU07T0FOeEksbUJBQW1CLENBK0UvQjtJQUFELDBCQUFDO0NBQUEsQUEvRUQsSUErRUM7QUEvRVksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE5nWm9uZSwgVmlld0NoaWxkfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQge1JvdXRlcn0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4uLy4uL2NvbmZpZ1wiO1xyXG5pbXBvcnQge1BhZ2V9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7Vmlld30gZnJvbSBcInVpL2NvcmUvdmlld1wiO1xyXG5cclxuaW1wb3J0IHtGbGlja3JTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvZmxpY2tyLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtHZW9sb2NhdGlvblNlcnZpY2V9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9nZW9sb2NhdGlvbi5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQge1Bob3RvU2VhcmNoUmVzcG9uc2V9IGZyb20gXCIuLi8uLi9tb2RlbHMvcGhvdG9TZWFyY2hSZXNwb25zZVwiO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBcIkltYWdlc0xpc3RDb21wb25lbnRcIixcclxuICBwcm92aWRlcnM6IFtGbGlja3JTZXJ2aWNlLCBHZW9sb2NhdGlvblNlcnZpY2VdLFxyXG4gIHRlbXBsYXRlVXJsOiBcImNvbXBvbmVudHMvaW1hZ2VzTGlzdC1jb21wb25lbnQvaW1hZ2VzTGlzdC5jb21wb25lbnQuaHRtbFwiXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgSW1hZ2VzTGlzdENvbXBvbmVudCB7XHJcblxyXG4gIHByaXZhdGUgbWFwYm94OiBhbnk7XHJcbiAgcHVibGljIG1hcGJveEtleTogc3RyaW5nO1xyXG4gIHB1YmxpYyBwaG90b3M6IFBob3RvU2VhcmNoUmVzcG9uc2VbXTtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgZmxpY2tyU2VydmljZTpGbGlja3JTZXJ2aWNlLCBwcml2YXRlIGdlb2xvY2F0aW9uU2VydmljZTogR2VvbG9jYXRpb25TZXJ2aWNlLCBwcml2YXRlIHpvbmU6Tmdab25lLCBwcml2YXRlIHJvdXRlcjogUm91dGVyKXtcclxuICAgIHRoaXMubWFwYm94S2V5ID0gQ29uZmlnLk1hcEJveC5BQ0NFU1NfVE9LRU47XHJcbiAgICBjb25zb2xlLmxvZyhcIlNFVFVQIE1BUEJPWCBLRVlcIik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25NYXBSZWFkeShhcmdzKXtcclxuICAgIGNvbnNvbGUubG9nKFwiRU5URVJFRCBJTlRPIE1BUFJFQURZXCIpO1xyXG4gICAgdGhpcy5tYXBib3ggPSBhcmdzLm1hcDtcclxuICAgIGNvbnNvbGUubG9nKFwiTUFQQk9YIFNFVFVQXCIpO1xyXG4gICAgdGhpcy5nZW9sb2NhdGlvblNlcnZpY2UuZ2V0TG9jYXRpb24oKS50aGVuKCgpID0+IHtcclxuICAgICAgdGhpcy5sb2FkUGhvdG9zKCkuc3Vic2NyaWJlKHBob3RvcyA9PiB7XHJcbiAgICAgICAgdGhpcy5waG90b3MgPSBwaG90b3MubWFwKChwaG90bykgPT4ge1xyXG4gICAgICAgICAgcGhvdG8uZGlzdGFuY2UgPSB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS5nZXREaXN0YW5jZUZyb20ocGFyc2VGbG9hdChwaG90by5sYXRpdHVkZSksIHBhcnNlRmxvYXQocGhvdG8ubG9uZ2l0dWRlKSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkdPVCBESVNUQU5DRVwiKTtcclxuICAgICAgICAgIHJldHVybiBwaG90bztcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk1BUFBFRCBQSE9UT1NcIik7XHJcbiAgICAgICAgLypcclxuICAgICAgICB0aGlzLmRyb3BNYXJrZXJzKCk7XHJcbiAgICAgICAgdGhpcy5tYXBib3guc2V0Q2VudGVyKHtcclxuICAgICAgICAgIGxhdDogdGhpcy5nZW9sb2NhdGlvblNlcnZpY2UubGF0aXR1ZGUsXHJcbiAgICAgICAgICBsbmc6IHRoaXMuZ2VvbG9jYXRpb25TZXJ2aWNlLmxvbmdpdHVkZSxcclxuICAgICAgICAgIGFuaW1hdGVkOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgKi9cclxuICAgICAgfSxcclxuICAgICAgZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRyb3BNYXJrZXJzKCl7XHJcbiAgICBsZXQgbWFya2VycyA9IHRoaXMucGhvdG9zLm1hcCgocGhvdG86IFBob3RvU2VhcmNoUmVzcG9uc2UsIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBsYXQ6IHBob3RvLmxhdGl0dWRlLFxyXG4gICAgICAgIGxuZzogcGhvdG8ubG9uZ2l0dWRlLFxyXG4gICAgICAgIG9uVG9wOiAoKSA9PiB7dGhpcy56b25lLnJ1bigoKSA9PiB7dGhpcy5zaG93UGhvdG8oe2luZGV4OiBpbmRleH0pO30pO31cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5tYXBib3guYWRkTWFya2VycyhtYXJrZXJzKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjZW50ZXJNYXAoYXJnczogYW55KXtcclxuICAgIGxldCBwaG90byA9IHRoaXMucGhvdG9zW2FyZ3MuaW5kZXhdO1xyXG4gICAgdGhpcy5tYXBib3guc2V0Q2VudGVyKHtcclxuICAgICAgbGF0OiBwYXJzZUZsb2F0KHBob3RvLmxhdGl0dWRlKSxcclxuICAgICAgbG5nOiBwYXJzZUZsb2F0KHBob3RvLmxvbmdpdHVkZSksXHJcbiAgICAgIGFuaW1hdGVkOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2hvd1Bob3RvKGFyZ3M6IGFueSl7XHJcbiAgICBsZXQgcGhvdG8gPSB0aGlzLnBob3Rvc1thcmdzLmluZGV4XTtcclxuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9pbWFnZS1jb21wb25lbnRcIiwgcGhvdG8uaWRdKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBsb2FkUGhvdG9zKCl7XHJcbiAgICBjb25zb2xlLmxvZyhcIkVOVEVSRUQgTE9BRElORyBQSE9UT1NcIik7XHJcbiAgICByZXR1cm4gdGhpcy5mbGlja3JTZXJ2aWNlLnBob3RvU2VhcmNoKHRoaXMuZ2VvbG9jYXRpb25TZXJ2aWNlLmxhdGl0dWRlLCB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS5sb25naXR1ZGUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN5bmNQaG90b3MoYXJnczogYW55KXtcclxuICAgIHRoaXMuZ2VvbG9jYXRpb25TZXJ2aWNlLmdldExvY2F0aW9uKCkudGhlbigoKSA9PiB7XHJcbiAgICAgIHRoaXMubG9hZFBob3RvcygpLnN1YnNjcmliZShwaG90b3MgPT4ge1xyXG4gICAgICAgIHRoaXMucGhvdG9zID0gcGhvdG9zLm1hcCgocGhvdG8pID0+IHtcclxuICAgICAgICAgIHBob3RvLmRpc3RhbmNlID0gdGhpcy5nZW9sb2NhdGlvblNlcnZpY2UuZ2V0RGlzdGFuY2VGcm9tKHBhcnNlRmxvYXQocGhvdG8ubGF0aXR1ZGUpLCBwYXJzZUZsb2F0KHBob3RvLmxvbmdpdHVkZSkpO1xyXG4gICAgICAgICAgcmV0dXJuIHBob3RvO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9LFxyXG4gICAgICBlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=