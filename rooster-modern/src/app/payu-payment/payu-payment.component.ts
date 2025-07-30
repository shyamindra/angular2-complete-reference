import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { RoostService } from '../services/roost.service';
import {CacheService} from 'ng2-cache/ng2-cache';
import {User} from '../shared/user';

@Component({
  selector: 'app-payu-payment',
  templateUrl: './payu-payment.component.html',
  styleUrls: ['./payu-payment.component.css']
})
export class PayuPaymentComponent implements OnInit {

  amount = 0;
  roostid: number;
  orderId: number;
  user: User;
  checksum: string;

  constructor(private paymentService : PaymentService,
              private cacheService : CacheService,
              private roostService : RoostService) {
                this.user = this.cacheService.get('user');
   }

  ngOnInit() {
  }

  initiatePayment(){
    // console.log(this.amount);
    this.roostid = this.cacheService.get('roostId');
    // console.log(this.roostid);
    this.paymentService.getOrderId(this.amount, this.roostid)
          .subscribe(response => {
              console.log(response.orderid);
              this.orderId = response.orderid;
              this.paymentService.payuCheckSum(this.orderId, this.amount, 'Rooster', this.user.name, this.user.email)
                  .subscribe(response => {
                    console.log(response);
                    this.checksum = response.checksum;
                    this.callPayuForPayment();
                  });
          },
          (err) => {
              console.log(err);
          });
  }

  callPayuForPayment() {
    this.paymentService.payUPayment('IgBGSB', this.orderId.toString(), this.amount, 
      'Rooster', 'Sunil', 'sunilgandham547@gmail.com', '8886717711', this.checksum)
        .subscribe(response => {
          console.log(response);
        },
        (err) => {
            console.log(err);
        });
  }

}
