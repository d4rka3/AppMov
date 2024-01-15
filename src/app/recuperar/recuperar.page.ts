import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage {
  
  showSpinner = false; 
  loadingPercentage = 0;
  alertButtons=['Entendido'];

  constructor(private router: Router) { }

  iniciarCarga() {
    this.showSpinner = true; // Mostrar el spinner al iniciar la carga

    const interval = setInterval(() => {
      this.loadingPercentage += 10;
      if (this.loadingPercentage >= 100) {
        clearInterval(interval);
        this.showSpinner = false;
        
        this.router.navigate(['/login']);
      }
    }, 100);
  }
}


