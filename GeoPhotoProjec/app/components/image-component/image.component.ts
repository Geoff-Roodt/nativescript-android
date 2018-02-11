import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
  templateUrl: "components/image-component/image.component.html"
})

export class ImageComponent implements OnInit{

  public constructor(private activatedRoute: ActivatedRoute){}

  public ngOnInit(){}
  
}
