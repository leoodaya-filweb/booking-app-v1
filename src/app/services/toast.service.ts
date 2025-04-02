import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async presentToast(message: string, duration: number = 2000, color= 'dark') {
    const toast = await this.toastController.create({
      message,
      duration,
      position: 'bottom',
      color
    });
    toast.present();
  }

  async presentSuccessToast(message: string) {
    await this.presentToast(message, 2000, 'success');
  }

  async presentErrorToast(message: string) {
    await this.presentToast(message, 2000, 'danger');
  }

  async presentWarningToast(message: string) {
    await this.presentToast(message, 2500, 'warning');
  }
}
