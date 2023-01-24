import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup  ,Validators } from '@angular/forms';
import { AlertifyService } from '../services/alertify.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-new-register',
  templateUrl: './new-register.component.html',
  styleUrls: ['./new-register.component.css']
})

export class NewRegisterComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertifyService: AlertifyService,
    // private spinnerService: NgxSpinnerService
  ) { }
  addPath = 'http://localhost:5191/users/add';
  url = 'http://localhost:4200/Upload';
  homepageUrl = 'http://localhost:4200/Homepage';
  loginPageUrl = 'http://localhost:4200/Login';

  addNewUserModel!: FormGroup;
  userAddForm2!: FormGroup;


  ngOnInit(): void {
    this.createUserAddForm();


  }
  createUserAddForm() {
    this.addNewUserModel = this.formBuilder.group({
      // id: ['', Validators.required],
      name: ['', Validators.required],
      surName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  addNewUser() {

    if (this.addNewUserModel.valid) {
      let addNewUserModel = Object.assign({}, this.addNewUserModel.value);
      this.userService.addNewUser(addNewUserModel).subscribe((response) => {
        window.location.href = this.homepageUrl;
        this.alertifyService.success('TRACK HAS BEEN UPLOADED SUCCSESSFULY');
      });
    } else {
      this.alertifyService.error('ERROR!');
    }

  }
}
