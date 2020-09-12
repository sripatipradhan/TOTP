import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuditserviceService } from '../auditservice.service';


@Component({
  selector: 'app-addcompany',
  templateUrl: './addcompany.component.html',
  styleUrls: ['./addcompany.component.css']
})
export class AddcompanyComponent implements OnInit {
cname:any;
ownername:any;
email:any;
mobile:any;
password:any;
cpassword:any;
Amobile:any;
caddress:any;
projectcode:any;
service:any;
pclistdata:any;
message:any;
  constructor(private toastr: ToastrService,private view: AuditserviceService) { }

  ngOnInit(): void {
    this.view.getpclist().subscribe((result) => {
        this.pclistdata = JSON.parse(JSON.stringify(result))
    });
  }

onadd(){
  if(this.password == this.cpassword){
  let data = {companyname: this.cname, Ownername: this.ownername, email: this.email, password: this.password,
   mobile:this.mobile, alternatemobile: this.Amobile, companyaddress: this.caddress, projectcode: +this.projectcode, service: this.service};
  this.view.addcompany(data).subscribe((result) => {
    this.toastr.success(result.message);
    },error => this.toastr.error(error.error.messaage, error.status)
    );
      this.message = "";
      this.cname = "";
      this.ownername ="";
      this.email = "";
      this.mobile = "";
      this.password = "";
      this.cpassword = "";
      this.Amobile = "";
      this.caddress = "";
      this.projectcode = "";
      this.service = "";
      this.pclistdata = "";

  }
  else{
    this.message = "password and conform password doesnot matched"
  }
}

}
