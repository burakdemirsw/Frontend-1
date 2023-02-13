import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalRequestService } from '../services/global-request.service';
declare var $: any;
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  constructor(
    private spinnerService: NgxSpinnerService,
    private globalRequestService: GlobalRequestService
  ) {}

  ngOnInit(): void {
    this.spinnerService.show();
    this.globalRequestService
    // .globalGet<any>('https://localhost:7178/api/Product/GetProducts')
    // .subscribe(data=>{
    //   console.log(data)
    // })

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinnerService.hide();
    }, 250);
  }
}

