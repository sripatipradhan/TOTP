import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OtpverificationComponent } from './otpverification/otpverification.component';
import { SecretecodevalidComponent } from './secretecodevalid/secretecodevalid.component';
import { OtpListComponent } from './otp-list/otp-list.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { ChngpwsdComponent } from './chngpwsd/chngpwsd.component';
import { LogoutpageComponent } from './logoutpage/logoutpage.component';
import { ProjectRegistrationPageComponent } from './project-registration-page/project-registration-page.component';
import { ProjectMasterListComponent } from './project-master-list/project-master-list.component';
import { AuditlistpageComponent } from './auditlistpage/auditlistpage.component';
import { AddcompanyComponent } from './addcompany/addcompany.component';
import { CompanyadminpageComponent } from './companyadminpage/companyadminpage.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { CompanyauditlistComponent } from './companyauditlist/companyauditlist.component';
import { CloginpageComponent } from './cloginpage/cloginpage.component';
import { CompanyerrorlistComponent } from './companyerrorlist/companyerrorlist.component';



const routes: Routes = [
   { path:"", component:LoginpageComponent },
   { path:"auditlist", component:AuditlistpageComponent },
   { path:"clogin", component:CloginpageComponent },
   { path:"cadmin", component:CompanyadminpageComponent, children:[
      { path:"caudit", component:CompanyauditlistComponent },
      { path:"emplist", component:EmployeelistComponent },
      { path:"errorlist", component:CompanyerrorlistComponent },
   ] },
   { path:"admin", component:AdminpageComponent, children:[
     { path:"addcompany", component:AddcompanyComponent },
      { path:"otpverification", component:OtpverificationComponent },
      { path:"Secretecodevalid", component:SecretecodevalidComponent },
      { path:"otplist", component:OtpListComponent },
      { path:"chngpwsd", component:ChngpwsdComponent },
      { path:"logout", component:LogoutpageComponent },
      { path:"projectregister", component:ProjectRegistrationPageComponent },
      { path:"projectmasterlist", component:ProjectMasterListComponent },
      ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const rootcamp = [
                    LoginpageComponent,
                    AdminpageComponent,
                    OtpverificationComponent,
                    SecretecodevalidComponent,
                    OtpListComponent,
                    ChngpwsdComponent,
                    LogoutpageComponent,
                    ProjectRegistrationPageComponent,
                    ProjectMasterListComponent,
                    AuditlistpageComponent,
                    AddcompanyComponent,


                    CompanyadminpageComponent,
                    EmployeelistComponent,
                    CompanyauditlistComponent,
                    CloginpageComponent,
                    CompanyerrorlistComponent
                   ]
