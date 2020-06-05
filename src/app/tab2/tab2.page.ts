import { Component } from '@angular/core';
import { MoviesAPIService } from '../services/movies-api.service';
import { Movie, ResultsTMDb, Genre, ResultGenres } from '../interfaces/interfaces';
import { DetailsComponent } from '../components/details/details.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  slideOptsGenres = {
    slidesPerView: 3,
  }
  slideOptsYears = {
    slidesPerView: 4,
  }
  popularMovies: Movie[] = [];
  genres: Genre[] = [];
  hide = 180;
  genre: number = 28;
  genreName: string = 'Accion';
  year: number = 2020;
  years: number[] = [];


  constructor(private moviesService: MoviesAPIService,
    private modalController: ModalController) { }

  ngOnInit(): void {
    for (let i = 20; i > 0; i--) {
      this.years.push(2000 + i);
    }
    //console.log(this.years)
    this.moviesService.getPopularMovies()
      .subscribe((res: ResultsTMDb) => {
        this.popularMovies = res.results;
        //console.log(this.popularMovies, res);
      });
    this.moviesService.getGenres()
      .subscribe((res: ResultGenres) => {
        this.genres = res.genres;
        console.log(res, this.genres);
      })
  }

  searchPopularMoviesByYear(year) {
    //console.log(this.genre, year)
    this.moviesService.getMoviesByGenreAndYear(this.genre, year)
      .subscribe((res: ResultsTMDb) => {
        this.popularMovies = res.results;
        //console.log(this.popularMovies, res);
      });
    this.year = year;
  }

  searchPopularMoviesByGenre(genre: Genre) {
    console.log(genre);
    this.moviesService.getMoviesByGenreAndYear(genre.id, this.year)
      .subscribe((res: ResultsTMDb) => {
        this.popularMovies = res.results;
        //console.log(this.popularMovies, res);
      });
    this.genre = genre.id;
    this.genreName = genre.name;
  }

  loadData(event?) {
    this.moviesService.getMoviesByGenreAndYear(this.genre, this.year).subscribe(resp => {
      console.log(resp);

      if (resp.results.length === 0) {
        event.target.disabled = true;
        event.target.complete();
        return;
      }

      this.popularMovies.push(...resp.results);

      if (event) {
        event.target.complete();
      }
    });
  }

  async searchDetails(id: string) {

    const modal = await this.modalController.create({
      component: DetailsComponent,
      componentProps: {
        id
      }
    });

    modal.present();

  }
}
