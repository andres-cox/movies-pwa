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

  constructor(private toastController: ToastController) {
    this.loadMovies('favorites');
    this.loadMovies('towatch');
    this.loadMovies('seen');
  }

  async loadRandomFavoriteMovie() {
    const test = await this.loadMovies('favorites');
    const random = Math.floor(Math.random() * (test.length));
    console.log(test, random);
    return test[random];
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500
    });
    toast.present();
  }

  async loadMovies(listMoviesType: string) {

    const res = await Storage.get({ key: `${listMoviesType}` });
    switch (listMoviesType) {
      case 'favorites':
        this.favoriteMovies = JSON.parse(res.value) || [];
        return this.favoriteMovies;
      case 'towatch':
        this.watchListMovies = JSON.parse(res.value) || [];
        return this.watchListMovies;
      case 'seen':
        this.seenMovies = JSON.parse(res.value) || [];
        return this.seenMovies;
      default:
        return
    }
  }



  saveMovieAs(listMoviesType: string, movie: MovieDetails) {

    let movies: MovieDetails[] = [];
    let exists = false;
    let message = '';
    switch (listMoviesType) {
      case 'favorites': movies = this.favoriteMovies; break;
      case 'towatch': movies = this.watchListMovies; break;
      case 'seen': movies = this.seenMovies; break;
      default: break;
    }

    for (const item of movies) {
      if (item.id === movie.id) {
        exists = true;
        break;
      }
    }

    const listMessage = (listMoviesType == 'favorites') ? 'favoritos' : (listMoviesType == 'towatch') ? 'peliculas para ver' : 'vistos'
    if (exists) {
      movies = movies.filter(el => el.id !== movie.id);
      message = `Removido de ${listMessage}`;
    } else {
      movies.push(movie);
      message = `Agregada a ${listMessage}`;
    }
    this.presentToast(message);

    Storage.set({
      key: `${listMoviesType}`,
      value: JSON.stringify(movies)
    });

    return !exists;
  }

  async removeMovieFrom(listMoviesType: string, movie: MovieDetails) {
    let movies: MovieDetails[] = [];
    switch (listMoviesType) {
      case 'favorites': movies = this.favoriteMovies; break;
      case 'towatch': movies = this.watchListMovies; break;
      case 'seen': movies = this.seenMovies; break;
      default: break;
    }

    movies = movies.filter(el => el.id !== movie.id);

    await Storage.set({
      key: `${listMoviesType}`,
      value: JSON.stringify(movies)
    });
  }

  async movieExists(id, listMoviesType: string) {
    let movies: MovieDetails[] = [];

    movies = await this.loadMovies(listMoviesType);
    const exists = movies.find(el => el.id === id);

    return (exists) ? true : false;
  }

}
