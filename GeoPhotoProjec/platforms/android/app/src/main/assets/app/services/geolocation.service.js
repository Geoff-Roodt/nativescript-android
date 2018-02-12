"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var geolocation = require("nativescript-geolocation");
var enums_1 = require("ui/enums");
var humanizeDistance = require("humanize-distance");
var GeolocationService = /** @class */ (function () {
    function GeolocationService() {
    }
    GeolocationService.prototype.getLocation = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!geolocation.isEnabled()) {
                geolocation.enableLocationRequest(true).then(function () {
                    _this._getCurrentLocation().then(resolve).catch(reject);
                });
            }
            else {
                _this._getCurrentLocation().then(resolve).catch(reject);
            }
        });
    };
    GeolocationService.prototype.getDistanceFrom = function (latitude, longitude) {
        return humanizeDistance({ latitude: latitude, longitude: longitude }, { latitude: this.latitude, longitude: this.longitude }, "en-US", "us");
    };
    GeolocationService.prototype._getCurrentLocation = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            geolocation.getCurrentLocation({
                desiredAccuracy: enums_1.Accuracy.high,
                timeout: 20000
            }).then(function (location) {
                _this.latitude = location.latitude;
                _this.longitude = location.longitude;
                resolve();
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    GeolocationService = __decorate([
        core_1.Injectable()
    ], GeolocationService);
    return GeolocationService;
}());
exports.GeolocationService = GeolocationService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbG9jYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdlb2xvY2F0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUM7QUFDekMsc0RBQXdEO0FBQ3hELGtDQUFrQztBQUNsQyxJQUFJLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBR3BEO0lBQUE7SUF3Q0EsQ0FBQztJQW5DUSx3Q0FBVyxHQUFsQjtRQUFBLGlCQVdDO1FBVkMsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDakMsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQSxDQUFDO2dCQUM1QixXQUFXLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDO29CQUMzQyxLQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN6RCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUM7WUFDRCxJQUFJLENBQUEsQ0FBQztnQkFDSCxLQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3pELENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSw0Q0FBZSxHQUF0QixVQUF1QixRQUFlLEVBQUUsU0FBZ0I7UUFDdEQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEVBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM3SSxDQUFDO0lBRU0sZ0RBQW1CLEdBQTFCO1FBQUEsaUJBZ0JDO1FBZEMsTUFBTSxDQUFDLElBQUksT0FBTyxDQUNoQixVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ2QsV0FBVyxDQUFDLGtCQUFrQixDQUFDO2dCQUM3QixlQUFlLEVBQUUsZ0JBQVEsQ0FBQyxJQUFJO2dCQUM5QixPQUFPLEVBQUUsS0FBSzthQUNmLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFRO2dCQUNkLEtBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQztnQkFDbEMsS0FBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDO2dCQUNwQyxPQUFPLEVBQUUsQ0FBQztZQUNaLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFBLEdBQUc7Z0JBQ1YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2QsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQ0YsQ0FBQztJQUNKLENBQUM7SUF0Q1Usa0JBQWtCO1FBRDlCLGlCQUFVLEVBQUU7T0FDQSxrQkFBa0IsQ0F3QzlCO0lBQUQseUJBQUM7Q0FBQSxBQXhDRCxJQXdDQztBQXhDWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCAqIGFzIGdlb2xvY2F0aW9uIGZyb20gXCJuYXRpdmVzY3JpcHQtZ2VvbG9jYXRpb25cIjtcclxuaW1wb3J0IHtBY2N1cmFjeX0gZnJvbSAndWkvZW51bXMnO1xyXG52YXIgaHVtYW5pemVEaXN0YW5jZSA9IHJlcXVpcmUoXCJodW1hbml6ZS1kaXN0YW5jZVwiKTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEdlb2xvY2F0aW9uU2VydmljZXtcclxuXHJcbiAgcHVibGljIGxhdGl0dWRlOiBudW1iZXI7XHJcbiAgcHVibGljIGxvbmdpdHVkZTogbnVtYmVyO1xyXG5cclxuICBwdWJsaWMgZ2V0TG9jYXRpb24oKTpQcm9taXNlPGFueT57XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBpZiAoIWdlb2xvY2F0aW9uLmlzRW5hYmxlZCgpKXtcclxuICAgICAgICBnZW9sb2NhdGlvbi5lbmFibGVMb2NhdGlvblJlcXVlc3QodHJ1ZSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLl9nZXRDdXJyZW50TG9jYXRpb24oKS50aGVuKHJlc29sdmUpLmNhdGNoKHJlamVjdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZXtcclxuICAgICAgICB0aGlzLl9nZXRDdXJyZW50TG9jYXRpb24oKS50aGVuKHJlc29sdmUpLmNhdGNoKHJlamVjdCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldERpc3RhbmNlRnJvbShsYXRpdHVkZTpudW1iZXIsIGxvbmdpdHVkZTpudW1iZXIpOiBzdHJpbmd7XHJcbiAgICByZXR1cm4gaHVtYW5pemVEaXN0YW5jZSh7bGF0aXR1ZGU6IGxhdGl0dWRlLCBsb25naXR1ZGU6IGxvbmdpdHVkZX0sIHsgbGF0aXR1ZGU6IHRoaXMubGF0aXR1ZGUsIGxvbmdpdHVkZTogdGhpcy5sb25naXR1ZGUgfSwgXCJlbi1VU1wiLCBcInVzXCIpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIF9nZXRDdXJyZW50TG9jYXRpb24oKTpQcm9taXNlPGFueT57XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKFxyXG4gICAgICAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgZ2VvbG9jYXRpb24uZ2V0Q3VycmVudExvY2F0aW9uKHtcclxuICAgICAgICAgIGRlc2lyZWRBY2N1cmFjeTogQWNjdXJhY3kuaGlnaCxcclxuICAgICAgICAgIHRpbWVvdXQ6IDIwMDAwXHJcbiAgICAgICAgfSkudGhlbihsb2NhdGlvbiA9PiB7XHJcbiAgICAgICAgICB0aGlzLmxhdGl0dWRlID0gbG9jYXRpb24ubGF0aXR1ZGU7XHJcbiAgICAgICAgICB0aGlzLmxvbmdpdHVkZSA9IGxvY2F0aW9uLmxvbmdpdHVkZTtcclxuICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==