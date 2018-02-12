"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var config_1 = require("../config");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var FlickrService = /** @class */ (function () {
    function FlickrService(http) {
        this.http = http;
    }
    FlickrService.prototype.photoSearch = function (lat, lon) {
        var url = config_1.Config.Flickr.API_URL + "method=flickr.photos.search&api_key=" + config_1.Config.Flickr.CLIENT_ID + "&content_type=1&lat=" + lat + "&lon=" + lon + "&extras=url_q,geo&format=json&nojsoncallback=1";
        return this.http.get(url).map(function (response) { return response.json().photos.photo; }).catch(function (err) { return Observable_1.Observable.throw(err); });
    };
    FlickrService.prototype.getPhotoInfo = function (photoId) {
        var url = config_1.Config.Flickr.API_URL + "method=flickr.photos.getInfo&api_key=" + config_1.Config.Flickr.CLIENT_ID + "&photo_id=" + photoId + "&format=json&nojsoncallback=1";
        return this.http.get(url).map(function (response) { return response.json().photo; }).catch(function (err) { return Observable_1.Observable.throw(err); });
    };
    FlickrService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], FlickrService);
    return FlickrService;
}());
exports.FlickrService = FlickrService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxpY2tyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmbGlja3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRDtBQUNwRCxzQ0FBNkM7QUFDN0MsOENBQTJDO0FBQzNDLG9DQUFpQztBQUdqQyxpQ0FBK0I7QUFDL0IsbUNBQWlDO0FBR2pDO0lBRUUsdUJBQTJCLElBQVM7UUFBVCxTQUFJLEdBQUosSUFBSSxDQUFLO0lBQUUsQ0FBQztJQUVoQyxtQ0FBVyxHQUFsQixVQUFtQixHQUFXLEVBQUUsR0FBVztRQUV6QyxJQUFJLEdBQUcsR0FBTSxlQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sNENBQXVDLGVBQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyw0QkFBdUIsR0FBRyxhQUFRLEdBQUcsbURBQWdELENBQUM7UUFFdEwsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUE1QixDQUE0QixDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsdUJBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQXJCLENBQXFCLENBQUMsQ0FBQztJQUM5RyxDQUFDO0lBRU0sb0NBQVksR0FBbkIsVUFBb0IsT0FBZTtRQUVqQyxJQUFJLEdBQUcsR0FBTSxlQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sNkNBQXdDLGVBQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxrQkFBYSxPQUFPLGtDQUErQixDQUFDO1FBRXJKLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFyQixDQUFxQixDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsdUJBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQXJCLENBQXFCLENBQUMsQ0FBQztJQUN2RyxDQUFDO0lBaEJVLGFBQWE7UUFEekIsaUJBQVUsRUFBRTt5Q0FHcUIsV0FBSTtPQUZ6QixhQUFhLENBa0J6QjtJQUFELG9CQUFDO0NBQUEsQUFsQkQsSUFrQkM7QUFsQlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5qZWN0YWJsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHtIdHRwLCBSZXNwb25zZX0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi4vY29uZmlnXCI7XHJcbmltcG9ydCB7UGhvdG9TZWFyY2hSZXNwb25zZX0gZnJvbSBcIi4uL21vZGVscy9waG90b1NlYXJjaFJlc3BvbnNlXCI7XHJcbmltcG9ydCB7R2V0SW5mb1Jlc3BvbnNlfSBmcm9tIFwiLi4vbW9kZWxzL2dldEluZm9SZXNwb25zZVwiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvY2F0Y2hcIjtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEZsaWNrclNlcnZpY2V7XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6SHR0cCl7fVxyXG5cclxuICBwdWJsaWMgcGhvdG9TZWFyY2gobGF0OiBudW1iZXIsIGxvbjogbnVtYmVyKTpPYnNlcnZhYmxlPFBob3RvU2VhcmNoUmVzcG9uc2VbXT57XHJcblxyXG4gICAgbGV0IHVybCA9IGAke0NvbmZpZy5GbGlja3IuQVBJX1VSTH1tZXRob2Q9ZmxpY2tyLnBob3Rvcy5zZWFyY2gmYXBpX2tleT0ke0NvbmZpZy5GbGlja3IuQ0xJRU5UX0lEfSZjb250ZW50X3R5cGU9MSZsYXQ9JHtsYXR9Jmxvbj0ke2xvbn0mZXh0cmFzPXVybF9xLGdlbyZmb3JtYXQ9anNvbiZub2pzb25jYWxsYmFjaz0xYDtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwpLm1hcChyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkucGhvdG9zLnBob3RvKS5jYXRjaChlcnIgPT4gT2JzZXJ2YWJsZS50aHJvdyhlcnIpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRQaG90b0luZm8ocGhvdG9JZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxHZXRJbmZvUmVzcG9uc2U+e1xyXG5cclxuICAgIGxldCB1cmwgPSBgJHtDb25maWcuRmxpY2tyLkFQSV9VUkx9bWV0aG9kPWZsaWNrci5waG90b3MuZ2V0SW5mbyZhcGlfa2V5PSR7Q29uZmlnLkZsaWNrci5DTElFTlRfSUR9JnBob3RvX2lkPSR7cGhvdG9JZH0mZm9ybWF0PWpzb24mbm9qc29uY2FsbGJhY2s9MWA7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsKS5tYXAocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpLnBob3RvKS5jYXRjaChlcnIgPT4gT2JzZXJ2YWJsZS50aHJvdyhlcnIpKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==