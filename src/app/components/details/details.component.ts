import { Component, OnInit, Input } from '@angular/core';
import { MoviesAPIService } from 'src/app/services/movies-api.service';
import { MovieDetails, TVShowDetails, ActorDetails, Movie, TVShow, ResultsTMDb } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { JustwatchApiService } from 'src/app/services/justwatch-api.service';
import { WikipediaApiService } from 'src/app/services/wikipedia-api.service';

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
    breakpoints: {
      720: {  //md
        slidesPerView: 5.3,
      }
    }
  };

  movie: MovieDetails = {};
  tvshow: TVShowDetails = {};
  actors: ActorDetails[] = [];

  animationGenre: boolean = false;
  animationActors: string[] = [];
  actor: ActorDetails = {};
  movies: Movie[] = [];
  tvshows = [];
  year;

  streamProviders;
  actorAcademyAwards

  hide = 250;
  star = 'star-outline';
  checkMark = 'checkmark-circle-outline';
  eye = 'eye-outline';

  constructor(private moviesService: MoviesAPIService,
    private storageService: StorageService,
    private justwatchService: JustwatchApiService,
    private wikipediaService: WikipediaApiService,
    private modalController: ModalController) { }

  async ngOnInit() {

    switch (this.mediaType) {
      case 'movie':

        this.storageService.movieExists(this.id, 'favorites')
          .then(exists => this.star = (exists) ? 'star' : 'star-outline');
        this.storageService.movieExists(this.id, 'towatch')
          .then(exists => this.eye = (exists) ? 'eye' : 'eye-outline');
        this.storageService.movieExists(this.id, 'seen')
          .then(exists => this.checkMark = (exists) ? 'checkmark-circle' : 'checkmark-circle-outline');

        await this.moviesService.getMovieDetails(this.id).subscribe(resp => {
          let streamAvailable;
          this.movie = resp;
          this.animationGenre = this.movie.genres.some(genre => genre.name.toLowerCase() == 'animación');
          this.year = resp.release_date.split('-')[0];
          this.justwatchService.search(this.movie.title).then(res => res.subscribe((result: any) => {
            streamAvailable = result.items[0].offers.filter(e => e.monetization_type == "flatrate" && e.presentation_type == "sd");
            streamAvailable = streamAvailable.map(e => e.provider_id)
            this.streamProviders = this.justwatchService.getProviders().filter(res => streamAvailable.includes(res.id));
          }));
        });

        // monetization_type: "flatrate"
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
        await this.moviesService.getActorDetails(this.id)
          .subscribe(resp => {
            this.actor = resp;
            const wikiResponse = this.wikipediaService.getActorAcademyAwards(this.actor.name);

            wikiResponse.then((res: any) => {
              res.subscribe((res: any) => {
                const sections = res.remaining.sections;
                console.log(sections);
                const actorAcademyAwards = sections.find(el => el.anchor == "Premios_y_nominaciones");
                this.actorAcademyAwards = actorAcademyAwards.text;
              });
            });
          });

        this.moviesService.getActorMovies(this.id)
          .subscribe(resp => {
            this.movies = resp.results;
          });

        this.moviesService.getActorTVShows(this.id)
          .subscribe(resp => {
            this.tvshows = resp.cast.sort(this.sortByProperty('popularity')).filter(el => { if (el.character == 'Himself' || el.character == 'Herself' || el.character == 'Guest' || el.character == '') { return } else { return el } });
          });

        break;
      default:
        break;
    }
  }

  sortByProperty(property) {
    return function (a, b) {
      if (a[property] > b[property])
        return -1;
      else if (a[property] < b[property])
        return 1;
      return 0;
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
