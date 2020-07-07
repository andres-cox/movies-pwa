import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResultsTMDb, MovieDetails, CreditsResponse, ResultGenres, TVShowDetails, PersonCredits, Movie, TVShow, Genre } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { catchError, map, tap, subscribeOn } from 'rxjs/operators';
import { Observable } from 'rxjs';

const URL = environment.urltmdb;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesAPIService {
  private genreYearMoviesPage = 0;
  private popularTVShows = 0;
  private popularNetflixTVShows = 0;
  private currentGenre;
  private currentYear;
  private seenIndexMovies: number[] = [];


  constructor(private http: HttpClient,
    private storageService: StorageService) {

    this.loadSeenMovies();
  }

  //SEEN MOVIES FROM STORAGE
  async loadSeenMovies() {
    const seenMovies = await this.storageService.loadMovies('seen');
    this.seenIndexMovies = seenMovies.map(el => el.id);
  }

  private runQuery<T>(query: string) {
    query = URL + query;
    query += `&api_key=${apiKey}&language=es&include_image_language=es&include_adult=false`;

    return this.http.get<T>(query);
  }

  //TAB 1 
  multiSearch(text: string): Observable<ResultsTMDb> {
    return this.runQuery<ResultsTMDb>(`/search/multi?&page=1&include_adult=false&query=${text}`);
  }

  getPopularMovies(): Observable<Movie[]> {
    const query = `/discover/movie?sort_by=popularity.desc&vote_average.gte=5`;
    return this.runQuery<ResultsTMDb>(query).pipe(map(res => res.results.filter(res => !this.seenIndexMovies.includes(res.id))));
  }

  getMovieRecommendations(id: string): Observable<Movie[]> {
    const query = `/movie/${id}/recommendations?`;
    return this.runQuery<ResultsTMDb>(query).pipe(map(res => res.results.filter(res => !this.seenIndexMovies.includes(res.id))));
  }

  getMovieSimilar(id: string): Observable<Movie[]> {
    const query = `/movie/${id}/similar?`;
    return this.runQuery<ResultsTMDb>(query).pipe(map(res => res.results.filter(res => !this.seenIndexMovies.includes(res.id))));
  }

  getPopularTVShows(): Observable<TVShow[]> {
    this.popularTVShows++;
    const query = `/tv/popular?&page=${this.popularTVShows}`;
    return this.runQuery<ResultsTMDb>(query).pipe(map(res => res.results));
  }

  getNetflixTVShows(): Observable<TVShow[]> {
    this.popularNetflixTVShows++;
    const query = `/discover/tv?with_networks=213&page=${this.popularNetflixTVShows}`
    return this.runQuery<ResultsTMDb>(query).pipe(map(res => res.results));

  }

  //TAB 2
  getMoviesByGenreAndYear(genre: number, year: number = 2020): Observable<Movie[]> {
    if (this.currentGenre === genre && this.currentYear === year) {
      this.genreYearMoviesPage++;
    } else {
      this.genreYearMoviesPage = 1;
      this.currentGenre = genre;
      this.currentYear = year;
    }
    const query = `/discover/movie?with_genres=${genre}&primary_release_year=${year}&sort_by=vote_average.desc&sort_by=popularity.desc&page=${this.genreYearMoviesPage}`;
    return this.runQuery<ResultsTMDb>(query).pipe(map(res => res.results));
  }

  getGenres(): Observable<Genre[]> {
    const query = `/genre/movie/list?`;
    return this.runQuery<ResultGenres>(query).pipe(map(res => res.genres));
  }

  //MOVIE DETAILS
  getMovieDetails(id: string): Observable<MovieDetails> {
    return this.runQuery<MovieDetails>(`/movie/${id}?a=1`);
  }

  getMovieActors(id: string): Observable<CreditsResponse> {
    return this.runQuery<CreditsResponse>(`/movie/${id}/credits?a=1`);
  }

  //TV DETAILS
  getTVShowDetails(id: string) {
    return this.runQuery<TVShowDetails>(`/tv/${id}?a=1`);
  }

  getTVShowActors(id: string) {
    return this.runQuery<CreditsResponse>(`/tv/${id}/credits?a=1`);
  }


  //ACTOR DETAILS
  getActorDetails(id: string): Observable<MovieDetails> {
    return this.runQuery<MovieDetails>(`/person/${id}?`);
  }

  getActorMovies(id: string): Observable<Movie[]> {
    return this.runQuery<ResultsTMDb>(`/discover/movie?with_cast=${id}&sort_by=popularity.desc`).pipe(map(res => res.results));
  }

  getActorTVShows(id: string): Observable<PersonCredits> {
    return this.runQuery<PersonCredits>(`/person/${id}/tv_credits?`);
  }
}

