import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomlayoutComponent } from './roomlayout.component';

describe('RoomlayoutComponent', () => {
  let component: RoomlayoutComponent;
  let fixture: ComponentFixture<RoomlayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomlayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
