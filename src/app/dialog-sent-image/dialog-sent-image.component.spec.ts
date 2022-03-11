import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSentImageComponent } from './dialog-sent-image.component';

describe('DialogSentImageComponent', () => {
  let component: DialogSentImageComponent;
  let fixture: ComponentFixture<DialogSentImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSentImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSentImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
