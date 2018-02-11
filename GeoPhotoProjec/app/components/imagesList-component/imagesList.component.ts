import {Component, NgZone} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: "ImagesListComponent",
  templateUrl: "components/imagesList-component/imagesList.component.html"
})

export class ImagesListComponent {
  public constructor(private zone:NgZone, private router: Router){ }
}
