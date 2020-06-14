import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResultsTMDb, MovieDetails, CreditsResponse, ResultGenres, TVShowDetails, PersonCredits } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesAPIService {
  private popularMoviesPage = 0;
  private genreYearMoviesPage = 0;
  private popularTVShows = 0;
  private popularNetflixTVShows = 0;
  private currentGenre;
  private currentYear;


  constructor(private http: HttpClient) { }

  private runQuery<T>(query: string) {
    query = URL + query;
    query += `&api_key=${apiKey}&language=es&include_image_language=es&include_adult=false`;

    return this.http.get<T>(query);

  }

  getPopularMovies() {
    this.popularMoviesPage++;
    const query = `/discover/movie?&page=${this.popularMoviesPage}&sort_by=popularity.desc&vote_average.gte=5`;

    return this.runQuery<ResultsTMDb>(query);
  }

  getMoviesByGenreAndYear(genre: number, year: number = 2020) {
    if (this.currentGenre === genre && this.currentYear === year) {
      this.genreYearMoviesPage++;

    } else {
      this.genreYearMoviesPage = 1;
      this.currentGenre = genre;
      this.currentYear = year;
    }
    const query = `/discover/movie?with_genres=${genre}&primary_release_year=${year}&sort_by=vote_average.desc&sort_by=popularity.desc&page=${this.genreYearMoviesPage}`;
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

  getActorDetails(id: string) {
    return this.runQuery<MovieDetails>(`/person/${id}?`);
  }

  getTVShowDetails(id: string) {
    return this.runQuery<TVShowDetails>(`/tv/${id}?a=1`);
  }

  getTVShowActors(id: string) {
    return this.runQuery<CreditsResponse>(`/tv/${id}/credits?a=1`);
  }

  getActorMovies(id: string) {
    return this.runQuery<ResultsTMDb>(`/discover/movie?with_cast=${id}&sort_by=popularity.desc`);
  }

  getActorTVShows(id: string) {
    return this.runQuery<PersonCredits>(`/person/${id}/tv_credits?`);
  }

  getMovieRecommendations(id: string) {
    return this.runQuery<ResultsTMDb>(`/movie/${id}/recommendations?`);
  }

  multiSearch(text: string) {
    return this.runQuery<ResultsTMDb>(`/search/multi?&page=1&include_adult=false&query=${text}`);
  }
}

