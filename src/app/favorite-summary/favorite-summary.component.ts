import { Component, OnInit } from '@angular/core';
import { FavItem } from '../models/favItem';
import { Track } from '../models/track';
import { FavService } from '../services/fav.service';

@Component({
  selector: 'app-favorite-summary',
  templateUrl: './favorite-summary.component.html',
  styleUrls: ['./favorite-summary.component.css']
})
export class FavoriteSummaryComponent implements OnInit {
favItems:FavItem[]=[]
  constructor(private favService:FavService) { }

  ngOnInit(): void {
    this.getFavList();
  }
  getFavList(){
    this.favItems= this.favService.list()
  }
}
