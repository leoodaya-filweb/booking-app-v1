import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookRoomPage } from './book-room.page';

describe('BookRoomPage', () => {
  let component: BookRoomPage;
  let fixture: ComponentFixture<BookRoomPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BookRoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
