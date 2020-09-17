import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {
  @ViewChild('mySlides', { read: IonSlides, static:false }) slides: IonSlides;

  constructor() { }

  ngOnInit() {
  }

  swipeNext() {
    this.slides.slideNext();
  }
  swipePrevious() {
    this.slides.slidePrev();
  }

}
