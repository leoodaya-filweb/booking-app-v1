import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonHeader } from "@ionic/angular/standalone";

@Component({
  selector: 'app-review-modal',
  templateUrl: './review-modal.component.html',
  styleUrls: ['./review-modal.component.scss'],
  standalone: false
})
export class ReviewModalComponent {
  bookingId: any;
  reviewText: string = '';
  rating: number = 5;

  constructor(private modalCtrl: ModalController) {}

  dismiss() {
    this.modalCtrl.dismiss();
  }

  submitReview() {
    // Here you can send the review data to your API
    console.log('Review Submitted:', { bookingId: this.bookingId, reviewText: this.reviewText, rating: this.rating });
    
    // Dismiss the modal after submitting
    this.modalCtrl.dismiss({ success: true });
  }
}
