import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AgmMap} from '@agm/core';
import {ToastComponent} from '../../shared/toast/toast.component';
import {ChatService} from '../../services/chat.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {User} from '../../shared/models/user.model';
import {SigUser} from '../../shared/models/siguser.model';
import {Observable} from 'rxjs';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    @ViewChild(AgmMap)
    map: AgmMap;
    displayedColumns = ['icon', 'username', 'amount of flows', 'amount of cigares'];
    dataSource: any;
    users: SigUser[];
    alive: boolean;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        public auth: AuthService,
        public toast: ToastComponent,
        private chatService: ChatService,
    ) {
    }

    ngOnInit() {
        this.alive = true;

        Observable.timer(0, 5000)
            .takeWhile(() => this.alive) // only fires when component is alive
            .subscribe(() => {
                this.getConnectedList();
            });
    }

    getConnectedList() {
        console.log(this.chatService.users);
        console.log(this.chatService.users);

        if (this.chatService.users) {
            this.users = this.chatService.users;
        }

        if (this.users) {
            this.dataSource = new MatTableDataSource<User>(this.users);
        }

        if (this.dataSource) {
            this.dataSource.paginator = this.paginator;
        }

        console.log(this.users);
    }
}
