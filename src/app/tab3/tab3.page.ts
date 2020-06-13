import { Component, ViewChild } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Movie, MovieDetails } from '../interfaces/interfaces';
import { DetailsComponent } from '../components/details/details.component';
import { ModalController, IonSlides } from '@ionic/angular';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  favoriteMovies: MovieDetails[] = [];
  watchListMovies: MovieDetails[] = [];
  seenMovies: MovieDetails[] = [];

  @ViewChild('slides') selectedSlide: IonSlides;
  segment = 1;
  segments = ['towatch', 'favorites', 'seen'];

  slidesOpts = {
    initialSlide: 1,
    slidesPerView: 1,
  };

  constructor(
    private storageService: StorageService,
    private modalController: ModalController
  ) { }

  async ionViewWillEnter() {
    this.favoriteMovies = await this.storageService.loadMovies('favorites');
    this.watchListMovies = await this.storageService.loadMovies('towatch');
    this.seenMovies = await this.storageService.loadMovies('seen');
  }

  async segmentChanged(e) {
    await this.selectedSlide.slideTo(this.segment);
  }

  async slideChanged(slides: IonSlides) {
    this.selectedSlide = slides;
    slides.getActiveIndex().then(selectedIndex => this.segment = selectedIndex)
  }


  async searchDetails(id: string, mediaType: string) {
    const modal = await this.modalController.create({
      component: DetailsComponent,
      componentProps: {
        id,
        mediaType
      }
    });
    await modal.present();

    modal.onWillDismiss().then(e => { this.ionViewWillEnter() })
  }

  seenMovie(movie) {
    this.storageService.saveMovieAs('seen', movie);
    this.storageService.removeMovieFrom('towatch', movie);
    this.ionViewWillEnter();
  }
}
