import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogThreadSentImageComponent } from './dialog-thread-sent-image.component';

describe('DialogThreadSentImageComponent', () => {
  let component: DialogThreadSentImageComponent;
  let fixture: ComponentFixture<DialogThreadSentImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogThreadSentImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogThreadSentImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
