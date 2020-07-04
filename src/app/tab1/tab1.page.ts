import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonSearchbar } from '@ionic/angular';
import { Observable } from 'rxjs';

import { DetailsComponent } from '../components/details/details.component';
import { MoviesAPIService } from '../services/movies-api.service';
import { StorageService } from '../services/storage.service';

import { Movie, TVShow, MovieDetails } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild('searchBar') searchBar: IonSearchbar;

  popularMovies: Observable<Movie[]>;
  similarMovies = Array<Observable<Movie[]>>();
  recommendationMovies = Array<Observable<Movie[]>>();

  popularTVShows: Observable<TVShow[]>;
  netflixTVShows: Observable<TVShow[]>;
  searching: boolean = false;
  darkMode: boolean = true;
  results = []; //Movie, TVShow, Actor

  randomFavoriteMovies: MovieDetails[] = [];


  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true
  }

  constructor(private moviesService: MoviesAPIService,
    private modalController: ModalController,
    private storageService: StorageService) { }

  async ngOnInit() {

    this.popularMovies = this.moviesService.getPopularMovies();

    this.popularTVShows = this.moviesService.getPopularTVShows();

    this.netflixTVShows = this.moviesService.getNetflixTVShows()

    for (let i = 0; i < 3; i++) {
      this.randomFavoriteMovies[i] = await this.storageService.loadRandomFavoriteMovie();
      this.recommendationMovies[i] = this.moviesService.getMovieRecommendations(this.randomFavoriteMovies[i].id.toString());
      this.similarMovies[i] = this.moviesService.getMovieSimilar(this.randomFavoriteMovies[i].id.toString());
    }

  }

  async doRefresh(event) {
    await this.ngOnInit();
    event.target.complete();
  }

  onSearch(event) {
    const searchText = event.detail.value;

    this.searchBar.showCancelButton = (event.detail.value != '') ? 'always' : 'never';

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
      })

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

  changeDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark');
  }

}
