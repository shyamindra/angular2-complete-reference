import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
    templateUrl:'app/faq/faq.html',
    directives: [RouterLink]
})
export class FaqComponent {
    header = "FAQ page";
}