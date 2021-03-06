import {Component, Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Config} from "../config";
import {PhotoSearchResponse} from "../models/photoSearchResponse";
import {GetInfoResponse} from "../models/getInfoResponse";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable()
export class FlickrService{

  public constructor(private http:Http){}

  public photoSearch(lat: number, lon: number):Observable<PhotoSearchResponse[]>{
    console.log("ENTERED INTO PHOTOSEARCH FLICKR SERVICE");
    let url = `${Config.Flickr.API_URL}method=flickr.photos.search&api_key=${Config.Flickr.CLIENT_ID}&content_type=1&lat=${lat}&lon=${lon}&extras=url_q,geo&format=json&nojsoncallback=1`;

    return this.http.get(url).map(response => response.json().photos.photo).catch(err => Observable.throw(err));
  }

  public getPhotoInfo(photoId: number): Observable<GetInfoResponse>{

    let url = `${Config.Flickr.API_URL}method=flickr.photos.getInfo&api_key=${Config.Flickr.CLIENT_ID}&photo_id=${photoId}&format=json&nojsoncallback=1`;

    return this.http.get(url).map(response => response.json().photo).catch(err => Observable.throw(err));
  }

}
