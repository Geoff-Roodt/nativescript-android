"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var grocery_list_service_1 = require("../../shared/grocery/grocery-list.service");
var ListComponent = /** @class */ (function () {
    function ListComponent(groceryListService) {
        this.groceryListService = groceryListService;
        this.isLoading = true;
        this.listLoaded = false;
        this.grocery = "";
        this.groceryList = [];
    }
    ListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        this.groceryListService.load().subscribe(function (response) {
            response.forEach(function (grocery) {
                _this.groceryList.unshift(grocery);
            });
            _this.isLoading = false;
            _this.listLoaded = true;
        });
    };
    ListComponent.prototype.add = function () {
        var _this = this;
        if (this.grocery.trim() === "") {
            alert("Enter a grocery item");
            return;
        }
        var textField = this.groceryTextField.nativeElement;
        textField.dismissSoftInput();
        this.groceryListService.add(this.grocery).subscribe(function (grocery) {
            _this.groceryList.unshift(grocery);
            _this.grocery = "";
        }, function () {
            alert({
                message: "An error occured while adding an item to your list.",
                okButtonText: "OK"
            });
            _this.grocery = "";
        });
    };
    __decorate([
        core_1.ViewChild("groceryTextField"),
        __metadata("design:type", core_1.ElementRef)
    ], ListComponent.prototype, "groceryTextField", void 0);
    ListComponent = __decorate([
        core_1.Component({
            selector: "list",
            moduleId: module.id,
            templateUrl: "./list.html",
            styleUrls: ["./list-common.css", "./list.css"],
            providers: [grocery_list_service_1.GroceryListService]
        }),
        __metadata("design:paramtypes", [grocery_list_service_1.GroceryListService])
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RTtBQUt6RSxrRkFBK0U7QUFVL0U7SUFPRSx1QkFBb0Isa0JBQXNDO1FBQXRDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFOMUQsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFDYixnQkFBVyxHQUFtQixFQUFFLENBQUM7SUFHMkIsQ0FBQztJQUU3RCxnQ0FBUSxHQUFSO1FBQUEsaUJBU0M7UUFSQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFFLFVBQUEsUUFBUTtZQUM5QyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBTztnQkFDdkIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLENBQUM7WUFDSCxLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QixLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCwyQkFBRyxHQUFIO1FBQUEsaUJBb0JDO1FBbkJDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUEsQ0FBQztZQUM5QixLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUM5QixNQUFNLENBQUM7UUFDVCxDQUFDO1FBRUQsSUFBSSxTQUFTLEdBQWMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQztRQUMvRCxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUU3QixJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxPQUFPO1lBQ3pELEtBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2xDLEtBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLENBQUMsRUFBRTtZQUNILEtBQUssQ0FBQztnQkFDSixPQUFPLEVBQUUscURBQXFEO2dCQUM5RCxZQUFZLEVBQUUsSUFBSTthQUNuQixDQUFDLENBQUM7WUFDSCxLQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUVMLENBQUM7SUFuQzhCO1FBQTlCLGdCQUFTLENBQUMsa0JBQWtCLENBQUM7a0NBQW1CLGlCQUFVOzJEQUFDO0lBTGpELGFBQWE7UUFSekIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsYUFBYTtZQUMxQixTQUFTLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxZQUFZLENBQUM7WUFDOUMsU0FBUyxFQUFFLENBQUMseUNBQWtCLENBQUM7U0FDaEMsQ0FBQzt5Q0FTd0MseUNBQWtCO09BUC9DLGFBQWEsQ0EwQ3pCO0lBQUQsb0JBQUM7Q0FBQSxBQTFDRCxJQTBDQztBQTFDWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5cclxuaW1wb3J0IHtUZXh0RmllbGR9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XHJcblxyXG5pbXBvcnQgeyBHcm9jZXJ5IH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9ncm9jZXJ5L2dyb2NlcnlcIjtcclxuaW1wb3J0IHsgR3JvY2VyeUxpc3RTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9ncm9jZXJ5L2dyb2NlcnktbGlzdC5zZXJ2aWNlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogXCJsaXN0XCIsXHJcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICB0ZW1wbGF0ZVVybDogXCIuL2xpc3QuaHRtbFwiLFxyXG4gIHN0eWxlVXJsczogW1wiLi9saXN0LWNvbW1vbi5jc3NcIiwgXCIuL2xpc3QuY3NzXCJdLFxyXG4gIHByb3ZpZGVyczogW0dyb2NlcnlMaXN0U2VydmljZV1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBpc0xvYWRpbmcgPSB0cnVlO1xyXG4gIGxpc3RMb2FkZWQgPSBmYWxzZTtcclxuICBncm9jZXJ5ID0gXCJcIjtcclxuICBncm9jZXJ5TGlzdDogQXJyYXk8R3JvY2VyeT4gPSBbXTtcclxuICBAVmlld0NoaWxkKFwiZ3JvY2VyeVRleHRGaWVsZFwiKSBncm9jZXJ5VGV4dEZpZWxkOiBFbGVtZW50UmVmO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdyb2NlcnlMaXN0U2VydmljZTogR3JvY2VyeUxpc3RTZXJ2aWNlKXt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xyXG4gICAgdGhpcy5ncm9jZXJ5TGlzdFNlcnZpY2UubG9hZCgpLnN1YnNjcmliZSggcmVzcG9uc2UgPT4ge1xyXG4gICAgICAgIHJlc3BvbnNlLmZvckVhY2goKGdyb2NlcnkpID0+IHtcclxuICAgICAgICAgIHRoaXMuZ3JvY2VyeUxpc3QudW5zaGlmdChncm9jZXJ5KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubGlzdExvYWRlZCA9IHRydWU7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFkZCgpe1xyXG4gICAgaWYgKHRoaXMuZ3JvY2VyeS50cmltKCkgPT09IFwiXCIpe1xyXG4gICAgICBhbGVydChcIkVudGVyIGEgZ3JvY2VyeSBpdGVtXCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHRleHRGaWVsZCA9IDxUZXh0RmllbGQ+dGhpcy5ncm9jZXJ5VGV4dEZpZWxkLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICB0ZXh0RmllbGQuZGlzbWlzc1NvZnRJbnB1dCgpO1xyXG5cclxuICAgIHRoaXMuZ3JvY2VyeUxpc3RTZXJ2aWNlLmFkZCh0aGlzLmdyb2NlcnkpLnN1YnNjcmliZShncm9jZXJ5ID0+IHtcclxuICAgICAgdGhpcy5ncm9jZXJ5TGlzdC51bnNoaWZ0KGdyb2NlcnkpO1xyXG4gICAgICB0aGlzLmdyb2NlcnkgPSBcIlwiO1xyXG4gICAgICB9LCAoKSA9PiB7XHJcbiAgICAgIGFsZXJ0KHtcclxuICAgICAgICBtZXNzYWdlOiBcIkFuIGVycm9yIG9jY3VyZWQgd2hpbGUgYWRkaW5nIGFuIGl0ZW0gdG8geW91ciBsaXN0LlwiLFxyXG4gICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLmdyb2NlcnkgPSBcIlwiO1xyXG4gICAgfSk7XHJcblxyXG4gIH1cclxuXHJcbn1cclxuIl19