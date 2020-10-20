import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentIntentDto } from 'src/app/models/payment-intent-dto';


const headers = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private paymentUrl = 'server/api/stripe-payment';

  constructor(private http: HttpClient) { }

  pay(paymentIntentDto: PaymentIntentDto): Observable<string> {
    const url = `${this.paymentUrl}/pay-order/${localStorage.getItem('userId')}`;
    console.log(paymentIntentDto.token);
    return this.http.post<string>(url, paymentIntentDto, headers);
  }

  confirmPayment(id: string): Observable<string> {
    const url = `${this.paymentUrl}/confirm/${id}/${localStorage.getItem('userId')}`;
    return this.http.post<string>(url, {}, headers);
  }

  cancelPayment(id: string): Observable<string> {
    const url = `${this.paymentUrl}/cancel/${id}`;
    return this.http.post<string>(url, {}, headers);
  }
}
