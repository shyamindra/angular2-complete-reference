import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  header = "Payment page";
  balance: number = 0;

  constructor() { }

  ngOnInit(): void {
    // This will be replaced with actual service call later
    this.getBalance();
  }

  getBalance(){
    // Placeholder for actual service call
    console.log("Getting balance...");
  }

}
