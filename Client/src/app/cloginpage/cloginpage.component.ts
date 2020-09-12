import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyserviceService } from '../companyservice.service';

@Component({
  selector: 'app-cloginpage',
  templateUrl: './cloginpage.component.html',
  styleUrls: ['./cloginpage.component.css']
})
export class CloginpageComponent implements OnInit {
email:any;
password:any;
admindetails:any;
message:any;
  constructor(private toastr: ToastrService,private view: CompanyserviceService, private route:Router) { }

  ngOnInit(): void {
  }

 login(){
   var  data ={email: this.email, pwsd: this.password}
    this.view.cadminlogin(data).subscribe((result) => {
        this.admindetails = JSON.parse(JSON.stringify(result))

         if(this.admindetails.email == this.email && this.admindetails.password == this.password){
          this.view.setusername(this.admindetails.email, this.admindetails.projectcode);
        this.route.navigate(['/cadmin']);  
      }else{

          this.message = "You have entered a wrong username and Password";
      }
    });

  }

}
