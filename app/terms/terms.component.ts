import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
    templateUrl:'app/terms/terms.html',
    directives: [RouterLink]
})
export class TermsComponent {
    header = "Terms page";
}