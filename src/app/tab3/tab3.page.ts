import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Movie, MovieDetails } from '../interfaces/interfaces';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  favoriteMovies: MovieDetails[] = [];

  constructor(
    private storageService: StorageService,
  ) { }

  async ionViewWillEnter() {
    this.favoriteMovies = await this.storageService.loadFavoriteMovies();
  }


}
