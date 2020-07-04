import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WikipediaApiService {

  constructor(private http: HttpClient) { }

  getActorAcademyAwards() {
    //Para Anexo premios y nominaciones Buscar Oscar
    const query = this.http.get(`https://es.wikipedia.org/w/api.php?page=Anexo:Premios_y_nominaciones_de_Emma_Stone&format=json&action=parse&section=2&prop=text&formatversion=2&origin=*`)
    //Para pagina del Actor buscar seccion premios y nominaciones y si tiene sub seccion buscar Oscar
    // const query = this.http.get(`https://es.wikipedia.org/w/api.php?page=Anexo:Premios_y_nominaciones_de_Emma_Stone&format=json&action=parse&section=2&prop=text&formatversion=2&origin=*`)

    // console.log(query);
    query.subscribe(console.log);
    return query;
    // return response.subscribe((res: any) => {
    //   const sections = res.remaining.sections;
    //   console.log(sections);
    //   const actorAcademyAwards = sections.find(el => el.anchor == "Premios_Óscar");
    //   console.log(actorAcademyAwards.text);
    //   return actorAcademyAwards.text;
    // });
    // console.log(response);

  }

  getActorGoldenGlobes() {
    // https://es.wikipedia.org/api/rest_v1/page/mobile-sections/Will Smith
  }


  getMovieAcademyAwards() {
    // https://es.wikipedia.org/api/rest_v1/page/mobile-sections/Will Smith

  }

  getMovieGoldenGlobes() {
    // https://es.wikipedia.org/api/rest_v1/page/mobile-sections/Will Smith

  }

  getTVShowAcademyAwards() {
    // https://es.wikipedia.org/api/rest_v1/page/mobile-sections/Will Smith

  }

  getTVShowGoldenGlobes() {
    // https://es.wikipedia.org/api/rest_v1/page/mobile-sections/Will Smith

  }


}
