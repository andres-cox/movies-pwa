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
  slideOpts = {
    slidesPerView: 3.1
  }
  popularMovies: Movie[] = [];
  genres: Genre[] = [];
  hide = 150;
  genre: string = '';

  constructor(private moviesService: MoviesAPIService,
    private modalController: ModalController) { }

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

  searchPopularMoviesByGenre(genre) {
    this.moviesService.getPopularMovies(genre)
      .subscribe((res: ResultsTMDb) => {
        this.popularMovies = res.results;
        console.log(this.popularMovies, res);
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
