import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertifyService } from '../../services/alertify.service';
import { TrackService } from '../../services/track.service';
import { HttpClient } from '@angular/common/http';
import { Genre } from 'src/app/models/genre';
import { Key } from 'src/app/models/key';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { ActivatedRoute } from '@angular/router';
import { Track } from 'src/app/models/track';
import { NgxSpinnerService } from 'ngx-spinner';
import { TrackUpdateDto } from 'src/app/models/DTOs/TrackUpdateDto';
import { SingleTrackDto } from 'src/app/models/DTOs/singleTrackDto';
import { GlobalRequestService } from 'src/app/services/global-request.service';
import { ApiUrls } from 'src/app/models/Consts/ApıUrls';
import { ClientUrls } from 'src/app/models/Consts/ClientUrls';

@Component({
  selector: 'app-update-track',
  templateUrl: './update-track.component.html',
  styleUrls: ['./update-track.component.css'],
})
export class UpdateTrackComponent implements OnInit {
  track: Track = new Track();
  single: SingleTrackDto = new SingleTrackDto();
  trackUpdateForm!: FormGroup;
  genres: Genre[] = [];
  keys: Key[] = [];
  public files: NgxFileDropEntry[];
  fileList: any[] = [];
  public files2: NgxFileDropEntry[];
  fileList2: any[] = [];
  currentTrackId: number = 0;

  constructor(
    private httpClient: HttpClient,
    private alertifyService: AlertifyService,
    private trackService: TrackService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private spinnerService: NgxSpinnerService, // private spinnerService: NgxSpinnerService,
    private globalService: GlobalRequestService
  ) {}

  ngOnInit(): void {
    this.spinnerService.show();
    this.getGenres().subscribe((data) => {
      this.genres = data;
    });
    this.getKeys().subscribe((data) => {
      this.keys = data;
    });

    this.spinnerService.hide();
    setTimeout(() => {
      this.activatedRoute.params.subscribe((params) => {
        this.getTrackById(params['trackId']);
      });
      this.createTrackUpdateForm();
    }, 0);
  }

  getTrackById(trackId: number) {
    this.trackService.getTrackFromApi(trackId).subscribe((data) => {
      this.single = data;
      this.track = data;
      console.log(this.single);
      this.currentTrackId = this.track.id;
      this.createTrackUpdateForm();
    });
  }
  getKeys() {
    return this.globalService.globalGet<Key[]>(
      ApiUrls.Domain + ApiUrls.GetAllKeys
    );
  }
  getGenres() {
    return this.globalService.globalGet<Genre[]>(
      ApiUrls.Domain + ApiUrls.GetAllGenres
    );
  }
  createTrackUpdateForm() {
    this.trackUpdateForm = this.formBuilder.group({
      id: [Number],
      title: [this.single.title],
      userId: [this.single.userId],
      genreId: [this.single.genreId],
      keyId: [this.single.keyId],
      price: [this.single.price],
      premiumPrice: [this.single.premiumPrice],
      bpm: [this.single.bpm],
      desc: [this.single.desc],
    });
  }
  public dropped(files: NgxFileDropEntry[]) {
    this.files = [];
    this.files = files;

    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.fileList.push(file);
        });
      }
    }
  }

  public dropped2(files: NgxFileDropEntry[]) {
    this.files2 = [];
    this.files2 = files;

    for (const droppedFile2 of files) {
      if (droppedFile2.fileEntry.isFile) {
        const fileEntry = droppedFile2.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.fileList2.push(file);
        });
      }
    }
  }
  addValueFormData(value: TrackUpdateDto): FormData {
    const formdata: FormData = new FormData();

    formdata.append('images', this.fileList[0]);
    formdata.append('audios', this.fileList2[0]);

    formdata.append('id', JSON.stringify(this.currentTrackId));
    formdata.append('genreId', value.genreId.toString());
    formdata.append('keyId', value.keyId.toString());
    formdata.append('userId', JSON.stringify(1));
    formdata.append('price', JSON.stringify(value.price));
    formdata.append('premiumPrice', JSON.stringify(value.premiumPrice));
    formdata.append('bpm', JSON.stringify(value.bpm));

    formdata.append('title', value.title);
    formdata.append('desc', value.desc);

    return formdata;
  }

  updateTrack(value: TrackUpdateDto) {
    let trackModel = Object.assign({}, this.trackUpdateForm.value);
    console.log(trackModel);
    if (this.trackUpdateForm.valid || !this.trackUpdateForm.valid) {
      this.spinnerService.show();

      this.trackService
        .updateTrack(this.addValueFormData(value))
        .subscribe((response) => {
          this.alertifyService.success('TRACK HAS BEEN UPLOADED SUCCSESSFULY');
          this.spinnerService.hide();
          location.href = ClientUrls.Domain+ClientUrls.Home;
        });
    } else {
      this.spinnerService.hide();

      this.alertifyService.error('ERROR!');
      location.href = ClientUrls.Domain+ClientUrls.Home;
    }
  }
}
