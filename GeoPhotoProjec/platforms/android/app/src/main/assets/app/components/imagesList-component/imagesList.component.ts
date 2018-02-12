import {Component, NgZone} from "@angular/core";
import {Router} from "@angular/router";
import {Config} from "../../config";

import {FlickrService} from "../../services/flickr.service";
import {GeolocationService} from "../../services/geolocation.service";

import {PhotoSearchResponse} from "../../models/photoSearchResponse";


@Component({
  selector: "ImagesListComponent",
  templateUrl: "components/imagesList-component/imagesList.component.html"
})

export class ImagesListComponent {

  private mapbox: any;
  public mapboxKey: string;
  public photos: PhotoSearchResponse[];

  public constructor(private flickrService:FlickrService, private geolocationService: GeolocationService, private zone:NgZone, private router: Router){ }

  public onMapReady(args){
    this.mapbox = args.map;
    this.geolocationService.getLocation().then(() => {
      this.loadPhotos().subscribe(photos => {
        this.photos = photos.map((photo) => {
          photo.distance = this.geolocationService.getDistanceFrom(parseFloat(photo.latitude), parseFloat(photo.longitude));
          return photo;
        });
        this.dropMarkers();
        this.mapbox.setCenter({
          lat: this.geolocationService.latitude,
          lng: this.geolocationService.longitude,
          animated: true
        });
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
    return this.flickrService.photoSearch(this.geolocationService.latitude, this.geolocationService.longitude);
  }

}
