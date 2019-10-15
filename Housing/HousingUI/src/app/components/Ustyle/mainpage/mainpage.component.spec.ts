import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UstylemainpageComponent } from './Ustylemainpage';

describe('MainpageComponent', () => {
  let component: UstylemainpageComponent;
  let fixture: ComponentFixture<UstylemainpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UstylemainpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UstylemainpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
