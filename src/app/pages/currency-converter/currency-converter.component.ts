import { DefaultCurrecnies } from './top-currencies';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Currency, Rates } from './../../shared/interfaces';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {
  currencyConverterForm: FormGroup;
  rates: Currency[];
  baseRate: number;
  updated = '';
  selectedValueFrom: Currency;
  selectedValueTo: Currency;
  amount = 0;
  result: any = 0;
  constructor(readonly api: ApiService) { }

  ngOnInit(): void {
    this.api.getRates().subscribe((res: Rates) => {
      this.updated = res.date;
      this.baseRate = res.rates.USD;
      this.generateRatesArray(res.rates);
      this.initForm();
    });
  }

  initForm(): void {
    this.currencyConverterForm = new FormGroup({
      amount: new FormControl('', Validators.required),
      rateFrom: new FormControl('', Validators.required),
      rateTo: new FormControl('', Validators.required),
    });
  }

  getImage(currency): string {
    const value = currency ? currency.toLowerCase() : '';
    const countryCode = value.replace(value.substring(2), '');
    return countryCode === 'hp' ? 'ph' : countryCode ;
  }

  generateRatesArray(data): any {
     this.rates = [];
     for (const key in data) {
       if (Object.prototype.hasOwnProperty.call(data, key)) {
        this.rates.push({currencyCode: key, rate: data[key]});
       }
     }
  }

  convert(): any {
     this.amount = Number(this.currencyConverterForm.controls.amount.value);
     this.result = this.calculateExchangeRate(this.selectedValueFrom.rate, this.selectedValueTo.rate);
  }

  getTopCurrencies(data): any {
    return data.filter((res: Currency) => {
       return res.currencyCode.includes(DefaultCurrecnies[res.currencyCode]);
    });
  }

  calculateExchangeRate(fromRate: number, toRate: number): string {
    return ((this.amount * toRate) / fromRate).toFixed(5);
  }


}
