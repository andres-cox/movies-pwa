import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesAPIService {

  constructor(private http: HttpClient) { }

  getFeature() {

    return this.http.get('https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&api_key=250eaa0f2ee0631481d18135c04b3ca9&language=es&include_image_language=es')

  }
}
