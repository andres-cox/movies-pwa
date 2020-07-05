import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, zip } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import { ResultsWK, Section, SectionResult } from '../interfaces/interfaces';

const URL = 'https://es.wikipedia.org/w/api.php?'
@Injectable({
  providedIn: 'root'
})
export class WikipediaApiService {

  constructor(private http: HttpClient) { }

  private runQuery<T>(query: string) {
    query = URL + query;
    // query += '&format=json&action=parse&section=2&prop=text&formatversion=2&origin=*'
    query += '&format=json&origin=*'

    return this.http.get<T>(query);
  }

  getActorAcademyAwards(actor: string): Observable<string> {

    let sectionId: Section;
    const searchSection$ = this.runQuery<ResultsWK>(`&action=parse&page=Anexo:Premios_y_nominaciones_de_${actor}&prop=sections`)
      .pipe(concatMap(resp => {
        if ('error' in resp) { return new Observable<string>(subscriber => subscriber.next('')) }
        const sections: Section[] = resp.parse.sections;
        sectionId = sections.find(el => el.anchor == "Premios_Óscar");
        if (sectionId == undefined) sectionId = sections.find(el => el.anchor == "Óscar");
        if (sectionId == undefined) { return new Observable<string>(subscriber => subscriber.next('')) }
        return this.runQuery<SectionResult>(`&action=parse&page=Anexo:Premios_y_nominaciones_de_${actor}&section=${sectionId.index}&prop=text&formatversion=2`)
          .pipe(map(res => res.parse.text));
      }));


    const searchPage$ = this.runQuery<ResultsWK>(`action=parse&page=${actor}&prop=sections`)
      .pipe(concatMap(resp => {
        if ('error' in resp) { return new Observable<string>(subscriber => subscriber.next('')) }
        const sections: Section[] = resp.parse.sections;
        sectionId = sections.find(el => el.anchor == "Premios_Óscar");
        if (sectionId == undefined) sectionId = sections.find(el => el.anchor == "Óscar");
        if (sectionId == undefined) sectionId = sections.find(el => el.anchor == "Premios_y_nominaciones");
        if (sectionId == undefined) sectionId = sections.find(el => el.anchor == "Reconocimientos_artísticos");
        if (sectionId == undefined) { return new Observable<string>(subscriber => subscriber.next('')) }
        return this.runQuery<SectionResult>(`action=parse&page=${actor}&section=${sectionId.index}&prop=text&formatversion=2`)
          .pipe(map(res => res.parse.text));
      }));

    return zip(searchSection$, searchPage$, (resSection: string, resPage: string) => ({ resSection, resPage }))
      .pipe(map(res => {
        if (res.resSection == '' && res.resPage == '') return '';
        return (res.resSection == '') ? res.resPage : res.resSection;
      }));
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
