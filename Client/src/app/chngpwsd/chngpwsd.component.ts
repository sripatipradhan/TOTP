import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OtpserviceService } from '../otpservice.service';
import { SharedataService } from '../sharedata.service';

@Component({
  selector: 'app-chngpwsd',
  templateUrl: './chngpwsd.component.html',
  styleUrls: ['./chngpwsd.component.css']
})
export class ChngpwsdComponent implements OnInit {
username:any;
oldpswd:any;
newpswd:any;
cpswd:any;
  constructor(private toastr: ToastrService,private view: OtpserviceService, private share:SharedataService) { }

  ngOnInit(): void {
    this.username = this.share.getusername();
    console.log(this.username);
  }
change(){
  let updateBody = {oldpswd :this.oldpswd, newpswd: this.newpswd}
  this.view.changepswd(this.username,updateBody).subscribe(result =>{
    this.toastr.success(result.message)
  },
  error => this.toastr.error(error.error.messaage, error.status)
  )
    this.oldpswd = "";
    this.newpswd = "";
    this.cpswd = "";
  }
}
