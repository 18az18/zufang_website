import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationformComponent } from './reservationform.component';

describe('ReservationformComponent', () => {
  let component: ReservationformComponent;
  let fixture: ComponentFixture<ReservationformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
