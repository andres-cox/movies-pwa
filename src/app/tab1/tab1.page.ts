import { Component, OnInit } from '@angular/core';
import { MoviesAPIService } from '../services/movies-api.service';
import { ResultsTMDb, Movie } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  popularMovies: Movie[] = [];
  popularTVShows: Movie[] = [];
  netflixMovies: Movie[] = [];
  constructor(private moviesService: MoviesAPIService) { }
  ngOnInit() {
    this.moviesService.getPopularMovies()
      .subscribe((res: ResultsTMDb) => {
        this.popularMovies = res.results;
      });

    this.moviesService.getPopularTVShows()
      .subscribe((res: ResultsTMDb) => {
        this.popularTVShows = res.results;
        //console.log(this.recentMovies);
      });
    this.moviesService.getNetflix()
      .subscribe((res: ResultsTMDb) => {
        this.netflixMovies = res.results;
        //console.log(this.recentMovies);
      });
  }

  loadMore() {
    this.getPopulars();
  }

  getPopulars() {
    this.moviesService.getPopularMovies()
      .subscribe(resp => {
        const arrTemp = [...this.popularMovies, ...resp.results];
        this.popularMovies = arrTemp;

      });
  }

}
