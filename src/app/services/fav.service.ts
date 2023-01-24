import { Injectable } from '@angular/core';
import { CartItem } from '../models/cartItem';
import { FavItem } from '../models/favItem';
import { FavItems } from '../models/favItems';
import { Track } from '../models/track';
import { TrackDetail } from '../models/trackDetail';

@Injectable({
  providedIn: 'root'
})
export class FavService {

  constructor() { }

  addToFavList(trackDetail:TrackDetail){
    let item = FavItems.find(f=>f.trackDetail.id===trackDetail.id)
    let favItem = new FavItem
    favItem.trackDetail=trackDetail
    FavItems.push(favItem)
  }

  list():FavItem[]{
    return FavItems
  }
}
