import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OtpserviceService } from '../otpservice.service';
import { SharedataService } from '../sharedata.service';


@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
email:any;
password:any;
admindetails:any;
message:any;

  constructor(private toastr: ToastrService,private view: OtpserviceService, private route:Router, private share:SharedataService) { }

  ngOnInit(): void {
  }

  login(){
   var  data ={email: this.email, pwsd: this.password}
    this.view.adminlogin(data).subscribe((result) => {
        this.admindetails = JSON.parse(JSON.stringify(result))

         if(this.admindetails.email == this.email && this.admindetails.password == this.password){
          this.share.setusername(this.admindetails.email);
        this.route.navigate(['/admin']);  
      }else{

          this.message = "You have entered a wrong username and Password";
      }
    });

  }

}
