import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomersService } from './customers.service';
import { Myproj40RoutingModule } from './app-routing.module';

import { Customer } from './customer';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CustomersComponent,
    CustomerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,  
    Myproj40RoutingModule
  ],
  providers: [CustomersService, Customer],
  bootstrap: [AppComponent]
})
export class AppModule { }
