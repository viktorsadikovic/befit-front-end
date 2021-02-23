import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentThumbnailComponent } from './comment-thumbnail.component';

describe('CommentThumbnailComponent', () => {
  let component: CommentThumbnailComponent;
  let fixture: ComponentFixture<CommentThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentThumbnailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
