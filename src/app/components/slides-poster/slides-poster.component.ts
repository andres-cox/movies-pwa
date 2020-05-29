import { Component, OnInit, Input } from '@angular/core';
import { Movie } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-slides-poster',
  templateUrl: './slides-poster.component.html',
  styleUrls: ['./slides-poster.component.scss'],
})
export class SlidesPosterComponent implements OnInit {
  slideOpts = {
    slidesPerView: 3.3,
  }

  @Input() movies: Movie[] = [];

  constructor() { }

  ngOnInit() { }

}
