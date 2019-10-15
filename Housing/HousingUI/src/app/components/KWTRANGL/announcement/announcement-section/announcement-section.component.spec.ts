import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementSectionComponent } from './announcement-section.component';

describe('AnnouncementSectionComponent', () => {
  let component: AnnouncementSectionComponent;
  let fixture: ComponentFixture<AnnouncementSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnouncementSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
