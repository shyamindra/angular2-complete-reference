import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
    templateUrl:'app/aboutUs/aboutus.html',
    directives: [RouterLink]
})
export class AboutUsComponent {
    header = "About Us page";
}