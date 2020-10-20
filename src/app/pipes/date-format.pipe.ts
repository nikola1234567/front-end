import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  result: string;

  transform(value: string): string {
    // tslint:disable-next-line:ban-types
     const den = value.split('T')[0].split('-')[2];
     const mesec = value.split('T')[0].split('-')[1];
     const godina = value.split('T')[0].split('-')[0];

     this.result = '';

     if (mesec === '01') {
      this.result += 'January';
     }

     if (mesec === '02') {
      this.result += 'February';
    }

     if (mesec === '03') {
      this.result += 'March';
    }

     if (mesec === '04') {
      this.result += 'April';
    }

     if (mesec === '05') {
      this.result += 'May';
    }

     if (mesec === '06') {
      this.result += 'June';
    }

     if (mesec === '07') {
      this.result += 'July';
    }

     if (mesec === '08') {
      this.result += 'August';
    }

     if (mesec === '09') {
      this.result += 'September';
    }

     if (mesec === '10') {
      this.result += 'October';
    }

     if (mesec === '11') {
      this.result += 'November';
    }

     if (mesec === '12') {
      this.result += 'December';
    }

     this.result += ' ' + (den.charAt(0) === '0' ? den.charAt(1) : den) + ',' + godina;

     return this.result;

  }

}
