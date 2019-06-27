import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactformParagraphComponent } from './contactform-paragraph.component';

describe('ContactformParagraphComponent', () => {
  let component: ContactformParagraphComponent;
  let fixture: ComponentFixture<ContactformParagraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactformParagraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactformParagraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
