import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
// import { NgxSpinnerService } from 'ngx-spinner';
import { Track } from 'src/app/models/track';
import { UserService } from 'src/app/services/user.service';
import { AlertifyService } from '../../services/alertify.service';
import { TrackService } from '../../services/track.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  addPath = 'http://localhost:5191/users/add';
  url = 'http://localhost:4200/Upload';
  homepageUrl = 'http://localhost:4200/Homepage';
  loginPageUrl = 'http://localhost:4200/Login';

  userAddForm!: FormGroup;
  userAddForm2!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertifyService: AlertifyService,
    // private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.createUserAddForm();
    this.createUserAddForm2();

  }

  createUserAddForm() {
    this.userAddForm = this.formBuilder.group({
      userName: ['', Validators.required],
      lastName: ['', Validators.required],
      passwordSalt: ['', Validators.required],
    });
  }

  createUserAddForm2() {
    this.userAddForm2 = this.formBuilder.group({
      email: ['', Validators.required],
      country: ['', Validators.required],
      phone: ['', Validators.required],
      postalCode: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      userAddress: ['', Validators.required],
    });
  }

  addUser() {

    // if (this.userAddForm.valid && this.userAddForm2.valid) {
    //   let userModel = Object.assign({}, this.userAddForm.value);
    //   let userModel2 = Object.assign({}, this.userAddForm2.value);
    //   this.userService.addUser(userModel, userModel2).subscribe((response) => {
    //     window.location.href = this.loginPageUrl;
    //     console.log(userModel+userModel2)
    //     // this.alertifyService.success('TRACK HAS BEEN UPLOADED SUCCSESSFULY');
    //   });
    // } else {
    //   this.alertifyService.error('ERROR!');
    // }




  }
}
