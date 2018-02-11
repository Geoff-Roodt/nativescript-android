import {Component, Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {Config} from "../app.config";
import {PhotoSearchResponse} from "../models/photoSearchResponse";
import {GetInfoResonse} from "../models/getInfoResonse";
import "rxjs/add/operator/map";

@Injectable()
export class FlickrService{

  public constructor(private http:Http){}

  public photoSearch(lat: number, lon: number):Observable<PhotoSearchResponse[]>{

    let url = `${Config.Flickr.API_URL}method=flickr.photos.search&api_key=${Config.Flickr.CLIENT_ID}&content_type=1&lat=${lat}&lon=${lon}&extras=url_q,geo&format=json&nojsoncallback=1`;

    return this.http.get(url).map(response => response.json().photos.photo).catch(err => Observable.throw(err));
  }

  public getPhotoInfo(photoId: number): Observable<GetInfoResonse>{

    let url = `${Config.Flickr.API_URL}method=flickr.photos.getInfo&api_key=${Config.Flickr.CLIENT_ID}&photo_id=${photoId}&format=json&nojsoncallback=1`;

    return this.http.get(url).map(response => response.json().photo).catch(err => Observable.throw(err));
  }

}
