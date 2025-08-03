import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cancellation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cancellation.component.html',
  styleUrls: ['./cancellation.component.css']
})
export class CancellationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
