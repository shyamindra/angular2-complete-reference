import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
    templateUrl:'app/info/info.html',
    directives: [RouterLink]
})
export class InfoComponent {
    header = "Info page";
}