import { Component } from '@angular/core';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage {
  qrCodeString = '';
  mostrarQR = false;

  constructor() {}

  generarQR() {
    // Puedes generar datos de QR dinámicamente aquí.
    // Por ejemplo, una cadena aleatoria o datos específicos.
    this.qrCodeString = 'Estas presente';
    this.mostrarQR = true;
  }
}
