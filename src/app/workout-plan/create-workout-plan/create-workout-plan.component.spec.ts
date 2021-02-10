import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkoutPlanComponent } from './create-workout-plan.component';

describe('CreateWorkoutPlanComponent', () => {
  let component: CreateWorkoutPlanComponent;
  let fixture: ComponentFixture<CreateWorkoutPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWorkoutPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWorkoutPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
