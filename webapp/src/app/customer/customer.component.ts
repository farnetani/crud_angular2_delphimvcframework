import { Component, OnInit } from '@angular/core';
//Router and RouterLink by Arlei Ferreira Farnetani Junior
import {Router, RouterLink, ActivatedRoute} from '@angular/router';
import {CustomersService} from '../customers.service';
import {Customer} from '../customer';
//import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customer: Customer  = { id: null, first_name: '', last_name: '', age: null };

  constructor(
    protected router: Router,  //by Arlei Ferreira Farnetani Junior
    private customersService: CustomersService,
    private activatedRoute: ActivatedRoute) { }

  //start: Implemented by Arlei Ferreira Farnetani Junior
 
  save(){

    var self = this;
    
    if(this.customer.id){

      this.customersService.updateCustomer(this.customer).subscribe(function(res){
        console.log('Update executed...');
        self.router.navigate(['/customers']);
      });

    }else{

      this.customersService.insertCustomer(this.customer).subscribe(function(res)
      {
         console.log('Insert executed...');
         self.router.navigate(['/customers']);
      });  
    }    
  }

  //end: Implemented by Arlei Ferreira Farnetani Junior

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params['id'];
    this.customersService
      .getCustomerById(id)
      .subscribe((customer: Customer) => {
        this.customer = customer;
        console.log(customer);
      });
  }
}