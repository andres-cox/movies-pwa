import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Movie, MovieDetails } from '../interfaces/interfaces';
import { DetailsComponent } from '../components/details/details.component';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  favoriteMovies: MovieDetails[] = [];
  watchListMovies: MovieDetails[] = [];
  seenMovies: MovieDetails[] = [];
  typeListMovies: string;

  constructor(
    private storageService: StorageService,
    private modalController: ModalController
  ) { }

  async segmentChanged(e) {
    this.typeListMovies = e.detail.value;
  }
  async ionViewWillEnter() {
    this.favoriteMovies = await this.storageService.loadMovies('favorites');
    this.watchListMovies = await this.storageService.loadMovies('towatch');
    this.seenMovies = await this.storageService.loadMovies('seen');
    console.log(this.favoriteMovies);
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
