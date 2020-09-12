import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {
username:any;
sub:any;
  constructor(private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.router
      .queryParams
      .subscribe(params => {
        this.username = params['username'] || 0;
      });
  }

}
