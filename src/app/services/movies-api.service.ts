import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResultsTMDb, MovieDetails, CreditsResponse, ResultGenres, TVShowDetails } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesAPIService {
  private popularMoviesPage = 0;
  private popularTVShows = 0;
  private popularNetflixTVShows = 0;


  constructor(private http: HttpClient) { }

  private runQuery<T>(query: string) {
    query = URL + query;
    query += `&api_key=${apiKey}&language=es&include_image_language=es`;

    return this.http.get<T>(query);

  }
  getPopularMovies(genre = '', year = 2020) {
    this.popularMoviesPage++;
    const query = `/discover/movie?with_genres=${genre}&page=${this.popularMoviesPage}&primary_release_year=${year}&sort_by=popularity.desc`;
    return this.runQuery<ResultsTMDb>(query);
  }

  getPopularTVShows() {
    this.popularTVShows++;
    const query = `/tv/popular?&page=${this.popularTVShows}`;
    return this.runQuery<ResultsTMDb>(query);
  }

  getNetflixTVShows() {
    this.popularNetflixTVShows++;
    const query = `/discover/tv?with_networks=213&page=${this.popularNetflixTVShows}`;
    return this.runQuery<ResultsTMDb>(query);
  }

  getGenres() {
    const query = `/genre/movie/list?`;
    return this.runQuery<ResultGenres>(query);
  }

  getMovieActors(id: string) {
    return this.runQuery<CreditsResponse>(`/movie/${id}/credits?a=1`);
  }

  getMovieDetails(id: string) {
    return this.runQuery<MovieDetails>(`/movie/${id}?a=1`);
  }

  getTVShowDetails(id: string) {
    return this.runQuery<TVShowDetails>(`/tv/${id}?a=1`);
  }

  getTVShowActors(id: string) {
    return this.runQuery<CreditsResponse>(`/tv/${id}/credits?a=1`);
  }
}

