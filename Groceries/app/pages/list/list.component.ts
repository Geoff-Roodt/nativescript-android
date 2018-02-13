import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

import {TextField} from "ui/text-field";

import { Grocery } from "../../shared/grocery/grocery";
import { GroceryListService } from "../../shared/grocery/grocery-list.service";

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

  constructor(private groceryListService: GroceryListService){}

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

}
