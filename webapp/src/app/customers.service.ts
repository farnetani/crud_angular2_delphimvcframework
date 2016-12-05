import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Customer} from './customer';

@Injectable()
export class CustomersService {
  BASEURL = 'http://localhost:8080';

  constructor(private http: Http) { }

  getCustomers(): Observable<Customer[]> {

    return this.http
      .get(this.BASEURL + '/api/customers')
      .map((response) => <Customer[]>response.json());
  }

  getCustomerById(id: Number): Observable<Customer> {

    return this.http
      .get(this.BASEURL + '/api/customers/' + id)
      .map((response) => <Customer>response.json());
  }

  //start: Implemented by Arlei Ferreira Farnetani Junior | 04/12/2016

  updateCustomer(customer: Customer): Observable<Customer> {

     let id = customer.id;
     delete customer.id;
    
     let body = JSON.stringify(customer);
     let headers = new Headers({ 'Content-Type': 'application/json' });
     let options = new RequestOptions({ headers: headers });

     let url = this.BASEURL + '/api/customers/' + id;

     return this.http.put(url, body, options)
       .map((response) => response.json())
       .catch((error:any) => Observable.throw(error.json().error || 'Server error'));     
  }

  insertCustomer(customer: Customer){

     let body = JSON.stringify(customer);
    
     let headers = new Headers({ 'Content-Type': 'application/json' });
     let options = new RequestOptions({ headers: headers });

     let url = this.BASEURL + '/api/customers';

     return this.http.post(url, body, options)
       .map((response) => response.json())
       .catch((error:any) => Observable.throw(error.json().error || 'Server error'));    
  }

  deleteCustomer(id: number){

     let url = this.BASEURL + '/api/customers/' + id;
    
     return this.http.delete(url)
       .map((response) => response.json())
       .catch((error:any) => Observable.throw(error.json().error || 'Server error'));  
  }

  //end: Implemented by Arlei Ferreira Farnetani Junior

}