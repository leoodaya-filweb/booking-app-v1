import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewRoomPage } from './review-room.page';

describe('ReviewRoomPage', () => {
  let component: ReviewRoomPage;
  let fixture: ComponentFixture<ReviewRoomPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewRoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
