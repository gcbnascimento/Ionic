import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.page.html',
  styleUrls: ['./tests.page.scss'],
})
export class TestsPage implements OnInit {
tab: string = "upcoming_test";
  constructor(private route: Router,) { }

  ngOnInit() {
  }

 test_result() {
    this.route.navigate(['./test-result']);
  } 
 question() {
    this.route.navigate(['./question']);
  } 
}
