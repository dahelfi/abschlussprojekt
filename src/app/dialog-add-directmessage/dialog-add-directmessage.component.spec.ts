import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddDirectmessageComponent } from './dialog-add-directmessage.component';

describe('DialogAddDirectmessageComponent', () => {
  let component: DialogAddDirectmessageComponent;
  let fixture: ComponentFixture<DialogAddDirectmessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddDirectmessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddDirectmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
