import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
    templateUrl:'app/profile/profile.html',
    directives: [RouterLink]
})
export class ProfileComponent {
    header = "Profile page";
}