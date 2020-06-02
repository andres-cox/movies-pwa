import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResultsTMDb, MovieDetails, CreditsResponse, ResultGenres } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesAPIService {
  private popularMoviesPage = 0;


  constructor(private http: HttpClient) { }

  private runQuery<T>(query: string) {
    query = URL + query;
    query += `&api_key=${apiKey}&language=es&include_image_language=es`;

    return this.http.get<T>(query);

  }
  getPopularMovies(genre = '') {
    this.popularMoviesPage++;
    const query = `/discover/movie?with_genres=${genre}&sort_by=popularity.desc&page=${this.popularMoviesPage}`;
    return this.runQuery<ResultsTMDb>(query);
  }
  getPopularTVShows() {
    const query = `/tv/popular?&page=1`;
    return this.runQuery<ResultsTMDb>(query);
  }

  getGenres() {
    const query = `/genre/movie/list?`;
    return this.runQuery<ResultGenres>(query);
  }

  getNetflixTVShows() {
    const query = `/discover/tv?with_networks=213&`;
    return this.runQuery<ResultsTMDb>(query);
  }
  getMovieDetails(id: string) {
    return this.runQuery<MovieDetails>(`/movie/${id}?a=1`);

  }
  getMovieActors(id: string) {
    return this.runQuery<CreditsResponse>(`/movie/${id}/credits?a=1`);
  }

  getTVShowDetails(id: string) {
    return this.runQuery<MovieDetails>(`/tv/${id}?a=1`);

  }
  getTVShowActors(id: string) {
    return this.runQuery<CreditsResponse>(`/tv/${id}/credits?a=1`);
  }
}

