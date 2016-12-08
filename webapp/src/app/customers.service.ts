import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {Customer} from './customer';

@Injectable()
export class CustomersService {

  totalRows: number = 0;
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

/*  getCustomersLimit(limit:number, page:number): Observable<Customer[]> {

    if (page==1) {
      page = 0;
    }

    if (page>0) {
        page = (page * limit) - limit;
    }
    
   let res: Customer[];

   return this.http
      .get(this.BASEURL + '/api/customers/'+limit+'/'+page)
      .map(this.extractData)
      .catch(this.handleError);    

  }
*/
  getCustomersLimit(limit:number, page:number): Promise<Customer[]> {

      var self = this;
      var skip = 0;

      if (page < 1) {
          skip = 0;
      } else {
          skip = (page * limit) ;
      }

      if (skip<0) {
          skip = 0;
      }

      console.log('Limit: ', limit);
      console.log('Página: ', page);
      console.log('Skip: ', skip);

      return new Promise((resolve, reject) => {
        //console.log('primeiro captura o count');
        setTimeout(resolve, 0);        
      }).then(() => {
                      //console.log('segundo captura os dados com limit e skip');
                      //console.log('total', self.totalRows);                      
                      return this.http
                                  .get(this.BASEURL + '/api/customers/'+limit+'/'+skip)
                                  .toPromise()
                                  //.then(this.extractData)
                                  
                                  .then(function(res: Response) {

                                    let body = res.json();

                                    if (body[0]===undefined) {
                                        console.log('rows', 'Vazio');
                                        self.totalRows = 0;
                                    } else {
                                        console.log('rows', body[0].totalrows);
                                        self.totalRows = body[0].totalrows;

                                    }
                                    return body || {};

                                  });

                      }); 
  }

/*  private extractData(res: Response) {
    let body = res.json();    

    return body || {};
  }*/

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } else {
        errMsg = error.message ? error.message : error.toString();
      }
      console.error(errMsg);
      return Observable.throw(errMsg);
  }

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