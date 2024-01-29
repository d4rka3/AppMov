

import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  Usuario: any;
  isSupported = false;
  barcodes: string[] = []; // Cambiado a un array de strings

  constructor(private alertController: AlertController, private activatedRoute : ActivatedRoute) {}

  ngOnInit() {
    this.Usuario = history.state.username;
  }

  async scan(): Promise<void> {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });

    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }

    const { barcodes } = await BarcodeScanner.scan();

    // Solo agregamos los valores de los códigos de barras a la lista
    this.barcodes.push(...barcodes.map(barcode => barcode.rawValue));
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
