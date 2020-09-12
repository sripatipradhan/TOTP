import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { AppRoutingModule, rootcamp } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { OtpserviceService } from './otpservice.service';
import {HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SharedataService } from './sharedata.service';
import { LogoutpageComponent } from './logoutpage/logoutpage.component';
import { CompanysliderComponent } from './companyslider/companyslider.component';










@NgModule({
  declarations: [
    AppComponent,
    rootcamp,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LogoutpageComponent,
    CompanysliderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [OtpserviceService,SharedataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
