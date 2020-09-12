import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedataService } from '../sharedata.service';
import { CompanyserviceService } from '../companyservice.service';


@Component({
  selector: 'app-logoutpage',
  templateUrl: './logoutpage.component.html',
  styleUrls: ['./logoutpage.component.css']
})
export class LogoutpageComponent implements OnInit {

  constructor(private toastr: ToastrService, private route:Router, private share:SharedataService, private com: CompanyserviceService) { }

  ngOnInit(): void {
    this.share.logout();
    this.com.logout();
    this.toastr.success("Logout successfull");
    this.route.navigate(['']);  
  }


}
