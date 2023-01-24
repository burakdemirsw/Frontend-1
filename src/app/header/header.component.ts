import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Genre } from '../models/genre';
import { AuthService } from '../services/auth.service';
import { UserService, _myToken } from '../services/user.service';
import { GlobalRequestService } from '../services/global-request.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  genres: Genre[] = [];
  filterText = '';
  constructor(
    private userService: UserService,
    public authService: AuthService,
    private globalService: GlobalRequestService,

  ) {
    authService.identityCheck();
  }

  ngOnInit(): void {
    this.userService.setMyToken();
    this.getGenres().subscribe((data) => {
      this.genres = data;
      // console.log(data);
    });
  }
  getGenres() {
    return this.globalService.globalGet<Genre[]>('http://localhost:5191/genres/getall')
  }

  logOut() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    this.authService.identityCheck();
    location.href = 'http://localhost:4200/Homepage';
  }
}
