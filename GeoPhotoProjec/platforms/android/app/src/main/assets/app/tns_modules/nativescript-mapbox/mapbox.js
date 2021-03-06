"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils = require("tns-core-modules/utils/utils");
var application = require("tns-core-modules/application");
var frame = require("tns-core-modules/ui/frame");
var fs = require("tns-core-modules/file-system");
var color_1 = require("tns-core-modules/color");
var http = require("tns-core-modules/http");
var mapbox_common_1 = require("./mapbox.common");
exports.MapStyle = mapbox_common_1.MapStyle;
var _mapbox = {};
var _accessToken;
var _markers = [];
var _polylines = [];
var _markerIconDownloadCache = [];
var _locationEngine = null;
var ACCESS_FINE_LOCATION_PERMISSION_REQUEST_CODE = 111;
var MapboxView = (function (_super) {
    __extends(MapboxView, _super);
    function MapboxView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MapboxView.prototype.getNativeMapView = function () {
        return this.mapView;
    };
    MapboxView.prototype.createNativeView = function () {
        var _this = this;
        var nativeView = new android.widget.FrameLayout(this._context);
        setTimeout(function () {
            _this.initMap();
        }, 0);
        return nativeView;
    };
    MapboxView.prototype.initMap = function () {
        var _this = this;
        if (!this.mapView && this.config.accessToken) {
            this.mapbox = new Mapbox();
            var settings_1 = Mapbox.merge(this.config, Mapbox.defaults);
            com.mapbox.mapboxsdk.Mapbox.getInstance(this._context, settings_1.accessToken);
            var drawMap = function () {
                _this.mapView = new com.mapbox.mapboxsdk.maps.MapView(_this._context, _getMapboxMapOptions(settings_1));
                _this.mapView.onCreate(null);
                _this.mapView.getMapAsync(new com.mapbox.mapboxsdk.maps.OnMapReadyCallback({
                    onMapReady: function (mbMap) {
                        _this.mapView.mapboxMap = mbMap;
                        _polylines = [];
                        _markers = [];
                        if (settings_1.showUserLocation) {
                            _this.mapbox.requestFineLocationPermission().then(function () {
                                setTimeout(function () {
                                    _showLocation(_this.mapView, mbMap);
                                }, 1000);
                                _this.notify({
                                    eventName: mapbox_common_1.MapboxViewBase.locationPermissionGrantedEvent,
                                    object: _this,
                                    map: _this,
                                    android: _this.mapView
                                });
                            });
                        }
                        _this.notify({
                            eventName: mapbox_common_1.MapboxViewBase.mapReadyEvent,
                            object: _this,
                            map: _this,
                            android: _this.mapView
                        });
                    }
                }));
                _this.nativeView.addView(_this.mapView);
            };
            setTimeout(drawMap, settings_1.delay ? settings_1.delay : 0);
        }
    };
    return MapboxView;
}(mapbox_common_1.MapboxViewBase));
exports.MapboxView = MapboxView;
var _getMapStyle = function (input) {
    var Style = com.mapbox.mapboxsdk.constants.Style;
    if (/^mapbox:\/\/styles/.test(input)) {
        return input;
    }
    if (input === mapbox_common_1.MapStyle.LIGHT || input === mapbox_common_1.MapStyle.LIGHT.toString()) {
        return Style.LIGHT;
    }
    else if (input === mapbox_common_1.MapStyle.DARK || input === mapbox_common_1.MapStyle.DARK.toString()) {
        return Style.DARK;
    }
    else if (input === mapbox_common_1.MapStyle.OUTDOORS || input === mapbox_common_1.MapStyle.OUTDOORS.toString()) {
        return Style.OUTDOORS;
    }
    else if (input === mapbox_common_1.MapStyle.SATELLITE || input === mapbox_common_1.MapStyle.SATELLITE.toString()) {
        return Style.SATELLITE;
    }
    else if (input === mapbox_common_1.MapStyle.HYBRID || input === mapbox_common_1.MapStyle.SATELLITE_STREETS || input === mapbox_common_1.MapStyle.HYBRID.toString() || input === mapbox_common_1.MapStyle.SATELLITE_STREETS.toString()) {
        return Style.SATELLITE_STREETS;
    }
    else if (input === mapbox_common_1.MapStyle.TRAFFIC_DAY || input === mapbox_common_1.MapStyle.TRAFFIC_DAY.toString()) {
        return Style.TRAFFIC_DAY;
    }
    else if (input === mapbox_common_1.MapStyle.TRAFFIC_NIGHT || input === mapbox_common_1.MapStyle.TRAFFIC_NIGHT.toString()) {
        return Style.TRAFFIC_NIGHT;
    }
    else {
        return Style.MAPBOX_STREETS;
    }
};
var _getMapboxMapOptions = function (settings) {
    var mapboxMapOptions = new com.mapbox.mapboxsdk.maps.MapboxMapOptions()
        .styleUrl(_getMapStyle(settings.style))
        .compassEnabled(!settings.hideCompass)
        .rotateGesturesEnabled(!settings.disableRotation)
        .scrollGesturesEnabled(!settings.disableScroll)
        .tiltGesturesEnabled(!settings.disableTilt)
        .zoomGesturesEnabled(!settings.disableZoom)
        .attributionEnabled(!settings.hideAttribution)
        .logoEnabled(!settings.hideLogo);
    if (settings.zoomLevel && !settings.center) {
        settings.center = {
            lat: 48.858093,
            lng: 2.294694
        };
    }
    if (settings.center && settings.center.lat && settings.center.lng) {
        var cameraPositionBuilder = new com.mapbox.mapboxsdk.camera.CameraPosition.Builder()
            .zoom(settings.zoomLevel)
            .target(new com.mapbox.mapboxsdk.geometry.LatLng(settings.center.lat, settings.center.lng));
        mapboxMapOptions.camera(cameraPositionBuilder.build());
    }
    return mapboxMapOptions;
};
var _fineLocationPermissionGranted = function () {
    var hasPermission = android.os.Build.VERSION.SDK_INT < 23;
    if (!hasPermission) {
        hasPermission = android.content.pm.PackageManager.PERMISSION_GRANTED ===
            android.support.v4.content.ContextCompat.checkSelfPermission(application.android.foregroundActivity, android.Manifest.permission.ACCESS_FINE_LOCATION);
    }
    return hasPermission;
};
var _showLocation = function (theMapView, mapboxMap) {
    if (!_locationEngine) {
        _locationEngine = new com.mapbox.services.android.location.LostLocationEngine(application.android.context);
        _locationEngine.setPriority(com.mapbox.services.android.telemetry.location.LocationEnginePriority.HIGH_ACCURACY);
        _locationEngine.activate();
    }
    var locationLayerPlugin = new com.mapbox.mapboxsdk.plugins.locationlayer.LocationLayerPlugin(theMapView, mapboxMap, _locationEngine);
    locationLayerPlugin.setLocationLayerEnabled(com.mapbox.mapboxsdk.plugins.locationlayer.LocationLayerMode.TRACKING);
};
var _getClickedMarkerDetails = function (clicked) {
    for (var m in _markers) {
        var cached = _markers[m];
        if (cached.lat == clicked.getPosition().getLatitude() &&
            cached.lng == clicked.getPosition().getLongitude() &&
            cached.title == clicked.getTitle() &&
            cached.subtitle == clicked.getSnippet()) {
            return cached;
        }
    }
};
var _downloadImage = function (marker) {
    return new Promise(function (resolve, reject) {
        if (_markerIconDownloadCache[marker.icon]) {
            marker.iconDownloaded = _markerIconDownloadCache[marker.icon];
            resolve(marker);
            return;
        }
        http.getImage(marker.icon).then(function (output) {
            marker.iconDownloaded = output.android;
            _markerIconDownloadCache[marker.icon] = marker.iconDownloaded;
            resolve(marker);
        }, function (e) {
            console.log("Download failed for ' " + marker.icon + "' with error: " + e);
            resolve(marker);
        });
    });
};
var _downloadMarkerImages = function (markers) {
    var iterations = [];
    var result = [];
    for (var i = 0; i < markers.length; i++) {
        var marker = markers[i];
        if (marker.icon && marker.icon.startsWith("http")) {
            var p = _downloadImage(marker).then(function (mark) {
                result.push(mark);
            });
            iterations.push(p);
        }
        else {
            result.push(marker);
        }
    }
    return Promise.all(iterations).then(function (output) {
        return result;
    });
};
var _addMarkers = function (markers, nativeMap) {
    if (!markers) {
        console.log("No markers passed");
        return;
    }
    if (!Array.isArray(markers)) {
        console.log("markers must be passed as an Array: [{title:'foo'}]");
        return;
    }
    var theMap = nativeMap || _mapbox;
    if (!theMap || !theMap.mapboxMap) {
        return;
    }
    theMap.mapboxMap.setOnMarkerClickListener(new com.mapbox.mapboxsdk.maps.MapboxMap.OnMarkerClickListener({
        onMarkerClick: function (marker) {
            var cachedMarker = _getClickedMarkerDetails(marker);
            if (cachedMarker && cachedMarker.onTap) {
                cachedMarker.onTap(cachedMarker);
            }
            return false;
        }
    }));
    theMap.mapboxMap.setOnInfoWindowClickListener(new com.mapbox.mapboxsdk.maps.MapboxMap.OnInfoWindowClickListener({
        onInfoWindowClick: function (marker) {
            var cachedMarker = _getClickedMarkerDetails(marker);
            if (cachedMarker && cachedMarker.onCalloutTap) {
                cachedMarker.onCalloutTap(cachedMarker);
            }
            return true;
        }
    }));
    var iconFactory = com.mapbox.mapboxsdk.annotations.IconFactory.getInstance(application.android.context);
    _downloadMarkerImages(markers).then(function (updatedMarkers) {
        for (var m in updatedMarkers) {
            var marker = updatedMarkers[m];
            _markers.push(marker);
            var markerOptions = new com.mapbox.mapboxsdk.annotations.MarkerOptions();
            markerOptions.setTitle(marker.title);
            markerOptions.setSnippet(marker.subtitle);
            markerOptions.setPosition(new com.mapbox.mapboxsdk.geometry.LatLng(parseFloat(marker.lat), parseFloat(marker.lng)));
            if (marker.icon) {
                if (marker.icon.startsWith("res://")) {
                    var resourcename = marker.icon.substring(6);
                    var res = utils.ad.getApplicationContext().getResources();
                    var identifier = res.getIdentifier(resourcename, "drawable", utils.ad.getApplication().getPackageName());
                    if (identifier === 0) {
                        console.log("No icon found for this device density for icon ' " + marker.icon + "'. Falling back to the default icon.");
                    }
                    else {
                        markerOptions.setIcon(iconFactory.fromResource(identifier));
                    }
                }
                else if (marker.icon.startsWith("http")) {
                    if (marker.iconDownloaded !== null) {
                        markerOptions.setIcon(iconFactory.fromBitmap(marker.iconDownloaded));
                    }
                }
                else {
                    console.log("Please use res://resourcename, http(s)://imageurl or iconPath to use a local path");
                }
            }
            else if (marker.iconPath) {
                var iconFullPath = fs.knownFolders.currentApp().path + "/" + marker.iconPath;
                if (fs.File.exists(iconFullPath)) {
                    markerOptions.setIcon(iconFactory.fromPath(iconFullPath));
                }
                else {
                    console.log("Marker icon not found, using the default instead. Requested full path: '\" + " + iconFullPath + "'.");
                }
            }
            marker.android = theMap.mapboxMap.addMarker(markerOptions);
            if (marker.selected) {
                theMap.mapboxMap.selectMarker(marker.android);
            }
        }
    });
};
var _removeMarkers = function (ids, nativeMap) {
    var theMap = nativeMap || _mapbox;
    if (!theMap || !theMap.mapboxMap) {
        return;
    }
    for (var m in _markers) {
        var marker = _markers[m];
        if (!ids || (marker.id && ids.indexOf(marker.id) > -1)) {
            if (ids || (marker.id !== 999997 && marker.id !== 999998)) {
                theMap.mapboxMap.removeAnnotation(marker.android);
            }
        }
    }
    if (ids) {
        _markers = _markers.filter(function (marker) {
            return ids.indexOf(marker.id) < 0;
        });
    }
    else {
        _markers = [];
    }
};
var _getRegionName = function (offlineRegion) {
    var metadata = offlineRegion.getMetadata();
    var jsonStr = new java.lang.String(metadata, "UTF-8");
    var jsonObj = new org.json.JSONObject(jsonStr);
    return jsonObj.getString("name");
};
var _getOfflineManager = function () {
    if (!_mapbox.offlineManager) {
        _mapbox.offlineManager = com.mapbox.mapboxsdk.offline.OfflineManager.getInstance(application.android.context);
    }
    return _mapbox.offlineManager;
};
var Mapbox = (function (_super) {
    __extends(Mapbox, _super);
    function Mapbox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Mapbox.prototype.hasFineLocationPermission = function () {
        return new Promise(function (resolve, reject) {
            try {
                resolve(_fineLocationPermissionGranted());
            }
            catch (ex) {
                console.log("Error in mapbox.hasFineLocationPermission: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.requestFineLocationPermission = function () {
        return new Promise(function (resolve, reject) {
            if (_fineLocationPermissionGranted()) {
                resolve();
                return;
            }
            application.android.on(application.AndroidApplication.activityRequestPermissionsEvent, function (args) {
                if (args.requestCode !== ACCESS_FINE_LOCATION_PERMISSION_REQUEST_CODE) {
                    return;
                }
                for (var i = 0; i < args.permissions.length; i++) {
                    if (args.grantResults[i] === android.content.pm.PackageManager.PERMISSION_DENIED) {
                        reject("Permission denied");
                        return;
                    }
                }
                resolve();
            });
            android.support.v4.app.ActivityCompat.requestPermissions(application.android.foregroundActivity, [android.Manifest.permission.ACCESS_FINE_LOCATION], ACCESS_FINE_LOCATION_PERMISSION_REQUEST_CODE);
        });
    };
    Mapbox.prototype.show = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                var showIt = function () {
                    var settings = Mapbox.merge(options, Mapbox.defaults);
                    if (settings.accessToken === undefined) {
                        reject("Please set the 'accessToken' parameter");
                        return;
                    }
                    if (_mapbox.mapView) {
                        var viewGroup = _mapbox.mapView.getParent();
                        if (viewGroup !== null) {
                            viewGroup.removeView(_mapbox.mapView);
                        }
                    }
                    _accessToken = settings.accessToken;
                    com.mapbox.mapboxsdk.Mapbox.getInstance(application.android.context, _accessToken);
                    var mapboxMapOptions = _getMapboxMapOptions(settings);
                    _mapbox.mapView = new com.mapbox.mapboxsdk.maps.MapView(application.android.context, mapboxMapOptions);
                    _mapbox.mapView.onCreate(null);
                    _mapbox.mapView.getMapAsync(new com.mapbox.mapboxsdk.maps.OnMapReadyCallback({
                        onMapReady: function (mbMap) {
                            _mapbox.mapboxMap = mbMap;
                            _mapbox.mapView.mapboxMap = mbMap;
                            _polylines = [];
                            _markers = [];
                            _addMarkers(settings.markers, _mapbox.mapView);
                            if (settings.showUserLocation) {
                                _this.requestFineLocationPermission().then(function () {
                                    _showLocation(_mapbox.mapView, mbMap);
                                });
                            }
                            resolve({
                                android: _mapbox.mapView
                            });
                        }
                    }));
                    var topMostFrame = frame.topmost(), context = application.android.currentContext, mapViewLayout = new android.widget.FrameLayout(context), density = utils.layout.getDisplayDensity(), left = settings.margins.left * density, right = settings.margins.right * density, top = settings.margins.top * density, bottom = settings.margins.bottom * density, viewWidth = topMostFrame.currentPage.android.getWidth(), viewHeight = topMostFrame.currentPage.android.getHeight(), params = new android.widget.FrameLayout.LayoutParams(viewWidth - left - right, viewHeight - top - bottom);
                    params.setMargins(left, top, right, bottom);
                    _mapbox.mapView.setLayoutParams(params);
                    mapViewLayout.addView(_mapbox.mapView);
                    if (topMostFrame.currentPage.android.getParent()) {
                        topMostFrame.currentPage.android.getParent().addView(mapViewLayout);
                    }
                    else {
                        topMostFrame.currentPage.android.addView(mapViewLayout);
                    }
                };
                setTimeout(showIt, 200);
            }
            catch (ex) {
                console.log("Error in mapbox.show: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.hide = function () {
        return new Promise(function (resolve, reject) {
            try {
                if (_mapbox.mapView) {
                    var viewGroup = _mapbox.mapView.getParent();
                    if (viewGroup !== null) {
                        viewGroup.setVisibility(android.view.View.INVISIBLE);
                    }
                }
                resolve();
            }
            catch (ex) {
                console.log("Error in mapbox.hide: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.unhide = function () {
        return new Promise(function (resolve, reject) {
            try {
                if (_mapbox.mapView) {
                    _mapbox.mapView.getParent().setVisibility(android.view.View.VISIBLE);
                    resolve();
                }
                else {
                    reject("No map found");
                }
            }
            catch (ex) {
                console.log("Error in mapbox.unhide: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.destroy = function (nativeMap) {
        return new Promise(function (resolve, reject) {
            var theMap = nativeMap || _mapbox;
            if (theMap.mapView) {
                var viewGroup = theMap.mapView.getParent();
                if (viewGroup !== null) {
                    viewGroup.removeView(theMap.mapView);
                }
                theMap.mapView = null;
                theMap.mapboxMap = null;
                _mapbox = {};
            }
            resolve();
        });
    };
    Mapbox.prototype.setMapStyle = function (style, nativeMap) {
        return new Promise(function (resolve, reject) {
            try {
                var theMap = nativeMap || _mapbox;
                theMap.mapboxMap.setStyleUrl(_getMapStyle(style));
                resolve();
            }
            catch (ex) {
                console.log("Error in mapbox.setMapStyle: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.addMarkers = function (markers, nativeMap) {
        return new Promise(function (resolve, reject) {
            try {
                _addMarkers(markers, nativeMap);
                resolve();
            }
            catch (ex) {
                console.log("Error in mapbox.addMarkers: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.removeMarkers = function (ids, nativeMap) {
        return new Promise(function (resolve, reject) {
            try {
                _removeMarkers(ids, nativeMap);
                resolve();
            }
            catch (ex) {
                console.log("Error in mapbox.removeMarkers: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.setCenter = function (options, nativeMap) {
        return new Promise(function (resolve, reject) {
            try {
                var theMap = nativeMap || _mapbox;
                var cameraPosition = new com.mapbox.mapboxsdk.camera.CameraPosition.Builder()
                    .target(new com.mapbox.mapboxsdk.geometry.LatLng(options.lat, options.lng))
                    .build();
                if (options.animated === true) {
                    theMap.mapboxMap.animateCamera(com.mapbox.mapboxsdk.camera.CameraUpdateFactory.newCameraPosition(cameraPosition), 1000, null);
                }
                else {
                    theMap.mapboxMap.setCameraPosition(cameraPosition);
                }
                resolve();
            }
            catch (ex) {
                console.log("Error in mapbox.setCenter: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.getCenter = function (nativeMap) {
        return new Promise(function (resolve, reject) {
            try {
                var theMap = nativeMap || _mapbox;
                var coordinate = theMap.mapboxMap.getCameraPosition().target;
                resolve({
                    lat: coordinate.getLatitude(),
                    lng: coordinate.getLongitude()
                });
            }
            catch (ex) {
                console.log("Error in mapbox.getCenter: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.setZoomLevel = function (options, nativeMap) {
        return new Promise(function (resolve, reject) {
            try {
                var theMap = nativeMap || _mapbox;
                var animated = options.animated === undefined || options.animated;
                var level = options.level;
                if (level >= 0 && level <= 20) {
                    var cameraUpdate = com.mapbox.mapboxsdk.camera.CameraUpdateFactory.zoomTo(level);
                    if (animated) {
                        theMap.mapboxMap.easeCamera(cameraUpdate);
                    }
                    else {
                        theMap.mapboxMap.moveCamera(cameraUpdate);
                    }
                    resolve();
                }
                else {
                    reject("invalid zoomlevel, use any double value from 0 to 20 (like 8.3)");
                }
            }
            catch (ex) {
                console.log("Error in mapbox.setZoomLevel: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.getZoomLevel = function (nativeMap) {
        return new Promise(function (resolve, reject) {
            try {
                var theMap = nativeMap || _mapbox;
                var level = theMap.mapboxMap.getCameraPosition().zoom;
                resolve(level);
            }
            catch (ex) {
                console.log("Error in mapbox.getZoomLevel: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.setTilt = function (options, nativeMap) {
        return new Promise(function (resolve, reject) {
            try {
                var theMap = nativeMap || _mapbox;
                var tilt = options.tilt ? options.tilt : 30;
                var cameraPositionBuilder = new com.mapbox.mapboxsdk.camera.CameraPosition.Builder()
                    .tilt(tilt);
                var cameraUpdate = com.mapbox.mapboxsdk.camera.CameraUpdateFactory.newCameraPosition(cameraPositionBuilder.build());
                var durationMs = options.duration ? options.duration : 5000;
                theMap.mapboxMap.easeCamera(cameraUpdate, durationMs);
                setTimeout(function () {
                    resolve();
                }, durationMs);
            }
            catch (ex) {
                console.log("Error in mapbox.setTilt: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.getTilt = function (nativeMap) {
        return new Promise(function (resolve, reject) {
            try {
                var theMap = nativeMap || _mapbox;
                var tilt = theMap.mapboxMap.getCameraPosition().tilt;
                resolve(tilt);
            }
            catch (ex) {
                console.log("Error in mapbox.getTilt: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.getUserLocation = function () {
        return new Promise(function (resolve, reject) {
            try {
                var loc = _locationEngine ? _locationEngine.getLastLocation() : null;
                if (loc === null) {
                    reject("Location not available");
                }
                else {
                    resolve({
                        location: {
                            lat: loc.getLatitude(),
                            lng: loc.getLongitude()
                        },
                        speed: loc.getSpeed()
                    });
                }
            }
            catch (ex) {
                console.log("Error in mapbox.getUserLocation: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.addPolygon = function (options, nativeMap) {
        return new Promise(function (resolve, reject) {
            try {
                var theMap = nativeMap || _mapbox;
                var points = options.points;
                if (points === undefined) {
                    reject("Please set the 'points' parameter");
                    return;
                }
                var polygonOptions = new com.mapbox.mapboxsdk.annotations.PolygonOptions();
                for (var p in points) {
                    var point = points[p];
                    polygonOptions.add(new com.mapbox.mapboxsdk.geometry.LatLng(point.lat, point.lng));
                }
                polygonOptions.fillColor(Mapbox.getAndroidColor(options.fillColor));
                polygonOptions.strokeColor(Mapbox.getAndroidColor(options.strokeColor));
                theMap.mapboxMap.addPolygon(polygonOptions);
                resolve();
            }
            catch (ex) {
                console.log("Error in mapbox.addPolygon: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.addPolyline = function (options, nativeMap) {
        return new Promise(function (resolve, reject) {
            try {
                var theMap = nativeMap || _mapbox;
                var points = options.points;
                if (points === undefined) {
                    reject("Please set the 'points' parameter");
                    return;
                }
                var polylineOptions = new com.mapbox.mapboxsdk.annotations.PolylineOptions();
                polylineOptions.width(options.width || 5);
                polylineOptions.color(Mapbox.getAndroidColor(options.color));
                polylineOptions.alpha(options.opacity === undefined ? 1 : options.opacity);
                for (var p in points) {
                    var point = points[p];
                    polylineOptions.add(new com.mapbox.mapboxsdk.geometry.LatLng(point.lat, point.lng));
                }
                _polylines.push({
                    id: options.id,
                    android: theMap.mapboxMap.addPolyline(polylineOptions)
                });
                resolve();
            }
            catch (ex) {
                console.log("Error in mapbox.addPolyline: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.removePolylines = function (ids, nativeMap) {
        return new Promise(function (resolve, reject) {
            try {
                var theMap = nativeMap || _mapbox;
                for (var p in _polylines) {
                    var polyline = _polylines[p];
                    if (!ids || (polyline.id && ids.indexOf(polyline.id) > -1)) {
                        theMap.mapboxMap.removePolyline(polyline.android);
                    }
                }
                resolve();
            }
            catch (ex) {
                console.log("Error in mapbox.removePolylines: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.animateCamera = function (options, nativeMap) {
        return new Promise(function (resolve, reject) {
            try {
                var theMap = nativeMap || _mapbox;
                var target = options.target;
                if (target === undefined) {
                    reject("Please set the 'target' parameter");
                    return;
                }
                var cameraPositionBuilder = new com.mapbox.mapboxsdk.camera.CameraPosition.Builder()
                    .target(new com.mapbox.mapboxsdk.geometry.LatLng(target.lat, target.lng));
                if (options.bearing) {
                    cameraPositionBuilder.bearing(options.bearing);
                }
                if (options.tilt) {
                    cameraPositionBuilder.tilt(options.tilt);
                }
                if (options.zoomLevel) {
                    cameraPositionBuilder.zoom(options.zoomLevel);
                }
                var durationMs = options.duration ? options.duration : 10000;
                theMap.mapboxMap.animateCamera(com.mapbox.mapboxsdk.camera.CameraUpdateFactory.newCameraPosition(cameraPositionBuilder.build()), durationMs, null);
                setTimeout(function () {
                    resolve();
                }, durationMs);
            }
            catch (ex) {
                console.log("Error in mapbox.animateCamera: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.setOnMapClickListener = function (listener, nativeMap) {
        return new Promise(function (resolve, reject) {
            try {
                var theMap = nativeMap || _mapbox;
                if (!theMap) {
                    reject("No map has been loaded");
                    return;
                }
                theMap.mapboxMap.setOnMapClickListener(new com.mapbox.mapboxsdk.maps.MapboxMap.OnMapClickListener({
                    onMapClick: function (point) {
                        listener({
                            lat: point.getLatitude(),
                            lng: point.getLongitude()
                        });
                    }
                }));
                resolve();
            }
            catch (ex) {
                console.log("Error in mapbox.setOnMapClickListener: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.setOnScrollListener = function (listener, nativeMap) {
        return new Promise(function (resolve, reject) {
            try {
                var theMap = nativeMap || _mapbox;
                if (!theMap) {
                    reject("No map has been loaded");
                    return;
                }
                theMap.mapboxMap.setOnScrollListener(new com.mapbox.mapboxsdk.maps.MapboxMap.OnScrollListener({
                    onScroll: function () {
                        listener();
                    }
                }));
                resolve();
            }
            catch (ex) {
                console.log("Error in mapbox.setOnScrollListener: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.setOnFlingListener = function (listener, nativeMap) {
        return new Promise(function (resolve, reject) {
            try {
                var theMap = nativeMap || _mapbox;
                if (!theMap) {
                    reject("No map has been loaded");
                    return;
                }
                theMap.mapboxMap.setOnFlingListener(new com.mapbox.mapboxsdk.maps.MapboxMap.OnFlingListener({
                    onFling: function () {
                        listener();
                    }
                }));
                resolve();
            }
            catch (ex) {
                console.log("Error in mapbox.setOnFlingListener: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.setOnCameraMoveListener = function (listener, nativeMap) {
        return new Promise(function (resolve, reject) {
            try {
                var theMap = nativeMap || _mapbox;
                if (!theMap) {
                    reject("No map has been loaded");
                    return;
                }
                theMap.mapboxMap.setOnCameraMoveListener(new com.mapbox.mapboxsdk.maps.MapboxMap.OnCameraMoveListener({
                    onCameraMove: function () {
                        listener();
                    }
                }));
                resolve();
            }
            catch (ex) {
                console.log("Error in mapbox.setOnCameraMoveListener: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.setOnCameraMoveCancelListener = function (listener, nativeMap) {
        return new Promise(function (resolve, reject) {
            try {
                var theMap = nativeMap || _mapbox;
                if (!theMap) {
                    reject("No map has been loaded");
                    return;
                }
                theMap.mapboxMap.setOnCameraMoveCancelListener(new com.mapbox.mapboxsdk.maps.MapboxMap.OnCameraMoveCanceledListener({
                    onCameraMoveCanceled: function () {
                        listener();
                    }
                }));
                resolve();
            }
            catch (ex) {
                console.log("Error in mapbox.setOnCameraMoveCancelListener: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.setOnCameraIdleListener = function (listener, nativeMap) {
        return new Promise(function (resolve, reject) {
            try {
                var theMap = nativeMap || _mapbox;
                if (!theMap) {
                    reject("No map has been loaded");
                    return;
                }
                theMap.mapboxMap.setOnCameraIdleListener(new com.mapbox.mapboxsdk.maps.MapboxMap.OnCameraIdleListener({
                    onCameraIdle: function () {
                        listener();
                    }
                }));
                resolve();
            }
            catch (ex) {
                console.log("Error in mapbox.setOnCameraIdleListener: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.getViewport = function (nativeMap) {
        return new Promise(function (resolve, reject) {
            try {
                var theMap = nativeMap || _mapbox;
                if (!theMap) {
                    reject("No map has been loaded");
                    return;
                }
                var bounds = theMap.mapboxMap.getProjection().getVisibleRegion().latLngBounds;
                resolve({
                    bounds: {
                        north: bounds.getLatNorth(),
                        east: bounds.getLonEast(),
                        south: bounds.getLatSouth(),
                        west: bounds.getLonWest()
                    },
                    zoomLevel: theMap.mapboxMap.getCameraPosition().zoom
                });
            }
            catch (ex) {
                console.log("Error in mapbox.getViewport: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.setViewport = function (options, nativeMap) {
        return new Promise(function (resolve, reject) {
            try {
                var theMap = nativeMap || _mapbox;
                if (!theMap) {
                    reject("No map has been loaded");
                    return;
                }
                var bounds = new com.mapbox.mapboxsdk.geometry.LatLngBounds.Builder()
                    .include(new com.mapbox.mapboxsdk.geometry.LatLng(options.bounds.north, options.bounds.east))
                    .include(new com.mapbox.mapboxsdk.geometry.LatLng(options.bounds.south, options.bounds.west))
                    .build();
                var padding = 25, animated = options.animated === undefined || options.animated, durationMs = animated ? 1000 : 0;
                theMap.mapboxMap.easeCamera(com.mapbox.mapboxsdk.camera.CameraUpdateFactory.newLatLngBounds(bounds, padding), durationMs);
                setTimeout(function () {
                    resolve();
                }, durationMs);
            }
            catch (ex) {
                console.log("Error in mapbox.setViewport: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.downloadOfflineRegion = function (options) {
        return new Promise(function (resolve, reject) {
            try {
                var styleURL = _getMapStyle(options.style);
                var bounds = new com.mapbox.mapboxsdk.geometry.LatLngBounds.Builder()
                    .include(new com.mapbox.mapboxsdk.geometry.LatLng(options.bounds.north, options.bounds.east))
                    .include(new com.mapbox.mapboxsdk.geometry.LatLng(options.bounds.south, options.bounds.west))
                    .build();
                var retinaFactor = utils.layout.getDisplayDensity();
                var offlineRegionDefinition = new com.mapbox.mapboxsdk.offline.OfflineTilePyramidRegionDefinition(styleURL, bounds, options.minZoom, options.maxZoom, retinaFactor);
                var info = '{name:"' + options.name + '"}';
                var infoStr = new java.lang.String(info);
                var encodedMetadata = infoStr.getBytes();
                if (!_accessToken && !options.accessToken) {
                    reject("First show a map, or pass in an 'accessToken' param");
                    return;
                }
                if (!_accessToken) {
                    _accessToken = options.accessToken;
                    com.mapbox.mapboxsdk.Mapbox.getInstance(application.android.context, _accessToken);
                }
                _getOfflineManager().createOfflineRegion(offlineRegionDefinition, encodedMetadata, new com.mapbox.mapboxsdk.offline.OfflineManager.CreateOfflineRegionCallback({
                    onError: function (error) {
                        reject(error);
                    },
                    onCreate: function (offlineRegion) {
                        offlineRegion.setDownloadState(com.mapbox.mapboxsdk.offline.OfflineRegion.STATE_ACTIVE);
                        offlineRegion.setObserver(new com.mapbox.mapboxsdk.offline.OfflineRegion.OfflineRegionObserver({
                            onStatusChanged: function (status) {
                                var percentage = status.getRequiredResourceCount() >= 0 ?
                                    (100.0 * status.getCompletedResourceCount() / status.getRequiredResourceCount()) :
                                    0.0;
                                if (options.onProgress) {
                                    options.onProgress({
                                        name: options.name,
                                        completedSize: status.getCompletedResourceSize(),
                                        completed: status.getCompletedResourceCount(),
                                        expected: status.getRequiredResourceCount(),
                                        percentage: Math.round(percentage * 100) / 100,
                                        complete: status.isComplete()
                                    });
                                }
                                if (status.isComplete()) {
                                    resolve();
                                }
                                else if (status.isRequiredResourceCountPrecise()) {
                                }
                            },
                            onError: function (error) {
                                reject(error.getMessage() + ", reason: " + error.getReason());
                            },
                            mapboxTileCountLimitExceeded: function (limit) {
                                console.log("dl mapboxTileCountLimitExceeded: " + limit);
                            }
                        }));
                    }
                }));
            }
            catch (ex) {
                console.log("Error in mapbox.downloadOfflineRegion: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.listOfflineRegions = function (options) {
        return new Promise(function (resolve, reject) {
            try {
                if (!_accessToken && !options.accessToken) {
                    reject("First show a map, or pass in an 'accessToken' param");
                    return;
                }
                if (!_accessToken) {
                    _accessToken = options.accessToken;
                    com.mapbox.mapboxsdk.Mapbox.getInstance(application.android.context, _accessToken);
                }
                _getOfflineManager().listOfflineRegions(new com.mapbox.mapboxsdk.offline.OfflineManager.ListOfflineRegionsCallback({
                    onError: function (error) {
                        reject(error);
                    },
                    onList: function (offlineRegions) {
                        var regions = [];
                        if (offlineRegions !== null) {
                            for (var i = 0; i < offlineRegions.length; i++) {
                                var offlineRegion = offlineRegions[i];
                                var name_1 = _getRegionName(offlineRegion);
                                var offlineRegionDefinition = offlineRegion.getDefinition();
                                var bounds = offlineRegionDefinition.getBounds();
                                regions.push({
                                    name: name_1,
                                    style: offlineRegionDefinition.getStyleURL(),
                                    minZoom: offlineRegionDefinition.getMinZoom(),
                                    maxZoom: offlineRegionDefinition.getMaxZoom(),
                                    bounds: {
                                        north: bounds.getLatNorth(),
                                        east: bounds.getLonEast(),
                                        south: bounds.getLatSouth(),
                                        west: bounds.getLonWest()
                                    }
                                });
                            }
                        }
                        resolve(regions);
                    }
                }));
            }
            catch (ex) {
                console.log("Error in mapbox.listOfflineRegions: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.deleteOfflineRegion = function (options) {
        return new Promise(function (resolve, reject) {
            try {
                if (!options || !options.name) {
                    reject("Pass in the 'name' param");
                    return;
                }
                _getOfflineManager().listOfflineRegions(new com.mapbox.mapboxsdk.offline.OfflineManager.ListOfflineRegionsCallback({
                    onError: function (error) {
                        reject(error);
                    },
                    onList: function (offlineRegions) {
                        var regions = [];
                        var found = false;
                        if (offlineRegions !== null) {
                            for (var i = 0; i < offlineRegions.length; i++) {
                                var offlineRegion = offlineRegions[i];
                                var name_2 = _getRegionName(offlineRegion);
                                if (name_2 === options.name) {
                                    found = true;
                                    offlineRegion.delete(new com.mapbox.mapboxsdk.offline.OfflineRegion.OfflineRegionDeleteCallback({
                                        onError: function (error) {
                                            reject(error);
                                        },
                                        onDelete: function () {
                                            resolve();
                                        }
                                    }));
                                }
                            }
                        }
                        if (!found) {
                            reject("Region not found");
                        }
                    }
                }));
            }
            catch (ex) {
                console.log("Error in mapbox.listOfflineRegions: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.addExtrusion = function (options, nativeMap) {
        return new Promise(function (resolve, reject) {
            try {
                var theMap = nativeMap || _mapbox;
                var fillExtrusionLayer = new com.mapbox.mapboxsdk.style.layers.FillExtrusionLayer("3d-buildings", "composite");
                fillExtrusionLayer.setSourceLayer("building");
                fillExtrusionLayer.setFilter(com.mapbox.mapboxsdk.style.layers.Filter.eq("extrude", "true"));
                fillExtrusionLayer.setMinZoom(15);
                fillExtrusionLayer.setProperties(com.mapbox.mapboxsdk.style.layers.PropertyFactory.fillExtrusionColor(android.graphics.Color.LTGRAY), com.mapbox.mapboxsdk.style.layers.PropertyFactory.fillExtrusionHeight(com.mapbox.mapboxsdk.style.functions.Function.property("height", new com.mapbox.mapboxsdk.style.functions.stops.IdentityStops())), com.mapbox.mapboxsdk.style.layers.PropertyFactory.fillExtrusionBase(com.mapbox.mapboxsdk.style.functions.Function.property("min_height", new com.mapbox.mapboxsdk.style.functions.stops.IdentityStops())), com.mapbox.mapboxsdk.style.layers.PropertyFactory.fillExtrusionOpacity(new java.lang.Float(0.6)));
                theMap.mapboxMap.addLayer(fillExtrusionLayer);
                resolve();
            }
            catch (ex) {
                console.log("Error in mapbox.addExtrusion: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.prototype.addGeoJsonClustered = function (options, nativeMap) {
        return new Promise(function (resolve, reject) {
            try {
                var theMap = nativeMap || _mapbox;
                theMap.mapboxMap.addSource(new com.mapbox.mapboxsdk.style.sources.GeoJsonSource(options.name, new java.net.URL(options.data), new com.mapbox.mapboxsdk.style.sources.GeoJsonOptions()
                    .withCluster(true)
                    .withClusterMaxZoom(options.clusterMaxZoom || 13)
                    .withClusterRadius(options.clusterRadius || 40)));
                var layers = [];
                if (options.clusters) {
                    for (var i = 0; i < options.clusters.length; i++) {
                        layers.push([options.clusters[i].points, new color_1.Color(options.clusters[i].color).android]);
                    }
                }
                else {
                    layers.push([150, new color_1.Color("red").android]);
                    layers.push([20, new color_1.Color("green").android]);
                    layers.push([0, new color_1.Color("blue").android]);
                }
                var unclustered = new com.mapbox.mapboxsdk.style.layers.SymbolLayer("unclustered-points", "earthquakes");
                unclustered.setProperties([
                    com.mapbox.mapboxsdk.style.layers.PropertyFactory.circleColor(new color_1.Color("red").android),
                    com.mapbox.mapboxsdk.style.layers.PropertyFactory.circleRadius(new java.lang.Float(18.0)),
                    com.mapbox.mapboxsdk.style.layers.PropertyFactory.circleBlur(new java.lang.Float(0.2))
                ]);
                unclustered.setFilter(com.mapbox.mapboxsdk.style.layers.Filter.neq("cluster", new java.lang.Boolean(true)));
                theMap.mapboxMap.addLayer(unclustered);
                for (var i = 0; i < layers.length; i++) {
                    var circles = new com.mapbox.mapboxsdk.style.layers.CircleLayer("cluster-" + i, "earthquakes");
                    circles.setProperties([
                        com.mapbox.mapboxsdk.style.layers.PropertyFactory.circleColor(layers[i][1]),
                        com.mapbox.mapboxsdk.style.layers.PropertyFactory.circleRadius(new java.lang.Float(22.0)),
                        com.mapbox.mapboxsdk.style.layers.PropertyFactory.circleBlur(new java.lang.Float(0.2))
                    ]);
                    circles.setFilter(i === 0
                        ? com.mapbox.mapboxsdk.style.layers.Filter.gte("point_count", new java.lang.Integer(layers[i][0]))
                        : com.mapbox.mapboxsdk.style.layers.Filter.all([
                            com.mapbox.mapboxsdk.style.layers.Filter.gte("point_count", new java.lang.Integer(layers[i][0])),
                            com.mapbox.mapboxsdk.style.layers.Filter.lt("point_count", new java.lang.Integer(layers[i - 1][0]))
                        ]));
                    theMap.mapboxMap.addLayer(circles);
                }
                var count = new com.mapbox.mapboxsdk.style.layers.SymbolLayer("count", "earthquakes");
                count.setProperties([
                    com.mapbox.mapboxsdk.style.layers.PropertyFactory.textField("{point_count}"),
                    com.mapbox.mapboxsdk.style.layers.PropertyFactory.textSize(new java.lang.Float(12.0)),
                    com.mapbox.mapboxsdk.style.layers.PropertyFactory.textColor(new color_1.Color("white").android)
                ]);
                theMap.mapboxMap.addLayer(count);
                resolve();
            }
            catch (ex) {
                console.log("Error in mapbox.addGeoJsonClustered: " + ex);
                reject(ex);
            }
        });
    };
    Mapbox.getAndroidColor = function (color) {
        var androidColor;
        if (color && color_1.Color.isValid(color)) {
            androidColor = new color_1.Color("" + color).android;
        }
        else {
            androidColor = new color_1.Color('#000').android;
        }
        return androidColor;
    };
    return Mapbox;
}(mapbox_common_1.MapboxCommon));
exports.Mapbox = Mapbox;
//# sourceMappingURL=mapbox.js.map