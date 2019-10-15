import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNavItemComponent } from './admin-nav-item.component';

describe('AdminNavItemComponent', () => {
  let component: AdminNavItemComponent;
  let fixture: ComponentFixture<AdminNavItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNavItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNavItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
