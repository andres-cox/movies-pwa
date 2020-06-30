import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const URL = 'https://apis.justwatch.com/content';

@Injectable({
  providedIn: 'root'
})


export class JustwatchApiService {

  //https://apis.justwatch.com/content/providers/locale/en_US

  //   const https = require('https');
  // const QueryString = require('querystring');


  constructor(private http: HttpClient) { }

  private runQuery<T>(query: string) {
    query = URL + query;
    query += '/locale/es_AR'

    return this.http.get(query);
  }


  getProviders() {
    const providers = [{ id: 8, clear_name: "Netflix", color: "#e50914" },
    { id: 2, clear_name: "Apple iTunes", color: "#cc45f2" },
    { id: 3, clear_name: "Google Play Movies", color: "#ea4335" },
    { id: 119, clear_name: "Amazon Prime Video", color: "#146eb4" },
    { id: 350, clear_name: "Apple TV Plus", color: "#555555" },
    { id: 31, clear_name: "HBO Go", color: "#000000" },
    { id: 339, clear_name: "Movistar Play", color: "#61aba2" },
    { id: 167, clear_name: "Claro video", color: "#dd5449" },
    { id: 67, clear_name: "Blim", color: "#0d4241" },
    { id: 283, clear_name: "Crunchyroll", color: "#fcc044" },
    { id: 11, clear_name: "Mubi", color: "#383838" }]
    return providers;
  }

  async getProvidersFromJustWatchAPI() {
    return await this.runQuery('/providers');
  }

  async getMovie(id: string) {
    return await this.runQuery(`/titles/movie/${id}`);
  }

  async getTVShow(id: string) {
    return await this.runQuery(`/titles/show/${id}`);
  }

  async search(title: string) {

    const body = { query: title, page: 1, page_size: 2 };
    const headers = { 'Content-type': 'application/json' };
    console.log(body)
    return await this.http.post(`${URL}/titles/es_AR/popular`, body, { headers });
  };

}



