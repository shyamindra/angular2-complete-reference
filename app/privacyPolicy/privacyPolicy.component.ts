import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
    templateUrl:'app/privacyPolicy/privacy.html',
    directives: [RouterLink]
})
export class PrivacyComponent {
    header = "Privacy page";
}