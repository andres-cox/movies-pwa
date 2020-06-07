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
    // console.log(event);
    // this.favoriteMovies = await this.storageService.loadMovies(`${event.detail.value}`);
    // console.log(this.favoriteMovies);
    console.log(event)
  }
  async ionViewWillEnter() {
    this.favoriteMovies = await this.storageService.loadMovies('favorites');
    this.watchListMovies = await this.storageService.loadMovies('towatch');
    this.seenMovies = await this.storageService.loadMovies('seen');
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
