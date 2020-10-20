import { Component, Input, OnInit, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { PaymentIntentDto } from 'src/app/models/payment-intent-dto';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment-ui',
  templateUrl: './payment-ui.component.html',
  styleUrls: ['./payment-ui.component.css']
})
export class PaymentUiComponent implements OnInit {

  @Input() price;
  @Input() description;
  @Input() userId;

  @Output() popup: EventEmitter<string> = new EventEmitter<string>();

  id: string;

  error: any;

  modalRef: BsModalRef;

  @ViewChild(StripeCardComponent, null) card: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        lineHeight: '40px',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  stripeTest: FormGroup;

  constructor(private fb: FormBuilder,
              private stripeService: StripeService,
              private modalService: BsModalService,
              private router: Router,
              private paymentService: PaymentService,
              private notificationService: NotificationsService) { }

  ngOnInit() {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  createTokenAndOpenModal(template: TemplateRef<any>): void {
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          const paymentIntentDto: PaymentIntentDto = {
            token: result.token.id,
            userId: this.userId,
            amount: this.price,
            currency: 'EUR',
            description: this.description
          };
          this.paymentService.pay(paymentIntentDto).subscribe(
            data => {
              this.id = data[`id`];
              this.modalRef = this.modalService.show(template);
            }
          );
          this.error = undefined;
        } else if (result.error) {
          this.error = result.error.message;
        }
      });
  }

  cancelTransaction(template: TemplateRef<any>): void {
    this.paymentService.cancelPayment(this.id).subscribe({
      next: () => {
        this.popup.emit('cancel');
      }
    });
  }

  confirmTransaction(template: TemplateRef<any>): void {
    this.paymentService.confirmPayment(this.id).subscribe({
      next: () => {
        this.popup.emit('success');
      }
    });
  }



}
