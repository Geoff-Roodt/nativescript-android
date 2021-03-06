import { Component, ElementRef, OnInit, ViewChild, NgZone } from "@angular/core";

import {TextField} from "ui/text-field";

import { Grocery } from "../../shared/grocery/grocery";
import { GroceryListService } from "../../shared/grocery/grocery-list.service";

import * as SocialShare from "nativescript-social-share";

@Component({
  selector: "list",
  moduleId: module.id,
  templateUrl: "./list.html",
  styleUrls: ["./list-common.css", "./list.css"],
  providers: [GroceryListService]
})

export class ListComponent implements OnInit {
  isLoading = true;
  listLoaded = false;
  grocery = "";
  groceryList: Array<Grocery> = [];
  @ViewChild("groceryTextField") groceryTextField: ElementRef;

  constructor(private groceryListService: GroceryListService, private zone: NgZone){ }

  ngOnInit() {
    this.isLoading = true;
    this.groceryListService.load().subscribe( response => {
        response.forEach((grocery) => {
          this.groceryList.unshift(grocery);
        });
        this.isLoading = false;
        this.listLoaded = true;
    });
  }

  add(){
    if (this.grocery.trim() === ""){
      alert("Enter a grocery item");
      return;
    }

    let textField = <TextField>this.groceryTextField.nativeElement;
    textField.dismissSoftInput();

    this.groceryListService.add(this.grocery).subscribe(grocery => {
      this.groceryList.unshift(grocery);
      this.grocery = "";
      }, () => {
      alert({
        message: "An error occured while adding an item to your list.",
        okButtonText: "OK"
      });
      this.grocery = "";
    });
  }

  share(){
    let listString = this.groceryList.map(grocery => grocery.name).join(", ").trim();
    SocialShare.shareText(listString);
  }

  delete(grocery: Grocery){
    this.groceryListService.delete(grocery.id).subscribe(() => {
      // Running the array splice in a zone ensures that change detection gets triggered.
      this.zone.run(() => {
        let index = this.groceryList.indexOf(grocery);
        this.groceryList.splice(index, 1);
      });
    });
  }

}
