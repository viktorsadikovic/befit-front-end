import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment-thumbnail',
  templateUrl: './comment-thumbnail.component.html',
  styleUrls: ['./comment-thumbnail.component.css']
})
export class CommentThumbnailComponent implements OnInit {
  @Input() comment: any;
  votes = 0

  constructor() { }

  ngOnInit(): void {
    this.votes = this.comment.rating
  }

  upVote() {
    this.votes = this.votes + 1
  }

  downVote() {
    this.votes = this.votes - 1
  }

}
