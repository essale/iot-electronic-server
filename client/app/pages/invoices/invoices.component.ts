import {Component, OnInit, ViewChild} from '@angular/core';
import {ToastComponent} from '../../shared/toast/toast.component';
import {Invoice} from '../../shared/models/invoice.model';
import {ConfirmationDialogComponent} from '../../shared/confirm/confirmation-dialog';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormControl} from '@angular/forms';
import {InvoiceService} from '../../services/invoice.service';

@Component({
    selector: 'app-invoices',
    templateUrl: './invoices.component.html',
    styleUrls: ['./invoices.component.scss']
})

export class InvoicesComponent implements OnInit {

    title = 'My Invoices';
    invoices: Invoice[] = [];
    isLoading = true;
    displayedColumns = ['username', 'invoiceId', 'supplierName', 'totalPayment', 'invoiceDate', 'action'];
    dataSource: any;
    filterValues = {
        username: '',
        invoiceId: '',
        supplierName: '',
        totalPayment: '',
        invoiceDate: ''
    };

    usernameFilter = new FormControl('');
    invoiceIdFilter = new FormControl('');
    supplierNameFilter = new FormControl('');
    totalPaymentFilter = new FormControl('');
    invoiceDateFilter = new FormControl('');

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        public toast: ToastComponent,
        private invoiceService: InvoiceService,
        public dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.getInvoices();

        this.usernameFilter.valueChanges
            .subscribe(
                value => {
                    this.filterValues.username = value;
                    this.dataSource.filter = JSON.stringify(this.filterValues);
                }
            );
        this.invoiceIdFilter.valueChanges
            .subscribe(
                value => {
                    this.filterValues.invoiceId = value;
                    this.dataSource.filter = JSON.stringify(this.filterValues);
                }
            );
        this.supplierNameFilter.valueChanges
            .subscribe(
                value => {
                    this.filterValues.supplierName = value;
                    this.dataSource.filter = JSON.stringify(this.filterValues);
                }
            );
        this.totalPaymentFilter.valueChanges
            .subscribe(
                value => {
                    this.filterValues.totalPayment = value;
                    this.dataSource.filter = JSON.stringify(this.filterValues);
                }
            );
        this.invoiceDateFilter.valueChanges
            .subscribe(
                value => {
                    this.filterValues.invoiceDate = value;
                    this.dataSource.filter = JSON.stringify(this.filterValues);
                }
            );
    }

    createFilter(): (data: any, filter: string) => boolean {
        const filterFunction = function (data, filter): boolean {
            const searchTerms = JSON.parse(filter);
            let flag = true;
            Object.keys(searchTerms).forEach(function (key) {
                if (searchTerms[key] !== '') {
                    if (!data[key] || data[key].toString().indexOf(searchTerms[key]) === -1) {
                        flag = false;
                    }
                }
            });
            return flag;
        };

        return filterFunction;
    }

    getInvoices() {
        this.invoiceService.getInvoices().subscribe(
            data => {
                this.invoices = data;
                this.dataSource = new MatTableDataSource<Invoice>(this.invoices);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.dataSource.filterPredicate = this.createFilter();
            },
            error => console.log(error),
            () => this.isLoading = false
        );
    }

    deleteInvoice(invoice: Invoice) {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {disableClose: false});
        dialogRef.componentInstance.title = 'Delete User';
        dialogRef.componentInstance.message = 'Are you sure you want to delete ' + invoice.invoiceId + '?';
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.invoiceService.deleteInvoice(invoice).subscribe(
                    data => this.toast.open('invoice deleted successfully.', 'success'),
                    error => this.toast.open('error deleting the invoice', 'danger'),
                    () => this.getInvoices()
                );
            }
        });
    }
}

