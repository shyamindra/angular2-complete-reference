import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
    templateUrl:'app/payment/payment.html',
    directives: [RouterLink]
})
export class PaymentComponent {
    header = "Payment page";
}