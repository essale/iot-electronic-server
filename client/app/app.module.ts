import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
/** Modules */
import {MaterialModule} from './material/material.module';
import {RoutingModule} from './routing.module';
import {SharedModule} from './shared/shared.module';
/** Components */
import {AppComponent} from './app.component';
import {
    AccountComponent,
    ConnectedComponent,
    CreateSupplierComponent,
    HomeComponent,
    InvoiceAnalyzerComponent,
    InvoicesComponent,
    LoginComponent,
    LogoutComponent,
    NotFoundComponent,
    SignupComponent,
    StatisticsComponent,
    SuppliersComponent,
    UsersComponent
} from './pages';
/** Services */
import {UserService} from './services/user.service';
import {SupplierService} from './services/supplier.service';
import {AuthService} from './services/auth.service';
import {CommentService} from './services/comment.service';
import {TokenInterceptor} from './services/token.interceptor';
import {AuthGuardLogin} from './services/auth-guard-login.service';
import {AuthGuardAdmin} from './services/auth-guard-admin.service';
import {MatSortModule} from '@angular/material';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {WebsocketService} from './services/websocket.service';
import {ChatService} from './services/chat.service';
import {BarRatingModule} from 'ngx-bar-rating';
import {AgmCoreModule, GoogleMapsAPIWrapper} from '@agm/core';

import {HllDomainsPipe} from './pipes/hll-domains.pipe';
import {RolesCountPipe} from './pipes/roles-count.pipe';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {GalleryModule} from '@ks89/angular-modal-gallery';
import 'hammerjs';
import 'mousetrap';
import { InvoiceService } from './services/invoice.service';
import {StatisticsService} from './services/statistics.service';

const PAGES = [
    HomeComponent,
    SignupComponent,
    LoginComponent,
    LogoutComponent,
    AccountComponent,
    UsersComponent,
    SuppliersComponent,
    CreateSupplierComponent,
    ConnectedComponent,
    NotFoundComponent,
    StatisticsComponent,
    InvoiceAnalyzerComponent,
    InvoicesComponent
];

@NgModule({
    declarations: [
        AppComponent,
        HllDomainsPipe,
        RolesCountPipe,
        ...PAGES
    ],
    imports: [
        RoutingModule,
        SharedModule,
        BrowserAnimationsModule,
        MaterialModule,
        MatSortModule,
        BarRatingModule,
        NgxChartsModule,
        GalleryModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBN5zxIZnc9RP65LduN3fSzOpirBMoBS2c'
        })
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        AuthService,
        AuthGuardLogin,
        AuthGuardAdmin,
        UserService,
        SupplierService,
        InvoiceService,
        StatisticsService,
        CommentService,
        WebsocketService,
        ChatService,
        HllDomainsPipe,
        RolesCountPipe,
        GoogleMapsAPIWrapper],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent],
    entryComponents: [CreateSupplierComponent]
})

export class AppModule {
}
