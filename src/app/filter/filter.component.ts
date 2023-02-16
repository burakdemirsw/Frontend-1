import { EventEmitter, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Genre } from '../models/genre';
import { Key } from '../models/key';
import { TrackDetail } from '../models/trackDetail';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  constructor(private alertifyService: AlertifyService) {}
  // @Output() changeTrackFilter = new EventEmitter<string>();
  // change(searchTrack:string) {
  //   this.searchTrack=searchTrack
  //   this.changeTrackFilter.emit(this.searchTrack);
  //   this.alertifyService.success(searchTrack)
  // }
  @Output() inputValueChange = new EventEmitter<string>();
  onInputValueChange(value: string) {
    this.searchTrack = value;
    this.inputValueChange.emit(value);
  }

  @Output() inputValueChange2 = new EventEmitter<string>();
  @Output() inputValueChange3 = new EventEmitter<boolean>();
  onInputValueChange2(key: string) {
    this.filteredKey = key;
    this.inputValueChange2.emit(key);
  }
  changeReverse(reverse: boolean) {
    this.reverse = !reverse;
    this.inputValueChange3.emit(reverse);
  }

  @Input() filterText: string;
  @Input() searchTrack: string;
  @Input() onTrackFilter: Function;
  @Input() download: string;
  @Input() filteredKey: string;
  @Input() filteredGenre: string;
  @Input() key: string;
  @Input() key2: string;
  @Input() count: number;

  @Input() keys: Key[];
  @Input() reverse: boolean;
  @Input() reverse2: boolean;

  @Input() reverse3: boolean;
  @Input() genres: Genre[];

  @Input() filterByGenre: Function;

  @Input() sortByDownload: Function;

  @Input() sortByPrice: Function;

  @Input() sortByDate: Function;

  @Input() filterByKey: Function;

  ngOnInit(): void {}
}
