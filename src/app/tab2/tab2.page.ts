import { Component } from '@angular/core';
import { MoviesAPIService } from '../services/movies-api.service';
import { Movie, ResultsTMDb, Genre, ResultGenres } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  slideOpts = {
    slidesPerView: 3.1
  }
  popularMovies: Movie[] = [];
  genres: Genre[] = [];

  constructor(private moviesService: MoviesAPIService) { }

  ngOnInit(): void {
    this.moviesService.getPopularMovies()
      .subscribe((res: ResultsTMDb) => {
        this.popularMovies = res.results;
        console.log(this.popularMovies, res);
      });
    this.moviesService.getGenres()
      .subscribe((res: ResultGenres) => {
        this.genres = res.genres;
        console.log(res, this.genres);
      })
  }
}
