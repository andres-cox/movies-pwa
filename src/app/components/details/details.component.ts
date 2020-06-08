import { Component, OnInit, Input } from '@angular/core';
import { MoviesAPIService } from 'src/app/services/movies-api.service';
import { MovieDetails, Cast, TVShowDetails, ActorDetails, Movie } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  @Input() id;
  @Input() mediaType: string;

  slideOptCasting = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: 0
  };

  movie: MovieDetails = {};
  tvshow: TVShowDetails = {};
  actors: ActorDetails[] = [];

  animationGenre: boolean = false;
  animationActors: string[] = [];
  actor = {};
  movies: Movie[] = [];
  year;

  hide = 250;
  star = 'star-outline';
  checkMark = 'checkmark-circle-outline';
  eye = 'eye-outline';

  constructor(private moviesService: MoviesAPIService,
    private storageService: StorageService,
    private modalController: ModalController) { }

  ngOnInit() {
    switch (this.mediaType) {
      case 'movie':

        this.storageService.movieExists(this.id, 'favorites')
          .then(exists => this.star = (exists) ? 'star' : 'star-outline');
        this.storageService.movieExists(this.id, 'towatch')
          .then(exists => this.eye = (exists) ? 'eye' : 'eye-outline');
        this.storageService.movieExists(this.id, 'seen')
          .then(exists => this.checkMark = (exists) ? 'checkmark-circle' : 'checkmark-circle-outline');

        this.moviesService.getMovieDetails(this.id)
          .subscribe(resp => {
            this.movie = resp;
            this.animationGenre = this.movie.genres.some(genre => genre.name.toLowerCase() == 'animación');
            this.year = resp.release_date.split('-')[0];
          });

        this.moviesService.getMovieActors(this.id)
          .subscribe(resp => this.actors = resp.cast);
        break;

      case 'tv':
        this.moviesService.getTVShowDetails(this.id)
          .subscribe(resp => {
            this.tvshow = resp;
            this.animationGenre = this.tvshow.genres.some(genre => genre.name.toLowerCase() == 'animación');
          });

        this.moviesService.getTVShowActors(this.id)
          .subscribe(resp => this.actors = resp.cast);
        break;

      case 'person':
        this.moviesService.getActorDetails(this.id)
          .subscribe(resp => {
            this.actor = resp;
          });

        this.moviesService.getActorMovies(this.id)
          .subscribe(resp => {
            this.movies = resp.results;
          });
        break;

      default:
        break;
    }
  }

  favorite() {
    const exists = this.storageService.saveMovieAs('favorites', this.movie);
    this.star = (exists) ? 'star' : 'star-outline';
  }

  toWatch() {
    const exists = this.storageService.saveMovieAs('towatch', this.movie);
    this.eye = (exists) ? 'eye' : 'eye-outline';
  }

  seenMovie() {
    const exists = this.storageService.saveMovieAs('seen', this.movie);
    this.checkMark = (exists) ? 'checkmark-circle' : 'checkmark-circle-outline';
  }

  back() {
    this.modalController.dismiss();
  }

  async searchDetails(id: string, mediaType: string) {

    const modal = await this.modalController.create({
      component: DetailsComponent,
      componentProps: {
        id,
        mediaType
      }
    });

    modal.present();

  }


}
