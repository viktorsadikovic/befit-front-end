import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutPlansListComponent } from './workout-plans-list.component';

describe('WorkoutPlansListComponent', () => {
  let component: WorkoutPlansListComponent;
  let fixture: ComponentFixture<WorkoutPlansListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutPlansListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutPlansListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
