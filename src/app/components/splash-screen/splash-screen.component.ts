import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition('void => *', [
        style({marginTop: '-150vh'}),
        animate(800)
      ]),
      transition('* => void', [
        animate(800, style({marginTop: '150vh'}))
      ])
    ])
  ]
})
export class SplashScreenComponent implements OnInit {
  loading = true;
  @Input() loadingData: boolean;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }


  ngOnInit(): void {

  }
}
