import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OtpserviceService } from '../otpservice.service';


@Component({
  selector: 'app-secretecodevalid',
  templateUrl: './secretecodevalid.component.html',
  styleUrls: ['./secretecodevalid.component.css']
})
export class SecretecodevalidComponent implements OnInit {

  constructor(private toastr: ToastrService, private add:OtpserviceService, private route: ActivatedRoute) { }
mobile:any;
userToken:any;
  ngOnInit(): void {  
    this.mobile = this.route.snapshot.paramMap.get('mobile');
  }

   valid(){
    let data ={mobile: this.mobile, userToken:this.userToken}
    this.add.totpvalidate(data).subscribe( result => {
          this.toastr.success(result.valid)
        }, error => this.toastr.error(error.error.messaage, error.status)
        );
  }

}
