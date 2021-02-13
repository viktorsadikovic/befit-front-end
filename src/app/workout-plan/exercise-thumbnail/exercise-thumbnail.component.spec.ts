import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseThumbnailComponent } from './exercise-thumbnail.component';

describe('ExerciseThumbnailComponent', () => {
  let component: ExerciseThumbnailComponent;
  let fixture: ComponentFixture<ExerciseThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExerciseThumbnailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
