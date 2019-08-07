import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {Invoice} from '../shared/models/invoice.model';

@Injectable()
export class StatisticsService {

    constructor(private http: HttpClient) {
    }

    getInvocesByUsername(name: String): Observable<Invoice> {
        const url = `/api/statistics/${name}`;
        return this.http.get<Invoice>(url);
    }
}

