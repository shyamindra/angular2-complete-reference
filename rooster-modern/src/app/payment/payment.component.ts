import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';

import {PaymentService} from '../services/payment.service';
import {CacheService} from 'ng2-cache/ng2-cache';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [PaymentService]
})
export class PaymentComponent implements OnInit {

 header = "Payment page";
    balance: number;

    constructor(private paymentService: PaymentService){
    }

    ngOnInit(){
        this.getBalance();
    }

    getBalance(){
        this.paymentService.getWallet()
            .subscribe(response => {
                    // console.log(response);
                    this.balance = (!response.amount) ? 0 : response.amount;
            });

    }

}