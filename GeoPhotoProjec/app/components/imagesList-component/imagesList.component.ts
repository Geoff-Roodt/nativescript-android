import {Component, NgZone, ViewChild} from "@angular/core";
import {Router} from "@angular/router";
import {Config} from "../../config";
import {Page} from "ui/page";
import {View} from "ui/core/view";

import {FlickrService} from "../../services/flickr.service";
import {GeolocationService} from "../../services/geolocation.service";

import {PhotoSearchResponse} from "../../models/photoSearchResponse";


@Component({
  selector: "ImagesListComponent",
  providers: [FlickrService, GeolocationService],
  templateUrl: "components/imagesList-component/imagesList.component.html"
})

export class ImagesListComponent {

  private mapbox: any;
  public mapboxKey: string;
  public photos: PhotoSearchResponse[];

  public constructor(private flickrService:FlickrService, private geolocationService: GeolocationService, private zone:NgZone, private router: Router){
    this.mapboxKey = Config.MapBox.ACCESS_TOKEN;
    console.log("SETUP MAPBOX KEY");
  }

  public onMapReady(args){
    console.log("ENTERED INTO MAPREADY");
    this.mapbox = args.map;
    console.log("MAPBOX SETUP");
    this.geolocationService.getLocation().then(() => {
      this.loadPhotos().subscribe(photos => {
        this.photos = photos.map((photo) => {
          photo.distance = this.geolocationService.getDistanceFrom(parseFloat(photo.latitude), parseFloat(photo.longitude));
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
      },
      error => console.log(error));
    });
  }

  public dropMarkers(){
    let markers = this.photos.map((photo: PhotoSearchResponse, index: number) => {
      return {
        lat: photo.latitude,
        lng: photo.longitude,
        onTop: () => {this.zone.run(() => {this.showPhoto({index: index});});}
      }
    });

    this.mapbox.addMarkers(markers);
  }

  public centerMap(args: any){
    let photo = this.photos[args.index];
    this.mapbox.setCenter({
      lat: parseFloat(photo.latitude),
      lng: parseFloat(photo.longitude),
      animated: false
    });
  }

  public showPhoto(args: any){
    let photo = this.photos[args.index];
    this.router.navigate(["/image-component", photo.id]);
  }

  public loadPhotos(){
    console.log("ENTERED LOADING PHOTOS");
    return this.flickrService.photoSearch(this.geolocationService.latitude, this.geolocationService.longitude);
  }

  public syncPhotos(args: any){
    this.geolocationService.getLocation().then(() => {
      this.loadPhotos().subscribe(photos => {
        this.photos = photos.map((photo) => {
          photo.distance = this.geolocationService.getDistanceFrom(parseFloat(photo.latitude), parseFloat(photo.longitude));
          return photo;
        });
      },
      error => console.log(error));
    });
  }

}
