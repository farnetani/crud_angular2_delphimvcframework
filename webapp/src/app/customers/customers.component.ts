import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../customers.service';
import { Customer } from '../customer';
import { Router, RouterLink } from '@angular/router';
//import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  private limit:number;
  private page:number;
  private pageLimit: number;

  customers: Customer[];
  totalRows : number;

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
    this.customersService.getCustomersLimit(this.limit, this.page).then((customers: Customer[]) => {      
      this.customers = customers;
      if (this.customersService.totalRows !== undefined)
          this.totalRows = this.customersService.totalRows;
      else 
          this.totalRows = 0;

      let resto = this.totalRows % this.limit;

      if (resto>0) {
          this.pageLimit = (this.totalRows/this.limit|0)+1;  
      } else {
          this.pageLimit = (this.totalRows/this.limit|0)        
      }
    });     

/*    this.customersService
      .getCustomersLimit(this.limit, this.page)
      .subscribe((customers: Customer[]) => {
        console.log('customers', customers);
        this.customers = customers;
        this.totalRows = this.customersService.totalRows;
        console.log('total', this.customersService.totalRows);
        console.log(this.customers);
    });*/

  }


pageBefore(){   
      
      if (this.page >= 1) {
            this.page = this.page - 1;
            this.loadList(); 
      } else {
        console.log('Start!');
      }
      
      
      /*  
      this.customersService.getCustomersLimit(this.limit, this.page)
         .subscribe((customers: Customer[]) => {
          this.customers = customers;
      });
      */    
  }

  pageAfter(){          
      let limit = 0;
      console.log('page', this.page);
      console.log('limit', this.limit);
      console.log('Total', this.totalRows);

      let resto = this.totalRows % this.limit;

      if (resto>0) {
          this.pageLimit = (this.totalRows/this.limit|0)+1;  
      } else {
          this.pageLimit = (this.totalRows/this.limit|0)        
      }



      if (this.pageLimit>0) {
          limit = this.pageLimit - 1;
      } else {
          limit = this.pageLimit;
      }

      console.log('page-limit', (this.pageLimit));
      

      if ((this.page < ((limit))) && (this.totalRows>0)) {
         this.page = this.page + 1;

       this.loadList();  

      } else {
         console.log('End!');
      }
        

      /*  
      this.customersService.getCustomersLimit(this.limit, this.page)
         .subscribe((customers: Customer[]) => {
          this.customers = customers;
      });
      */

  }


  //end: Implemented by Arlei Ferreira Farnetani Junior | 04/12/2016

  ngOnInit() {
    this.page =  0;
    this.limit = 4;

    this.loadList();  //converted to function to be used in method delete
  }
}