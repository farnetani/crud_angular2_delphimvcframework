import { Component, OnInit } from '@angular/core';
import {Router, RouterLink, ActivatedRoute} from '@angular/router';
import {CustomersService} from '../customers.service';
import {Customer} from '../customer';
//import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-customerEdit',
  templateUrl: './customer.componentEdit.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponentEdit implements OnInit {
  customer: Customer  = { id: null, first_name: '', last_name: '', age: null };

  constructor(
    protected router: Router,
    private customersService: CustomersService,
    private activatedRoute: ActivatedRoute) { }

  //start: Farnetani 
 
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

  //end: Farnetani

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params['id'];
    this.customersService
      .getCustomerById(id)
      .subscribe((customer: Customer) => {
        this.customer = customer;
      });
  }
}