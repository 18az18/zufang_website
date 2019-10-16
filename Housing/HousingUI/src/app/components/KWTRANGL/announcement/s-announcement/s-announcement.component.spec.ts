import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SAnnouncementComponent } from './s-announcement.component';

describe('SAnnouncementComponent', () => {
  let component: SAnnouncementComponent;
  let fixture: ComponentFixture<SAnnouncementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SAnnouncementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
