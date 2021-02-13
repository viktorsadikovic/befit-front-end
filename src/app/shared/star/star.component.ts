import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {
  @Input() starId;
  @Input() rating;
  @Output() starEnter: EventEmitter<number> = new EventEmitter();
  @Output() starLeave: EventEmitter<number> = new EventEmitter();
  @Output() starClicked: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnChanges(): void {
    console.log(this.rating);
    console.log(this.starId)
  }

  onStarClicked(){
    this.starClicked.emit(this.starId);
  }

  onStarEnter(){
    this.starEnter.emit(this.starId);
  }
  onStarLeave(){
    this.starLeave.emit();
  }

}
