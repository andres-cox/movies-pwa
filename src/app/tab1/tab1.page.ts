import { Component, OnInit } from '@angular/core';
import { MoviesAPIService } from '../services/movies-api.service';
import { ResultsTMDb, Movie, TVShow, MovieDetails } from '../interfaces/interfaces';
import { DetailsComponent } from '../components/details/details.component';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

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
  darkMode: boolean = true;
  results = [];

  randomFavoriteMovie1;
  randomFavoriteMovie2;
  recommendationMovies1: Movie[] = [];
  recommendationMovies2: Movie[] = [];


  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true
  }

  constructor(private moviesService: MoviesAPIService,
    private modalController: ModalController,
    private storageService: StorageService) { }

  ngOnInit() {
    if (this.darkMode) { document.body.classList.toggle('dark'); }

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

    this.loadRecomendations();

  }

  async loadRecomendations() {
    this.randomFavoriteMovie1 = await this.storageService.loadRandomFavoriteMovie();
    this.randomFavoriteMovie2 = await this.storageService.loadRandomFavoriteMovie();
    this.moviesService.getMovieRecommendations(this.randomFavoriteMovie1.id.toString())
      .subscribe((res: ResultsTMDb) => {
        this.recommendationMovies1 = res.results;
      });
    this.moviesService.getMovieRecommendations(this.randomFavoriteMovie2.id.toString())
      .subscribe((res: ResultsTMDb) => {
        this.recommendationMovies2 = res.results;
      });
  }

  loadMore(media: string) {
    switch (media) {
      case 'popularMovies':
        this.moviesService.getPopularMovies()
          .subscribe(resp => {
            const arrTemp = [...this.popularMovies, ...resp.results];
            this.popularMovies = arrTemp;
            console.log(resp);
          });
        break;
      case 'popularTVShows':
        this.moviesService.getPopularTVShows()
          .subscribe(resp => {
            const arrTemp = [...this.popularTVShows, ...resp.results];
            this.popularTVShows = arrTemp;
          });
        break;
      case 'popularNetflixTVShows':
        this.moviesService.getNetflixTVShows()
          .subscribe(resp => {
            const arrTemp = [...this.netflixTVShows, ...resp.results];
            this.netflixTVShows = arrTemp;

          });
        break;

      default:
        break;
    }
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
