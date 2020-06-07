import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { MovieDetails } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  favoriteMovies: MovieDetails[] = [];
  watchListMovies: MovieDetails[] = [];
  seenMovies: MovieDetails[] = [];
  movies: MovieDetails[] = [];

  constructor(private toastController: ToastController) {
    this.loadMovies('favoriteMovies');
    this.loadMovies('watchListMovies');
    this.loadMovies('seenMovies');
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500
    });
    toast.present();
  }

  async loadMovies(listMovies: string) {

    const res = await Storage.get({ key: `${listMovies}` });
    this.movies = JSON.parse(res.value) || [];
    return this.movies;
  }


  async saveFavoriteMovie(movie: MovieDetails) {

    console.log(this.favoriteMovies);
    let exists = false;
    let message = '';

    for (const item of this.favoriteMovies) {
      if (item.id === movie.id) {
        exists = true;
        break;
      }
    }

    if (exists) {
      this.favoriteMovies = this.favoriteMovies.filter(el => el.id !== movie.id);
      message = 'Removido de favoritos';
    } else {
      this.favoriteMovies.push(movie);
      message = 'Agregada a favoritos';
    }
    this.presentToast(message);

    await Storage.set({
      key: 'favoriteMovies',
      value: JSON.stringify(this.favoriteMovies)
    });

    return !exists;
  }

  async saveInWatchList(movie: MovieDetails) {

    console.log(this.watchListMovies);
    let exists = false;
    let message = '';

    for (const item of this.watchListMovies) {
      if (item.id === movie.id) {
        exists = true;
        break;
      }
    }

    if (exists) {
      this.watchListMovies = this.watchListMovies.filter(el => el.id !== movie.id);
      message = 'Removido de la lista';
    } else {
      this.watchListMovies.push(movie);
      message = 'Agregada a la lista';
    }
    this.presentToast(message);

    await Storage.set({
      key: 'watchListMovies',
      value: JSON.stringify(this.watchListMovies)
    });

    return !exists;
  }

  async seenMoviesList(movie: MovieDetails) {

    console.log(this.seenMovies);
    let exists = false;
    let message = '';

    for (const item of this.seenMovies) {
      if (item.id === movie.id) {
        exists = true;
        break;
      }
    }

    if (exists) {
      this.seenMovies = this.seenMovies.filter(el => el.id !== movie.id);
      message = 'Removido de Vistos';
    } else {
      this.seenMovies.push(movie);
      message = 'Agregada a Vistos';
    }
    this.presentToast(message);

    await Storage.set({
      key: 'seenMovies',
      value: JSON.stringify(this.seenMovies)
    });

    return !exists;
  }

  async movieExists(id, listmovies: string) {

    await this.loadMovies(listmovies);
    const existe = this.movies.find(el => el.id === id);

    return (existe) ? true : false;
  }

}
