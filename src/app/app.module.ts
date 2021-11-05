import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { environment } from '@environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppStoreModule } from './store.module';
import { CustomSerializer } from './reducers/custom-route-serializer';

@NgModule({
    declarations: [AppComponent],
    imports: [
        StoreRouterConnectingModule.forRoot({
            serializer: CustomSerializer,
        }),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        AppStoreModule,
    ],
    providers: [
        { provide: 'API_URL', useValue: environment.api },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
