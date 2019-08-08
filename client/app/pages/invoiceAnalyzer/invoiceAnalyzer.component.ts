import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Tesseract } from 'tesseract.ts';

import { UserService } from '../../services/user.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import { InvoiceService } from '../../services/invoice.service';
import { SupplierService } from '../../services/supplier.service';
import { AuthService } from '../../services/auth.service';
import { scheduleMicroTask } from '@angular/core/src/util';


@Component({
    selector: 'app-invoice-analyzer',
    templateUrl: './invoiceAnalyzer.component.html',
    styleUrls: ['./invoiceAnalyzer.component.scss']
})

export class InvoiceAnalyzerComponent implements OnInit {
    title = 'Invoice Analyzer';
    invoiceForm: FormGroup;
    imagePath;
    suppliers;
    img: any;
    message: string;
    isLoading = false;

    lang: 'heb';

    invoiceId = new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
    ]);

    supplierName = new FormControl('', [
        Validators.required,
        Validators.minLength(2)
    ]);

    totalPayment = new FormControl('', [
        Validators.required,
        Validators.minLength(2)
    ]);

    invoiceDate = new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
    ]);

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        public toast: ToastComponent,
        private userService: UserService,
        private invoiceService: InvoiceService,
        private supplierService: SupplierService,
        private authService: AuthService
    ) {
    }

    ngOnInit() {
        this.invoiceForm = this.formBuilder.group({
            invoiceId: this.invoiceId,
            supplierName: this.supplierName,
            totalPayment: this.totalPayment,
            invoiceDate: this.invoiceDate,
            username: this.authService.currentUser.username
        });

        this.getSuppliers();
    }

    submit() {
        this.invoiceService.addInvoice(this.invoiceForm.value).subscribe(
            res => {
                this.toast.open('you successfully created new invoice!', 'success');
            },
            error => this.toast.open('There was a problem creating new invoice', 'danger')
        );
    }

    upload(files) {
        if (files.length === 0) {
            return;
        }

        const mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            this.message = 'Only images are supported.';
            console.log(this.message);
            return;
        }

        const reader = new FileReader();
        this.imagePath = files;
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.img = reader.result;
        };

        const encodedImage = this.handleFileSelect(files[0], this.authService.currentUser.username);
    }

    handleFileSelect(file, username) {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        const config = {
            lang: 'heb'
        };

        Tesseract
            .recognize(file, config)
            .progress(() => {
                this.isLoading = true;
            })
            .then((res: any) => {
                this.isLoading = false;

                if (config.lang === ('heb')) {
                    this.parseHeb(res);
                } else if (config.lang === ('eng')) {
                    this.parseEng(res);
                } else {
                    return;
                }
            })
            .catch(console.error);

        reader.onload = () => {
            console.log(reader.result);
            const parameter = { image: reader.result, imageName: file.name, username: username, lang: 'heb' };
            console.log(parameter);
            this.invoiceService.uploadImage(parameter);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };

        return reader.result;
    }

    getSuppliers() {
        this.supplierService.getSuppliers().subscribe(
            data => {
                console.log("data" + data)
                this.suppliers = data;
            },
            error => console.log(error)
        );
    }

    parseHeb(tes) {
        console.log(tes.text);
        console.log(this.suppliers);
        // console.log(this.suppliers[supllier].supplierName);
        // tslint:disable-next-line: forin
        let supp_temp;
        let text_len = tes.text.length;
        let flag = 0;

        for (const supllier in this.suppliers){
           const scheme = this.suppliers[supllier].invoiceScheme;
            if ( tes.text.includes(scheme.id) && tes.text.includes(scheme.date)
         && tes.text.includes(scheme.payment)) {
             console.log("found him")
             console.log(supp_temp)
           // supp_temp = this.suppliers[supllier];
           // flag =1;
            break;
        }}
        
        let new_array = tes.text.split(' ')
        let id_ar =new_array[2];
        let ar_payment = new_array[5];
        let ar_supname = new_array[7] + " " +  new_array[8];
       
        console.log(new_array);
 

        id_ar = id_ar.slice(0, id_ar.length - 6);
        ar_payment = ar_payment.slice(0, ar_payment.length - 2);
        
             this.invoiceForm.controls['invoiceId'].setValue(id_ar);
             this.invoiceForm.controls['totalPayment'].setValue(ar_payment);
             this.invoiceForm.controls['supplierName'].setValue(ar_supname);

           // this.invoiceForm.controls['invoiceId'].setValue(supp_temp.invoiceScheme.id);
           // this.invoiceForm.controls['totalPayment'].setValue(supp_temp.invoiceScheme.payment);

        // Date regex (i.g. 31.12.2019)
        for (let i = 0; i < tes.words.length; i++) {
            const word = tes.words[i].text;

            const isMatch = word.match(/^([0-2][0-9]|(3)[0-1])(\/|.|-)(((0)[0-9])|((1)[0-2]))(\/|.|-)(\d{4}$|\d{2}$)/i);
            if (isMatch) {
                /*console.log(tes.words[i-3].text)
                console.log(tes.words[i-2].text)
                console.log(tes.words[i-1].text)*/
                this.invoiceForm.controls['invoiceDate'].setValue(tes.words[i].text);
                break;
            }
        }

    }

    parseEng(words) {

    }
}


