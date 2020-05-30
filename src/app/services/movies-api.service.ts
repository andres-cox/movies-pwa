import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResultsTMDb, MovieDetails, CreditsResponse } from '../interfaces/interfaces';
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
  getPopularMovies() {
    this.popularMoviesPage++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularMoviesPage}`;
    return this.runQuery<ResultsTMDb>(query);
  }
  getPopularTVShows() {
    const query = `/tv/popular?&page=1`;
    return this.runQuery<ResultsTMDb>(query);
  }
  getNetflix() {
    const query = `/discover/tv?with_networks=213&`;
    return this.runQuery<ResultsTMDb>(query);
  }
  getMovieDetails(id: string) {
    return this.runQuery<MovieDetails>(`/movie/${id}?a=1`);

  }
  getMovieActors(id: string) {
    return this.runQuery<CreditsResponse>(`/movie/${id}/credits?a=1`);
  }
}

