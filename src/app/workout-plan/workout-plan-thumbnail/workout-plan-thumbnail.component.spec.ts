import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutPlanThumbnailComponent } from './workout-plan-thumbnail.component';

describe('WorkoutPlanThumbnailComponent', () => {
  let component: WorkoutPlanThumbnailComponent;
  let fixture: ComponentFixture<WorkoutPlanThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutPlanThumbnailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutPlanThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
