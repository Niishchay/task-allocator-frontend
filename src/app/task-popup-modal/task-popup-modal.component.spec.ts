import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPopupModalComponent } from './task-popup-modal.component';

describe('TaskPopupModalComponent', () => {
  let component: TaskPopupModalComponent;
  let fixture: ComponentFixture<TaskPopupModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskPopupModalComponent]
    });
    fixture = TestBed.createComponent(TaskPopupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
