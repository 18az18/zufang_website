import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicRollerComponent } from './pic-roller.component';

describe('PicRollerComponent', () => {
  let component: PicRollerComponent;
  let fixture: ComponentFixture<PicRollerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicRollerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicRollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
