import { Component, OnInit } from '@angular/core';
// import { NgxSpinnerService } from 'ngx-spinner';
import { CartItem} from '../models/cartItem';
import { Track } from '../models/track';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {
cartItems:CartItem[]=[]
  constructor(private cartService:CartService,
    ) { }

  ngOnInit(): void {
    this.getCart();

    // this.spinnerService.show()


    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinnerService.hide();
    // }, 250);
  }

getCart(){
   this.cartItems=this.cartService.list()
}

}
