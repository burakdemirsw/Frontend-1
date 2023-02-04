import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from '../../services/alertify.service';
import { TrackService } from '../../services/track.service';
import { HttpClient } from '@angular/common/http';
import { Genre } from 'src/app/models/genre';
import { Key } from 'src/app/models/key';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { AllTrackDto } from 'src/app/models/DTOs/AllTrackDto';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalRequestService } from 'src/app/services/global-request.service';

@Component({
  selector: 'app-uploadtrack',
  templateUrl: './uploadtrack.component.html',
  styleUrls: ['./uploadtrack.component.css'],
})
export class UploadtrackComponent implements OnInit {

  public files: NgxFileDropEntry[];
  fileList: any[] = [];

  public files2: NgxFileDropEntry[];
  fileList2: any[] = [];

  addPath = 'http://localhost:5191/tracks/add';
  url = 'http://localhost:4200/TrackList';
  trackAddForm!: FormGroup;
  trackAddForm2!: FormGroup;
  file: File;
  genres: Genre[] = [];
  keys: Key[] = [];

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private trackService: TrackService,
    private alertifyService: AlertifyService,
    private spinnerService: NgxSpinnerService,
    private globalService: GlobalRequestService
  ) {}

  ngOnInit(): void {
    this.spinnerService.show();

    this.createTrackAddForm();

    this.getGenres().subscribe((data) => {
      this.genres = data;
    });

    this.getKeys().subscribe((data) => {
      this.keys = data;
    });
    this.spinnerService.hide();
  }

  getKeys() {
    return this.globalService.globalGet<Key[]>(
      'http://localhost:5191/keys/getall'
    );
  }

  getGenres() {
    return this.globalService.globalGet<Genre[]>(
      'http://localhost:5191/genres/getall'
    );
  }

  createTrackAddForm() {
    this.trackAddForm = this.formBuilder.group({
      userId: ['', Validators.required],
      genreId: ['', Validators.required],
      keyId: ['', Validators.required],
      price: ['', Validators.required],
      premiumPrice: ['', Validators.required],
      bpm: ['', Validators.required],

      title: ['', Validators.required],
      desc: ['', Validators.required],
    });
  }

  public dropped(files: NgxFileDropEntry[]) {
    //photo
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
    //track
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

  addValueFormData(value: AllTrackDto): FormData {
    value.userId = 1;
    const formdata: FormData = new FormData();

    formdata.append('images', this.fileList[0]);
    formdata.append('audios', this.fileList2[0]);

    formdata.append('genreId', value.genreId.toString());
    formdata.append('keyId', value.keyId.toString());
    formdata.append('userId', JSON.stringify(value.userId));
    formdata.append('price', JSON.stringify(value.price));
    formdata.append('premiumPrice', JSON.stringify(value.premiumPrice));
    formdata.append('bpm', JSON.stringify(value.bpm));

    formdata.append('title', value.title);
    formdata.append('desc', value.desc);

    return formdata;
  }

  addTrack(value: AllTrackDto) {
    this.spinnerService.show();
    if (!this.trackAddForm.valid) {
      this.trackService

        .addTrack(this.addValueFormData(value))
        .subscribe((response) => {
          this.alertifyService.success('TRACK HAS BEEN UPLODED SUCCSESSFULY');
          this.spinnerService.hide();
          location.reload();
        });
    } else {

      this.alertifyService.error('ERROR!');
      console.log(this.trackAddForm);
    }
    this.spinnerService.hide();

  }
}
