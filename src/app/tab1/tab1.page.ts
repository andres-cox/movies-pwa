import { Component, OnInit } from '@angular/core';
import { MoviesAPIService } from '../services/movies-api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private moviesService: MoviesAPIService) { }
  ngOnInit() {
    this.moviesService.getFeature().subscribe(console.log);
  }
}
