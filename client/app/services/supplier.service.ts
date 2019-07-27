import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {Supplier} from '../shared/models/supplier.model';
import {DVC} from 'distinct-value-counter';
import {of} from 'rxjs';

@Injectable()
export class SupplierService {
    private domainsCounter: DVC;
    private counter = require('distinct-value-counter');

    constructor(private http: HttpClient) {
    }

    addSupplier(supplier: Supplier): Observable<Supplier> {
        console.log("here");
        return this.http.post<Supplier>('/api/supplier', supplier);
    }

    getSupplier(id: String): Observable<Supplier> {
        return this.http.get<Supplier>(`/api/supplier/${id}`);
    }

    editSupplier(supplier: Supplier): Observable<string> {
        return this.http.put(`/api/supplier/${supplier._id}`, supplier, {responseType: 'text'});
    }

    deleteSupplier(supplier: Supplier): Observable<string> {
        return this.http.delete(`/api/supplier/${supplier._id}`, {responseType: 'text'});
    }

    getSuppliers(): Observable<Supplier[]> {
        var observable = this.http.get<Supplier[]>('/api/supplier');
        observable.subscribe(
            suppliers => {
                this.domainsCounter = this.counter(0.001);
                suppliers.forEach(element => {
                    // @ts-ignore
                    this.domainsCounter.add(this.getEmailDomain(element.email));
                });
            }
        );
        return observable;
    }

    private getEmailDomain(email: string): string {
        var domain = email.replace(/.*@/, '');
        return domain;
    }

    getSupplierssDomainsCount(): Observable<number> {
        return of(this.domainsCounter.count());
    }
}
