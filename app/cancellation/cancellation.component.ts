import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
    templateUrl:'app/cancellation/cancel.html',
    directives: [RouterLink]
})
export class CancellationComponent {
    header = "Cancellation page";
}