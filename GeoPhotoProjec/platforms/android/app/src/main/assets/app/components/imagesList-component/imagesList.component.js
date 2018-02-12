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
    }
    ImagesListComponent.prototype.onMapReady = function (args) {
        var _this = this;
        this.mapbox = args.map;
        this.geolocationService.getLocation().then(function () {
            _this.loadPhotos().subscribe(function (photos) {
                _this.photos = photos.map(function (photo) {
                    photo.distance = _this.geolocationService.getDistanceFrom(parseFloat(photo.latitude), parseFloat(photo.longitude));
                    return photo;
                });
                _this.dropMarkers();
                _this.mapbox.setCenter({
                    lat: _this.geolocationService.latitude,
                    lng: _this.geolocationService.longitude,
                    animated: true
                });
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
            templateUrl: "components/imagesList-component/imagesList.component.html"
        }),
        __metadata("design:paramtypes", [flickr_service_1.FlickrService, geolocation_service_1.GeolocationService, core_1.NgZone, router_1.Router])
    ], ImagesListComponent);
    return ImagesListComponent;
}());
exports.ImagesListComponent = ImagesListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VzTGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbWFnZXNMaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFnRDtBQUNoRCwwQ0FBdUM7QUFDdkMsdUNBQW9DO0FBRXBDLGdFQUE0RDtBQUM1RCwwRUFBc0U7QUFVdEU7SUFNRSw2QkFBMkIsYUFBMkIsRUFBVSxrQkFBc0MsRUFBVSxJQUFXLEVBQVUsTUFBYztRQUF4SCxrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUFVLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFPO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNqSixJQUFJLENBQUMsU0FBUyxHQUFHLGVBQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO0lBQzlDLENBQUM7SUFFTSx3Q0FBVSxHQUFqQixVQUFrQixJQUFJO1FBQXRCLGlCQWlCQztRQWhCQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDdkIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQztZQUN6QyxLQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtnQkFDaEMsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsS0FBSztvQkFDN0IsS0FBSyxDQUFDLFFBQVEsR0FBRyxLQUFJLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUNsSCxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUNmLENBQUMsQ0FBQyxDQUFDO2dCQUNILEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDbkIsS0FBSSxDQUFDLE1B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QUM7WUFDVCxRQUFRLEVBQUUscUJBQXFCO1lBQy9CLFdBQVcsRUFBRSwyREFBMkQ7U0FDekUsQ0FBQzt5Q0FReUMsOEJBQWEsRUFBOEIsd0NBQWtCLEVBQWUsYUFBTSxFQUFrQixlQUFNO09BTnhJLG1CQUFtQixDQXVFL0I7SUFBRCwwQkFBQztDQUFBLEFBdkVELElBdUVDO0FBdkVZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBOZ1pvbmV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7Um91dGVyfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi4vLi4vY29uZmlnXCI7XHJcblxyXG5pbXBvcnQge0ZsaWNrclNlcnZpY2V9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9mbGlja3Iuc2VydmljZVwiO1xyXG5pbXBvcnQge0dlb2xvY2F0aW9uU2VydmljZX0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2dlb2xvY2F0aW9uLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCB7UGhvdG9TZWFyY2hSZXNwb25zZX0gZnJvbSBcIi4uLy4uL21vZGVscy9waG90b1NlYXJjaFJlc3BvbnNlXCI7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwiSW1hZ2VzTGlzdENvbXBvbmVudFwiLFxyXG4gIHRlbXBsYXRlVXJsOiBcImNvbXBvbmVudHMvaW1hZ2VzTGlzdC1jb21wb25lbnQvaW1hZ2VzTGlzdC5jb21wb25lbnQuaHRtbFwiXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgSW1hZ2VzTGlzdENvbXBvbmVudCB7XHJcblxyXG4gIHByaXZhdGUgbWFwYm94OiBhbnk7XHJcbiAgcHVibGljIG1hcGJveEtleTogc3RyaW5nO1xyXG4gIHB1YmxpYyBwaG90b3M6IFBob3RvU2VhcmNoUmVzcG9uc2VbXTtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgZmxpY2tyU2VydmljZTpGbGlja3JTZXJ2aWNlLCBwcml2YXRlIGdlb2xvY2F0aW9uU2VydmljZTogR2VvbG9jYXRpb25TZXJ2aWNlLCBwcml2YXRlIHpvbmU6Tmdab25lLCBwcml2YXRlIHJvdXRlcjogUm91dGVyKXtcclxuICAgIHRoaXMubWFwYm94S2V5ID0gQ29uZmlnLk1hcEJveC5BQ0NFU1NfVE9LRU47XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25NYXBSZWFkeShhcmdzKXtcclxuICAgIHRoaXMubWFwYm94ID0gYXJncy5tYXA7XHJcbiAgICB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS5nZXRMb2NhdGlvbigpLnRoZW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLmxvYWRQaG90b3MoKS5zdWJzY3JpYmUocGhvdG9zID0+IHtcclxuICAgICAgICB0aGlzLnBob3RvcyA9IHBob3Rvcy5tYXAoKHBob3RvKSA9PiB7XHJcbiAgICAgICAgICBwaG90by5kaXN0YW5jZSA9IHRoaXMuZ2VvbG9jYXRpb25TZXJ2aWNlLmdldERpc3RhbmNlRnJvbShwYXJzZUZsb2F0KHBob3RvLmxhdGl0dWRlKSwgcGFyc2VGbG9hdChwaG90by5sb25naXR1ZGUpKTtcclxuICAgICAgICAgIHJldHVybiBwaG90bztcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmRyb3BNYXJrZXJzKCk7XHJcbiAgICAgICAgdGhpcy5tYXBib3guc2V0Q2VudGVyKHtcclxuICAgICAgICAgIGxhdDogdGhpcy5nZW9sb2NhdGlvblNlcnZpY2UubGF0aXR1ZGUsXHJcbiAgICAgICAgICBsbmc6IHRoaXMuZ2VvbG9jYXRpb25TZXJ2aWNlLmxvbmdpdHVkZSxcclxuICAgICAgICAgIGFuaW1hdGVkOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkcm9wTWFya2Vycygpe1xyXG4gICAgbGV0IG1hcmtlcnMgPSB0aGlzLnBob3Rvcy5tYXAoKHBob3RvOiBQaG90b1NlYXJjaFJlc3BvbnNlLCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgbGF0OiBwaG90by5sYXRpdHVkZSxcclxuICAgICAgICBsbmc6IHBob3RvLmxvbmdpdHVkZSxcclxuICAgICAgICBvblRvcDogKCkgPT4ge3RoaXMuem9uZS5ydW4oKCkgPT4ge3RoaXMuc2hvd1Bob3RvKHtpbmRleDogaW5kZXh9KTt9KTt9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMubWFwYm94LmFkZE1hcmtlcnMobWFya2Vycyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2VudGVyTWFwKGFyZ3M6IGFueSl7XHJcbiAgICBsZXQgcGhvdG8gPSB0aGlzLnBob3Rvc1thcmdzLmluZGV4XTtcclxuICAgIHRoaXMubWFwYm94LnNldENlbnRlcih7XHJcbiAgICAgIGxhdDogcGFyc2VGbG9hdChwaG90by5sYXRpdHVkZSksXHJcbiAgICAgIGxuZzogcGFyc2VGbG9hdChwaG90by5sb25naXR1ZGUpLFxyXG4gICAgICBhbmltYXRlZDogZmFsc2VcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNob3dQaG90byhhcmdzOiBhbnkpe1xyXG4gICAgbGV0IHBob3RvID0gdGhpcy5waG90b3NbYXJncy5pbmRleF07XHJcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvaW1hZ2UtY29tcG9uZW50XCIsIHBob3RvLmlkXSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbG9hZFBob3Rvcygpe1xyXG4gICAgcmV0dXJuIHRoaXMuZmxpY2tyU2VydmljZS5waG90b1NlYXJjaCh0aGlzLmdlb2xvY2F0aW9uU2VydmljZS5sYXRpdHVkZSwgdGhpcy5nZW9sb2NhdGlvblNlcnZpY2UubG9uZ2l0dWRlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzeW5jUGhvdG9zKGFyZ3M6IGFueSl7XHJcbiAgICB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS5nZXRMb2NhdGlvbigpLnRoZW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLmxvYWRQaG90b3MoKS5zdWJzY3JpYmUocGhvdG9zID0+IHtcclxuICAgICAgICB0aGlzLnBob3RvcyA9IHBob3Rvcy5tYXAoKHBob3RvKSA9PiB7XHJcbiAgICAgICAgICBwaG90by5kaXN0YW5jZSA9IHRoaXMuZ2VvbG9jYXRpb25TZXJ2aWNlLmdldERpc3RhbmNlRnJvbShwYXJzZUZsb2F0KHBob3RvLmxhdGl0dWRlKSwgcGFyc2VGbG9hdChwaG90by5sb25naXR1ZGUpKTtcclxuICAgICAgICAgIHJldHVybiBwaG90bztcclxuICAgICAgICB9KTtcclxuICAgICAgfSxcclxuICAgICAgZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbn1cclxuIl19