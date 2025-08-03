import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payu-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payu-payment.component.html',
  styleUrls: ['./payu-payment.component.css']
})
export class PayuPaymentComponent implements OnInit {

  amount: number = 0;
  roostid: number = 0;
  orderId: number = 0;
  promoCode: string = '';
  checksum: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  initiatePayment(){
    console.log("Initiating payment for amount: " + this.amount);
    // Placeholder for actual service calls
  }

  callPayuForPayment() {
    console.log("Calling PayU for payment...");
    // Placeholder for actual service calls
  }

}
