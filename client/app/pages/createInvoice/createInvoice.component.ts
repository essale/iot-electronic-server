import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastComponent } from '../../shared/toast/toast.component';
import { InvoiceService } from '../../services/invoice.service';
import { AuthService } from '../../services/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
    selector: 'app-create-invoice',
    templateUrl: './createInvoice.component.html',
    styleUrls: ['./createInvoice.component.scss']
})
export class CreateInvoiceComponent implements OnInit {
    title = 'Create Invoice';
    edit = false;

    registerForm: FormGroup;

    _id = new FormControl('');
    invoiceId = new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern('[0-9_-\\s]*')
    ]);

    supplierName = new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern('[א-תa-z:A-Z0-9_-\\s]*')
    ]);

    totalPayment = new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern('[0-9_-\\s]*')
    ]);

    invoiceDate = new FormControl(new Date(), [
        Validators.required,
    ]);

    constructor(
        private formBuilder: FormBuilder,
        public toast: ToastComponent,
        private invoiceService: InvoiceService,
        private authService: AuthService,
        public dialogRef: MatDialogRef<CreateInvoiceComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
        if (data != null) {
            this.edit = true;
            this._id = data._id;
            this.invoiceId.patchValue(data.invoiceId);
            this.supplierName.patchValue(data.supplierName);
            this.totalPayment.patchValue(data.totalPayment);
            this.invoiceDate.patchValue(new Date(data.invoiceDate));
        }
    };

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            _id: this._id,
            invoiceId: this.invoiceId,
            supplierName: this.supplierName,
            totalPayment: this.totalPayment,
            invoiceDate: this.invoiceDate,
            username: this.authService.currentUser.username
        });
    }

    register() {
        if (this.edit) {
            this.invoiceService.editInvoice(this.registerForm.value).subscribe(
                res => {
                    this.toast.open('you successfully editted invoice!', 'success');
                },
                error => this.toast.open('failed to editted invoice', 'danger')
            );
        }
        else {
            this.registerForm.removeControl('_id');
            this.invoiceService.addInvoice(this.registerForm.value).subscribe(
                res => {
                    this.toast.open('you successfully added new invoice!', 'success');
                },
                error => this.toast.open('failed to add new invoice', 'danger')
            );
        }
        this.onClose();
    }

    onClose() {
        this.dialogRef.close();
    }
}
