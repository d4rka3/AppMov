import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {
  Usuario: any;
  hide = false;

  constructor(private router: Router) { }
  
  login() {
  
        let navigationExtras: NavigationExtras = {
          state: {
            username: this.Usuario
          }
        };

        this.router.navigate(['/home'], navigationExtras);
      };

  togglePassword() {
    this.hide = !this.hide;
  }


};

