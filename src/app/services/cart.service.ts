import { Injectable } from '@angular/core';
import { CartItem } from '../models/cartItem';
import { CartItems } from '../models/cartItems';
import { Track } from '../models/track';
import { TrackDetail } from '../models/trackDetail';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  addToCart(trackDetail: TrackDetail) {
    let item = CartItems.find((c) => c.trackDetail.id === trackDetail.id);
    if (item) {
      item.quantity += 1;
    } else {
      let cartItem = new CartItem();
      cartItem.trackDetail = trackDetail;
      cartItem.quantity = 1;
      CartItems.push(cartItem);
    }
  }
  list(): CartItem[] {
    return CartItems;
  }
}
