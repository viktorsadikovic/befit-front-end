import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { OauthService } from 'src/app/shared/oauth.service';

@Component({
  selector: 'app-comment-thumbnail',
  templateUrl: './comment-thumbnail.component.html',
  styleUrls: ['./comment-thumbnail.component.css']
})
export class CommentThumbnailComponent implements OnInit {
  @Input() comment: any;


  constructor(private service: DataService,
              private oauthService: OauthService,
              private router: Router) { }

  ngOnInit(): void {

  }

  alreadyUpVoted() {
    if(this.oauthService.checkUserLoggedIn()) {
      let user = this.oauthService.getCurrentUser();
      console.log(user)
      return user.likedComments.filter(elem => elem.commentId === this.comment.id && elem.vote === "upVote").length !== 0
    }
    return false;
  }

  alreadyDownVoted() {
    if(this.oauthService.checkUserLoggedIn()) {
      let user = this.oauthService.getCurrentUser()
      console.log(user)

      return user.likedComments.filter(elem => elem.commentId === this.comment.id && elem.vote === "downVote").length !== 0
    }
    return false;
  }

  upVote() {
    if(this.oauthService.checkUserLoggedIn()){

      if(!this.alreadyUpVoted()){
        this.service.upVote(this.comment.id).subscribe( data => {
          this.comment = data
          this.service.getCurrentUser().subscribe(user => {
            this.oauthService.updateUser(user)
          })
        })
      }    

    } else {
      this.router.navigate(['/login'])
    }
  }

  downVote() {
    if(this.oauthService.checkUserLoggedIn()) {

      if(!this.alreadyDownVoted()){
        this.service.downVote(this.comment.id).subscribe( data => {
          this.comment = data
          this.service.getCurrentUser().subscribe(user => {
            this.oauthService.updateUser(user)
          })
        })
      }

    } else {
      this.router.navigate(['/login'])
    }
  }

}