import { DefaultCurrecnies } from '../../shared/top-currencies';
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
  constructor(readonly api: ApiService) {
    this.api.getRates().subscribe((res: Rates) => {
      this.updated = res.date;
      this.baseRate = res.rates.USD;
      this.generateRatesArray(res.rates);
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.currencyConverterForm.valueChanges.subscribe(data => {
       if (this.currencyConverterForm.valid) {
         this.convert();
       }
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

  generateRatesArray(data): void {
     this.rates = [];
     for (const key in data) {
       if (Object.prototype.hasOwnProperty.call(data, key)) {
        this.rates.push({currencyCode: key, rate: data[key]});
       }
     }
  }

  convert(): void {
     this.amount = Number(this.currencyConverterForm.controls.amount.value);
     this.result = this.calculateExchangeRate(this.selectedValueFrom.rate, this.selectedValueTo.rate);
  }

  swapCurrency(): void {
     const fromValues = this.selectedValueFrom;
     const toValues = this.selectedValueTo;
     this.currencyConverterForm.controls.rateFrom.setValue(toValues);
     this.currencyConverterForm.controls.rateTo.setValue(fromValues);
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
