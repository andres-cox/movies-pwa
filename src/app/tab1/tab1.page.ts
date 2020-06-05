import { Component, OnInit } from '@angular/core';
import { MoviesAPIService } from '../services/movies-api.service';
import { ResultsTMDb, Movie, TVShow } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  popularMovies: Movie[] = [];
  popularTVShows: TVShow[] = [];
  netflixTVShows: TVShow[] = [];
  searching: boolean = false;
  results = [];
  // person = 'person';


  constructor(private moviesService: MoviesAPIService) { }
  ngOnInit() {
    this.moviesService.getPopularMovies()
      .subscribe((res: ResultsTMDb) => {
        this.popularMovies = res.results;
      });

    this.moviesService.getPopularTVShows()
      .subscribe((res: ResultsTMDb) => {
        this.popularTVShows = res.results;
      });

    this.moviesService.getNetflixTVShows()
      .subscribe((res: ResultsTMDb) => {
        this.netflixTVShows = res.results;
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
    this.moviesService.getPopularTVShows()
      .subscribe(resp => {
        const arrTemp = [...this.popularTVShows, ...resp.results];
        this.popularTVShows = arrTemp;

      });
    this.moviesService.getNetflixTVShows()
      .subscribe(resp => {
        const arrTemp = [...this.netflixTVShows, ...resp.results];
        this.netflixTVShows = arrTemp;

      });
  }

  onSearch(event) {
    const searchText = event.detail.value;

    if (searchText.length === 0) {
      this.searching = false;
      this.results = [];
      return;
    }

    this.searching = true;

    this.moviesService.multiSearch(searchText)
      .subscribe(resp => {
        this.results = resp.results;
        this.searching = false;
        console.log(this.results)
      })

  }

}
