import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Boxcommerce';
  amount = 150;
  randTousdRate = 16.23;
  convertedValue: any = 0;
  constructor() {}

  ngOnInit(): void {
    this.convertedValue = this.calculateExchangeRate(this.randTousdRate, 1);
  }

  calculateExchangeRate(fromRate: number, toRate: number): string {
    return ((this.amount * toRate) / fromRate).toFixed(5);
  }
}
