"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
var config_1 = require("../config");
require("rxjs/add/operator/map");
var FlickrService = /** @class */ (function () {
    function FlickrService(http) {
        this.http = http;
    }
    FlickrService.prototype.photoSearch = function (lat, lon) {
        var url = config_1.Config.Flickr.API_URL + "method=flickr.photos.search&api_key=" + config_1.Config.Flickr.CLIENT_ID + "&content_type=1&lat=" + lat + "&lon=" + lon + "&extras=url_q,geo&format=json&nojsoncallback=1";
        return this.http.get(url).map(function (response) { return response.json().photos.photo; }).catch(function (err) { return Rx_1.Observable.throw(err); });
    };
    FlickrService.prototype.getPhotoInfo = function (photoId) {
        var url = config_1.Config.Flickr.API_URL + "method=flickr.photos.getInfo&api_key=" + config_1.Config.Flickr.CLIENT_ID + "&photo_id=" + photoId + "&format=json&nojsoncallback=1";
        return this.http.get(url).map(function (response) { return response.json().photo; }).catch(function (err) { return Rx_1.Observable.throw(err); });
    };
    FlickrService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], FlickrService);
    return FlickrService;
}());
exports.FlickrService = FlickrService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxpY2tyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmbGlja3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRDtBQUNwRCxzQ0FBNkM7QUFDN0MsOEJBQW1DO0FBQ25DLG9DQUFpQztBQUdqQyxpQ0FBK0I7QUFHL0I7SUFFRSx1QkFBMkIsSUFBUztRQUFULFNBQUksR0FBSixJQUFJLENBQUs7SUFBRSxDQUFDO0lBRWhDLG1DQUFXLEdBQWxCLFVBQW1CLEdBQVcsRUFBRSxHQUFXO1FBRXpDLElBQUksR0FBRyxHQUFNLGVBQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyw0Q0FBdUMsZUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLDRCQUF1QixHQUFHLGFBQVEsR0FBRyxtREFBZ0QsQ0FBQztRQUV0TCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQTVCLENBQTRCLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxlQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFyQixDQUFxQixDQUFDLENBQUM7SUFDOUcsQ0FBQztJQUVNLG9DQUFZLEdBQW5CLFVBQW9CLE9BQWU7UUFFakMsSUFBSSxHQUFHLEdBQU0sZUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLDZDQUF3QyxlQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsa0JBQWEsT0FBTyxrQ0FBK0IsQ0FBQztRQUVySixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssRUFBckIsQ0FBcUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLGVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQXJCLENBQXFCLENBQUMsQ0FBQztJQUN2RyxDQUFDO0lBaEJVLGFBQWE7UUFEekIsaUJBQVUsRUFBRTt5Q0FHcUIsV0FBSTtPQUZ6QixhQUFhLENBa0J6QjtJQUFELG9CQUFDO0NBQUEsQUFsQkQsSUFrQkM7QUFsQlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5qZWN0YWJsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHtIdHRwLCBSZXNwb25zZX0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tIFwicnhqcy9SeFwiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4uL2NvbmZpZ1wiO1xyXG5pbXBvcnQge1Bob3RvU2VhcmNoUmVzcG9uc2V9IGZyb20gXCIuLi9tb2RlbHMvcGhvdG9TZWFyY2hSZXNwb25zZVwiO1xyXG5pbXBvcnQge0dldEluZm9SZXNwb25zZX0gZnJvbSBcIi4uL21vZGVscy9nZXRJbmZvUmVzcG9uc2VcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBGbGlja3JTZXJ2aWNle1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOkh0dHApe31cclxuXHJcbiAgcHVibGljIHBob3RvU2VhcmNoKGxhdDogbnVtYmVyLCBsb246IG51bWJlcik6T2JzZXJ2YWJsZTxQaG90b1NlYXJjaFJlc3BvbnNlW10+e1xyXG5cclxuICAgIGxldCB1cmwgPSBgJHtDb25maWcuRmxpY2tyLkFQSV9VUkx9bWV0aG9kPWZsaWNrci5waG90b3Muc2VhcmNoJmFwaV9rZXk9JHtDb25maWcuRmxpY2tyLkNMSUVOVF9JRH0mY29udGVudF90eXBlPTEmbGF0PSR7bGF0fSZsb249JHtsb259JmV4dHJhcz11cmxfcSxnZW8mZm9ybWF0PWpzb24mbm9qc29uY2FsbGJhY2s9MWA7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsKS5tYXAocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpLnBob3Rvcy5waG90bykuY2F0Y2goZXJyID0+IE9ic2VydmFibGUudGhyb3coZXJyKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0UGhvdG9JbmZvKHBob3RvSWQ6IG51bWJlcik6IE9ic2VydmFibGU8R2V0SW5mb1Jlc3BvbnNlPntcclxuXHJcbiAgICBsZXQgdXJsID0gYCR7Q29uZmlnLkZsaWNrci5BUElfVVJMfW1ldGhvZD1mbGlja3IucGhvdG9zLmdldEluZm8mYXBpX2tleT0ke0NvbmZpZy5GbGlja3IuQ0xJRU5UX0lEfSZwaG90b19pZD0ke3Bob3RvSWR9JmZvcm1hdD1qc29uJm5vanNvbmNhbGxiYWNrPTFgO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCkubWFwKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKS5waG90bykuY2F0Y2goZXJyID0+IE9ic2VydmFibGUudGhyb3coZXJyKSk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=