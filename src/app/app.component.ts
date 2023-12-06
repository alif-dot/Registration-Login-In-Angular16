import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements DoCheck {
  title = 'Login / Registration';
  isMenuVisible = false;
  iaAdminUser = false;

  constructor(private router: Router, private service: AuthService) {
    let role=sessionStorage.getItem('role');
    if(role=='admin'){
      this.iaAdminUser=true;
    }
  }

  ngDoCheck(): void {
    let currentroute = this.router.url;
    let role=sessionStorage.getItem('role');
    if (currentroute == '/login' || currentroute == '/register') {
      this.isMenuVisible = false
    } else {
      this.isMenuVisible = true
    }

    if (role == 'admin') {
      this.iaAdminUser = true;
    }else{
      this.iaAdminUser = false;
    }
  }
}
