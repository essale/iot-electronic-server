import {Component, OnInit} from '@angular/core';
import 'rxjs/add/observable/of';
import {AuthService} from '../../services/auth.service';
import {StatisticsService} from '../../services/statistics.service';


@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss']
})

export class StatisticsComponent implements OnInit {
    isLoading = false;
    view: any[] = [1200, 250];

    title: any;
    showLabels: any;
    explodeSlices: any;
    doughnut: any;

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = '';
    showYAxisLabel = true;
    yAxisLabel = 'Total Payment';
    timeline = true;

    colorScheme = {
        domain: []
    };

    public singlePie = [];
    public singleBar = [];

    constructor(
        private statService: StatisticsService,
        private authService: AuthService,
        public auth: AuthService
    ) {}

    ngOnInit() {
        this.getTotalInvoices();
        this.getInvoicesPayment();
    }

    dynamicColors() {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
    }

    getTotalInvoices() {
        let invoicesByUsername = this.statService.getInvocesByUsername(this.authService.currentUser.username)
            .subscribe(data => {
                var arr = []
                for(var index in data) {
                    arr.push(
                        {
                            "name": data[index]._id,
                            "value": data[index].totalInvoices
                        }
                    )
                    this.colorScheme.domain.push(this.dynamicColors())
                }
                this.singlePie = arr;
            },
                error => {
                    () => this.isLoading = false;
                }
            );
    }

    getInvoicesPayment() {
        let invoicesByUsername = this.statService.getInvocesByUsername(this.authService.currentUser.username)
            .subscribe(data => {
                    var arr = []
                    for(var index in data) {
                        arr.push(
                            {
                                "name": data[index]._id,
                                "value": data[index].totalPayment
                            }
                        )
                        this.colorScheme.domain.push(this.dynamicColors())
                    }
                    this.singleBar = arr;
                },
                error => {
                    () => this.isLoading = false;
                }
            );
    }

}
