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

  hide = 250;
  star = 'star-outline';



  constructor(private moviesService: MoviesAPIService,
    private storageService: StorageService,
    private modalController: ModalController) { }

  ngOnInit() {
    console.log(this.id, this.mediaType);



    switch (this.mediaType) {
      case 'movie':

        this.storageService.movieExists(this.id, 'favortieMovies')
          .then(exists => this.star = (exists) ? 'star' : 'star-outline');

        this.moviesService.getMovieDetails(this.id)
          .subscribe(resp => {
            this.movie = resp;
            this.animationGenre = this.movie.genres.some(genre => genre.name.toLowerCase() == 'animación');
            console.log(this.animationGenre);
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
            //console.log(resp);
          });

        this.moviesService.getActorMovies(this.id)
          .subscribe(resp => {
            this.movies = resp.results;
            //console.log(resp);
          });
        break;

      default:
        break;
    }
  }

  favorite() {
    const exists = this.storageService.saveFavoriteMovie(this.movie);
    this.star = (exists) ? 'star' : 'star-outline';
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
