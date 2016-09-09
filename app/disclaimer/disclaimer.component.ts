import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
    templateUrl:'app/disclaimer/disclaimer.html',
    directives: [RouterLink]
})
export class DisclaimerComponent {
    header = "Disclaimer page";
}