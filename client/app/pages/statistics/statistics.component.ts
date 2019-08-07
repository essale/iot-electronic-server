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

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'bla';
    showYAxisLabel = true;
    yAxisLabel = 'bal2';
    timeline = true;

    colorScheme = {
        domain: []
    };

    public singlePie = [];
    public singleBar = [];

    constructor(
        private statService: StatisticsService,
        private authService: AuthService
    ) {}

    ngOnInit() {
    }

    upload() {
        console.log(this.authService.currentUser.username);
        let invocesByUsername = this.statService.getInvocesByUsername(this.authService.currentUser.username).subscribe(data => console.log(data));
    }
}
