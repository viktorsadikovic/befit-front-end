import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseWrapperThumbnailComponent } from './exercise-wrapper-thumbnail.component';

describe('ExerciseWrapperThumbnailComponent', () => {
  let component: ExerciseWrapperThumbnailComponent;
  let fixture: ComponentFixture<ExerciseWrapperThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExerciseWrapperThumbnailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseWrapperThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
