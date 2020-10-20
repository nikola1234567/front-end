import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() id: string;
  @Input() userId: string;
  @Input() description: string;
  @Input() totalCost: number;

  constructor(private paymentService: PaymentService) { }

  ngOnInit() {
  }

  confirm(): void {
    this.paymentService.confirmPayment(this.id).subscribe(
      data => {
        // this.toastrService.success
        // ('Payment Confirmed', 'Details for this payment in the PAST TRANSACTIONS tab' ,
        // {positionClass: 'toast-top-center', timeOut: 3000});
        // this.activeModal.close();
      },
      err => {
        // console.log(err);
        // this.activeModal.close();
      }
    );
  }

  cancel(): void {
    this.paymentService.cancelPayment(this.id).subscribe(
      data => {
        // this.toastrService.success
        // ('Payment Canceled', 'This transaction has been stopped', {positionClass: 'toast-top-center', timeOut: 3000});
        // this.activeModal.close();
      },
      err => {
        // console.log(err);
        // this.activeModal.close();
      }
    );
  }


}
