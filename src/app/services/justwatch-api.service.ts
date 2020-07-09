import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResultsJW, Offer, Provider, ProviderJW, MovieJWDetails, TVShowJWDetails } from '../interfaces/interfaces';

const URL = environment.urljustwatch;

@Injectable({
  providedIn: 'root'
})


export class JustwatchApiService {
  private language: string = 'es_AR';

  constructor(private http: HttpClient) { }

  private runQuery<T>(query: string) {
    query = `${URL}/content${query}/locale/${this.language}`;

    return this.http.get<T>(query);
  }


  getProviders(): Provider[] {
    const providers = [
      { id: 8, clear_name: "Netflix", color: "#e50914" },
      { id: 2, clear_name: "Apple iTunes", color: "#c137e7" },
      { id: 3, clear_name: "Google Play Movies", color: "#ea4335" },
      { id: 119, clear_name: "Amazon Prime Video", color: "#146eb4" },
      { id: 350, clear_name: "Apple TV Plus", color: "#555555" },
      { id: 31, clear_name: "HBO Go", color: "#000000" },
      { id: 339, clear_name: "Movistar Play", color: "#398f85" },
      { id: 167, clear_name: "Claro video", color: "#dd463b" },
      { id: 67, clear_name: "Blim", color: "#0d4241" },
      { id: 283, clear_name: "Crunchyroll", color: "#af7b12" },
      { id: 11, clear_name: "Mubi", color: "#383838" }]
    return providers;
  }

  getProvidersFromJustWatchAPI(): Observable<ProviderJW> {
    return this.runQuery<ProviderJW>('/providers');
  }

  getMovie(id: string): Observable<MovieJWDetails> {
    return this.runQuery<MovieJWDetails>(`/titles/movie/${id}`);
  }

  getTVShow(id: string): Observable<TVShowJWDetails> {
    return this.runQuery<TVShowJWDetails>(`/titles/show/${id}`);
  }

  searchProviders(title: string): Observable<Provider[]> {

    const body = { query: title, page: 1, page_size: 2 };
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    headers.append('Access-Control-Allow-Methods', 'POST');
    headers.append('Access-Control-Allow-Origin', 'https://movies-pwa-6585e.firebaseapp.com');
    const query = this.http.post<ResultsJW>(`${URL}/content/titles/${this.language}/popular`, body, { headers }).pipe(map(res => {
      if (res.items[0].title == title) {
        const streamsAvailables: Offer[] = res.items[0].offers.filter(e => e.monetization_type == "flatrate" && e.presentation_type == "sd");
        const providersIndex: number[] = streamsAvailables.map(e => e.provider_id);
        return this.getProviders().filter(res => providersIndex.includes(res.id));
      } else {
        return [];
      }
    }))
    return query;

  };

}



