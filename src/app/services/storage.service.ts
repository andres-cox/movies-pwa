import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { MovieDetails } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  movies: MovieDetails[] = [];

  constructor(private toastController: ToastController) {
    this.loadFavoriteMovies();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500
    });
    toast.present();
  }

  async loadFavoriteMovies() {

    const res = await Storage.get({ key: 'movies' });
    this.movies = JSON.parse(res.value) || [];
    return this.movies;
  }


  async saveMovie(movie: MovieDetails) {

    console.log(this.movies);
    let exists = false;
    let message = '';

    for (const item of this.movies) {
      if (item.id === movie.id) {
        exists = true;
        break;
      }
    }

    if (exists) {
      this.movies = this.movies.filter(el => el.id !== movie.id);
      message = 'Removido de favoritos';
    } else {
      this.movies.push(movie);
      message = 'Agregada a favoritos';
    }
    this.presentToast(message);

    await Storage.set({
      key: 'movies',
      value: JSON.stringify(this.movies)
    });

    return !exists;
  }

  async movieExists(id) {

    await this.loadFavoriteMovies();
    const existe = this.movies.find(el => el.id === id);

    return (existe) ? true : false;
  }

}
