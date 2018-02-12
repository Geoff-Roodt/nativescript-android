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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VzTGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbWFnZXNMaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFnRDtBQUNoRCwwQ0FBdUM7QUFDdkMsdUNBQW9DO0FBRXBDLGdFQUE0RDtBQUM1RCwwRUFBc0U7QUFVdEU7SUFNRSw2QkFBMkIsYUFBMkIsRUFBVSxrQkFBc0MsRUFBVSxJQUFXLEVBQVUsTUFBYztRQUF4SCxrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUFVLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFPO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNqSixJQUFJLENBQUMsU0FBUyxHQUFHLGVBQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO0lBQzlDLENBQUM7SUFFTSx3Q0FBVSxHQUFqQixVQUFrQixJQUFJO1FBQXRCLGlCQWlCQztRQWhCQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDdkIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQztZQUN6QyxLQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtnQkFDaEMsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsS0FBSztvQkFDN0IsS0FBSyxDQUFDLFFBQVEsR0FBRyxLQUFJLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUNsSCxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUNmLENBQUMsQ0FBQyxDQUFDO2dCQUNILEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDbkIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7b0JBQ3BCLEdBQUcsRUFBRSxLQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUTtvQkFDckMsR0FBRyxFQUFFLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTO29CQUN0QyxRQUFRLEVBQUUsSUFBSTtpQkFDZixDQUFDLENBQUM7WUFDTCxDQUFDLEVBQ0QsVUFBQSxLQUFLLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFsQixDQUFrQixDQUFDLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0seUNBQVcsR0FBbEI7UUFBQSxpQkFVQztRQVRDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsS0FBMEIsRUFBRSxLQUFhO1lBQ3RFLE1BQU0sQ0FBQztnQkFDTCxHQUFHLEVBQUUsS0FBSyxDQUFDLFFBQVE7Z0JBQ25CLEdBQUcsRUFBRSxLQUFLLENBQUMsU0FBUztnQkFDcEIsS0FBSyxFQUFFLGNBQU8sS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBTyxLQUFJLENBQUMsU0FBUyxDQUFDLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUM7YUFDdkUsQ0FBQTtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVNLHVDQUFTLEdBQWhCLFVBQWlCLElBQVM7UUFDeEIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7WUFDcEIsR0FBRyxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO1lBQy9CLEdBQUcsRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztZQUNoQyxRQUFRLEVBQUUsS0FBSztTQUNoQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sdUNBQVMsR0FBaEIsVUFBaUIsSUFBUztRQUN4QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGtCQUFrQixFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFTSx3Q0FBVSxHQUFqQjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM3RyxDQUFDO0lBekRVLG1CQUFtQjtRQUwvQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHFCQUFxQjtZQUMvQixXQUFXLEVBQUUsMkRBQTJEO1NBQ3pFLENBQUM7eUNBUXlDLDhCQUFhLEVBQThCLHdDQUFrQixFQUFlLGFBQU0sRUFBa0IsZUFBTTtPQU54SSxtQkFBbUIsQ0EyRC9CO0lBQUQsMEJBQUM7Q0FBQSxBQTNERCxJQTJEQztBQTNEWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgTmdab25lfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQge1JvdXRlcn0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4uLy4uL2NvbmZpZ1wiO1xyXG5cclxuaW1wb3J0IHtGbGlja3JTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvZmxpY2tyLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtHZW9sb2NhdGlvblNlcnZpY2V9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9nZW9sb2NhdGlvbi5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQge1Bob3RvU2VhcmNoUmVzcG9uc2V9IGZyb20gXCIuLi8uLi9tb2RlbHMvcGhvdG9TZWFyY2hSZXNwb25zZVwiO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBcIkltYWdlc0xpc3RDb21wb25lbnRcIixcclxuICB0ZW1wbGF0ZVVybDogXCJjb21wb25lbnRzL2ltYWdlc0xpc3QtY29tcG9uZW50L2ltYWdlc0xpc3QuY29tcG9uZW50Lmh0bWxcIlxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEltYWdlc0xpc3RDb21wb25lbnQge1xyXG5cclxuICBwcml2YXRlIG1hcGJveDogYW55O1xyXG4gIHB1YmxpYyBtYXBib3hLZXk6IHN0cmluZztcclxuICBwdWJsaWMgcGhvdG9zOiBQaG90b1NlYXJjaFJlc3BvbnNlW107XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIGZsaWNrclNlcnZpY2U6RmxpY2tyU2VydmljZSwgcHJpdmF0ZSBnZW9sb2NhdGlvblNlcnZpY2U6IEdlb2xvY2F0aW9uU2VydmljZSwgcHJpdmF0ZSB6b25lOk5nWm9uZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcil7XHJcbiAgICB0aGlzLm1hcGJveEtleSA9IENvbmZpZy5NYXBCb3guQUNDRVNTX1RPS0VOO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uTWFwUmVhZHkoYXJncyl7XHJcbiAgICB0aGlzLm1hcGJveCA9IGFyZ3MubWFwO1xyXG4gICAgdGhpcy5nZW9sb2NhdGlvblNlcnZpY2UuZ2V0TG9jYXRpb24oKS50aGVuKCgpID0+IHtcclxuICAgICAgdGhpcy5sb2FkUGhvdG9zKCkuc3Vic2NyaWJlKHBob3RvcyA9PiB7XHJcbiAgICAgICAgdGhpcy5waG90b3MgPSBwaG90b3MubWFwKChwaG90bykgPT4ge1xyXG4gICAgICAgICAgcGhvdG8uZGlzdGFuY2UgPSB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS5nZXREaXN0YW5jZUZyb20ocGFyc2VGbG9hdChwaG90by5sYXRpdHVkZSksIHBhcnNlRmxvYXQocGhvdG8ubG9uZ2l0dWRlKSk7XHJcbiAgICAgICAgICByZXR1cm4gcGhvdG87XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5kcm9wTWFya2VycygpO1xyXG4gICAgICAgIHRoaXMubWFwYm94LnNldENlbnRlcih7XHJcbiAgICAgICAgICBsYXQ6IHRoaXMuZ2VvbG9jYXRpb25TZXJ2aWNlLmxhdGl0dWRlLFxyXG4gICAgICAgICAgbG5nOiB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS5sb25naXR1ZGUsXHJcbiAgICAgICAgICBhbmltYXRlZDogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9LFxyXG4gICAgICBlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZHJvcE1hcmtlcnMoKXtcclxuICAgIGxldCBtYXJrZXJzID0gdGhpcy5waG90b3MubWFwKChwaG90bzogUGhvdG9TZWFyY2hSZXNwb25zZSwgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGxhdDogcGhvdG8ubGF0aXR1ZGUsXHJcbiAgICAgICAgbG5nOiBwaG90by5sb25naXR1ZGUsXHJcbiAgICAgICAgb25Ub3A6ICgpID0+IHt0aGlzLnpvbmUucnVuKCgpID0+IHt0aGlzLnNob3dQaG90byh7aW5kZXg6IGluZGV4fSk7fSk7fVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLm1hcGJveC5hZGRNYXJrZXJzKG1hcmtlcnMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNlbnRlck1hcChhcmdzOiBhbnkpe1xyXG4gICAgbGV0IHBob3RvID0gdGhpcy5waG90b3NbYXJncy5pbmRleF07XHJcbiAgICB0aGlzLm1hcGJveC5zZXRDZW50ZXIoe1xyXG4gICAgICBsYXQ6IHBhcnNlRmxvYXQocGhvdG8ubGF0aXR1ZGUpLFxyXG4gICAgICBsbmc6IHBhcnNlRmxvYXQocGhvdG8ubG9uZ2l0dWRlKSxcclxuICAgICAgYW5pbWF0ZWQ6IGZhbHNlXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzaG93UGhvdG8oYXJnczogYW55KXtcclxuICAgIGxldCBwaG90byA9IHRoaXMucGhvdG9zW2FyZ3MuaW5kZXhdO1xyXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2ltYWdlLWNvbXBvbmVudFwiLCBwaG90by5pZF0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGxvYWRQaG90b3MoKXtcclxuICAgIHJldHVybiB0aGlzLmZsaWNrclNlcnZpY2UucGhvdG9TZWFyY2godGhpcy5nZW9sb2NhdGlvblNlcnZpY2UubGF0aXR1ZGUsIHRoaXMuZ2VvbG9jYXRpb25TZXJ2aWNlLmxvbmdpdHVkZSk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=