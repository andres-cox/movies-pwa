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

  constructor(
    private storageService: StorageService,
    private modalController: ModalController
  ) { }

  async ionViewWillEnter() {
    this.favoriteMovies = await this.storageService.loadFavoriteMovies();
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
