import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DetailsComponent } from '../details.component';
import { MovieDetails, ActorDetails, Provider } from 'src/app/interfaces/interfaces';
import { StorageService } from 'src/app/services/storage.service';
import { MoviesAPIService } from 'src/app/services/movies-api.service';
import { JustwatchApiService } from 'src/app/services/justwatch-api.service';
import { WikipediaApiService } from 'src/app/services/wikipedia-api.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  @Input() id: string;
  @Output() closeModal = new EventEmitter();

  movie: MovieDetails = {};
  actors: ActorDetails[] = [];
  year;

  animationGenre: boolean = false;
  animationActors: string[] = [];

  streamProviders$: Observable<Provider[]>;
  movieAcademyAwards: string;

  star = 'star-outline';
  checkMark = 'checkmark-circle-outline';
  eye = 'eye-outline';

  slideOptCasting = {
    slidesPerView: 3.3,
    freeMode: true,
    breakpoints: {
      720: {  //md
        slidesPerView: 5.3,
      }
    }
  };

  constructor(
    private modalController: ModalController,
    private storageService: StorageService,
    private moviesService: MoviesAPIService,
    private justwatchService: JustwatchApiService,
    private wikipediaService: WikipediaApiService,
  ) { }

  async ngOnInit() {
    this.storageService.movieExists(this.id, 'favorites')
      .then(exists => this.star = (exists) ? 'star' : 'star-outline');
    this.storageService.movieExists(this.id, 'towatch')
      .then(exists => this.eye = (exists) ? 'eye' : 'eye-outline');
    this.storageService.movieExists(this.id, 'seen')
      .then(exists => this.checkMark = (exists) ? 'checkmark-circle' : 'checkmark-circle-outline');

    await this.moviesService.getMovieDetails(this.id).subscribe(resp => {
      this.movie = resp;
      this.animationGenre = this.movie.genres.some(genre => genre.name.toLowerCase() == 'animación');
      this.year = resp.release_date.split('-')[0];
      //this.streamProviders$ = this.justwatchService.searchProviders(this.movie.title);
      this.wikipediaService.getMovieAcademyAwards(this.movie.original_title, this.year, this.movie.title).subscribe((res: string) => {
        this.movieAcademyAwards = res;
      });
    });

    this.moviesService.getMovieActors(this.id)
      .subscribe(resp => this.actors = resp.cast);

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
    this.closeModal.emit();
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
