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
        console.log("ENTERED INTO PHOTOSEARCH FLICKR SERVICE");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxpY2tyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmbGlja3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRDtBQUNwRCxzQ0FBNkM7QUFDN0MsOENBQTJDO0FBQzNDLG9DQUFpQztBQUdqQyxpQ0FBK0I7QUFDL0IsbUNBQWlDO0FBR2pDO0lBRUUsdUJBQTJCLElBQVM7UUFBVCxTQUFJLEdBQUosSUFBSSxDQUFLO0lBQUUsQ0FBQztJQUVoQyxtQ0FBVyxHQUFsQixVQUFtQixHQUFXLEVBQUUsR0FBVztRQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7UUFDdkQsSUFBSSxHQUFHLEdBQU0sZUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLDRDQUF1QyxlQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsNEJBQXVCLEdBQUcsYUFBUSxHQUFHLG1EQUFnRCxDQUFDO1FBRXRMLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBNUIsQ0FBNEIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLHVCQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFyQixDQUFxQixDQUFDLENBQUM7SUFDOUcsQ0FBQztJQUVNLG9DQUFZLEdBQW5CLFVBQW9CLE9BQWU7UUFFakMsSUFBSSxHQUFHLEdBQU0sZUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLDZDQUF3QyxlQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsa0JBQWEsT0FBTyxrQ0FBK0IsQ0FBQztRQUVySixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssRUFBckIsQ0FBcUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLHVCQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFyQixDQUFxQixDQUFDLENBQUM7SUFDdkcsQ0FBQztJQWhCVSxhQUFhO1FBRHpCLGlCQUFVLEVBQUU7eUNBR3FCLFdBQUk7T0FGekIsYUFBYSxDQWtCekI7SUFBRCxvQkFBQztDQUFBLEFBbEJELElBa0JDO0FBbEJZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEluamVjdGFibGV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7SHR0cCwgUmVzcG9uc2V9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XHJcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4uL2NvbmZpZ1wiO1xyXG5pbXBvcnQge1Bob3RvU2VhcmNoUmVzcG9uc2V9IGZyb20gXCIuLi9tb2RlbHMvcGhvdG9TZWFyY2hSZXNwb25zZVwiO1xyXG5pbXBvcnQge0dldEluZm9SZXNwb25zZX0gZnJvbSBcIi4uL21vZGVscy9nZXRJbmZvUmVzcG9uc2VcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2NhdGNoXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBGbGlja3JTZXJ2aWNle1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOkh0dHApe31cclxuXHJcbiAgcHVibGljIHBob3RvU2VhcmNoKGxhdDogbnVtYmVyLCBsb246IG51bWJlcik6T2JzZXJ2YWJsZTxQaG90b1NlYXJjaFJlc3BvbnNlW10+e1xyXG4gICAgY29uc29sZS5sb2coXCJFTlRFUkVEIElOVE8gUEhPVE9TRUFSQ0ggRkxJQ0tSIFNFUlZJQ0VcIik7XHJcbiAgICBsZXQgdXJsID0gYCR7Q29uZmlnLkZsaWNrci5BUElfVVJMfW1ldGhvZD1mbGlja3IucGhvdG9zLnNlYXJjaCZhcGlfa2V5PSR7Q29uZmlnLkZsaWNrci5DTElFTlRfSUR9JmNvbnRlbnRfdHlwZT0xJmxhdD0ke2xhdH0mbG9uPSR7bG9ufSZleHRyYXM9dXJsX3EsZ2VvJmZvcm1hdD1qc29uJm5vanNvbmNhbGxiYWNrPTFgO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCkubWFwKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKS5waG90b3MucGhvdG8pLmNhdGNoKGVyciA9PiBPYnNlcnZhYmxlLnRocm93KGVycikpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFBob3RvSW5mbyhwaG90b0lkOiBudW1iZXIpOiBPYnNlcnZhYmxlPEdldEluZm9SZXNwb25zZT57XHJcblxyXG4gICAgbGV0IHVybCA9IGAke0NvbmZpZy5GbGlja3IuQVBJX1VSTH1tZXRob2Q9ZmxpY2tyLnBob3Rvcy5nZXRJbmZvJmFwaV9rZXk9JHtDb25maWcuRmxpY2tyLkNMSUVOVF9JRH0mcGhvdG9faWQ9JHtwaG90b0lkfSZmb3JtYXQ9anNvbiZub2pzb25jYWxsYmFjaz0xYDtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwpLm1hcChyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkucGhvdG8pLmNhdGNoKGVyciA9PiBPYnNlcnZhYmxlLnRocm93KGVycikpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19