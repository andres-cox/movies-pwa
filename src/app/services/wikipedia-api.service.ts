import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WikipediaApiService {

  constructor(private http: HttpClient) { }

  async getActorAcademyAwards(actor: string) {
    const query = await this.http.get(`https://es.wikipedia.org/api/rest_v1/page/mobile-sections/${actor}`)
    console.log(query);
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
