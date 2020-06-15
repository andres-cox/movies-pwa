import { Component, OnInit, ViewChild } from '@angular/core';
import { MoviesAPIService } from '../services/movies-api.service';
import { ResultsTMDb, Movie, TVShow, MovieDetails } from '../interfaces/interfaces';
import { DetailsComponent } from '../components/details/details.component';
import { ModalController, IonSearchbar } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild('searchBar') searchBar: IonSearchbar;
  popularMovies: Movie[] = [];
  popularTVShows: TVShow[] = [];
  netflixTVShows: TVShow[] = [];
  searching: boolean = false;
  darkMode: boolean = true;
  results = [];
  seenIndexMovies: any = [];

  randomFavoriteMovies: MovieDetails[] = [];
  recommendationMovies = [];
  similarMovies = [];


  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true
  }

  constructor(private moviesService: MoviesAPIService,
    private modalController: ModalController,
    private storageService: StorageService) { }

  async ngOnInit() {
    if (this.darkMode) { document.body.classList.toggle('dark'); }

    this.loadSeenMovies();
    this.moviesService.getPopularMovies()
      .subscribe((res: ResultsTMDb) => {
        this.popularMovies = res.results.filter(res => !this.seenIndexMovies.includes(res.id));
      });

    this.moviesService.getPopularTVShows()
      .subscribe((res: ResultsTMDb) => {
        this.popularTVShows = res.results.filter(res => !this.seenIndexMovies.includes(res.id));
      });

    this.moviesService.getNetflixTVShows()
      .subscribe((res: ResultsTMDb) => {
        this.netflixTVShows = res.results.filter(res => !this.seenIndexMovies.includes(res.id));
      });

    await this.loadRecomendations();

  }

  async doRefresh(event) {
    this.recommendationMovies = [];
    this.loadRecomendations();

    event.target.complete();
  }

  async loadSeenMovies() {
    const seenMovies = await this.storageService.loadMovies('seen');
    this.seenIndexMovies = seenMovies.map(el => el.id);
  }

  async loadRecomendations() {
    for (let i = 0; i < 3; i++) {
      this.randomFavoriteMovies[i] = await this.storageService.loadRandomFavoriteMovie();
      this.moviesService.getMovieRecommendations(this.randomFavoriteMovies[i].id.toString())
        .subscribe((res: ResultsTMDb) => {
          this.recommendationMovies[i] = res.results.filter(res => !this.seenIndexMovies.includes(res.id));
        });
      this.moviesService.getMovieSimilar(this.randomFavoriteMovies[i].id.toString())
        .subscribe((res: ResultsTMDb) => {
          this.similarMovies[i] = res.results.filter(res => !this.seenIndexMovies.includes(res.id));
        });
    }
  }

  loadMore(media: string) {
    switch (media) {
      case 'popularMovies':
        this.moviesService.getPopularMovies()
          .subscribe(resp => {
            const arrTemp = [...this.popularMovies, ...resp.results];
            this.popularMovies = arrTemp;
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
