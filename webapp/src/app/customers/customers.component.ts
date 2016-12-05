import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../customers.service';
import { Customer } from '../customer';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: Customer[];

  constructor(router:Router, private customersService: CustomersService) { }

  //start: Implemented by Arlei Ferreira Farnetani Junior | 04/12/2016

  delete(item){
    var self = this;
    if(confirm("Delete?")){
      this.customersService.deleteCustomer(item.id).subscribe(function(res) {
        console.log('register deleted...');
        console.log(res);
       
        //reload list
        self.loadList();        
      });
    }
  }

  loadList() {
    this.customersService
      .getCustomers()
      .subscribe((customers: Customer[]) => {
        this.customers = customers;
    });
  }
  //end: Implemented by Arlei Ferreira Farnetani Junior | 04/12/2016

  ngOnInit() {
     this.loadList();  //converted to function to be used in method delete
  }
}