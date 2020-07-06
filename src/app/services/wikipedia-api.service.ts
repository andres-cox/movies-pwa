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
    query = `${URL}action=parse${query}&format=json&origin=*`;
    return this.http.get<T>(query);
  }

  getActorAcademyAwards(actor: string): Observable<string> {

    let sectionId: Section;
    const searchSection$ = this.runQuery<ResultsWK>(`&page=Anexo:Premios_y_nominaciones_de_${actor}&prop=sections`)
      .pipe(concatMap(resp => {
        if ('error' in resp) { return new Observable<string>(subscriber => subscriber.next('')) }
        const sections: Section[] = resp.parse.sections;
        sectionId = sections.find(el => el.anchor == "Premios_Óscar");
        if (sectionId == undefined) sectionId = sections.find(el => el.anchor == "Óscar");
        if (sectionId == undefined) { return new Observable<string>(subscriber => subscriber.next('')) }
        return this.runQuery<SectionResult>(`&page=Anexo:Premios_y_nominaciones_de_${actor}&section=${sectionId.index}&prop=text&formatversion=2`)
          .pipe(map(res => res.parse.text));
      }));


    const searchPage$ = this.runQuery<ResultsWK>(`&page=${actor}&prop=sections`)
      .pipe(concatMap(resp => {
        if ('error' in resp) { return new Observable<string>(subscriber => subscriber.next('')) }
        const sections: Section[] = resp.parse.sections;
        sectionId = sections.find(el => el.anchor == "Premios_Óscar");
        if (sectionId == undefined) sectionId = sections.find(el => el.anchor == "Óscar");
        if (sectionId == undefined) sectionId = sections.find(el => el.anchor == "Premios_y_nominaciones");
        if (sectionId == undefined) sectionId = sections.find(el => el.anchor == "Reconocimientos_artísticos");
        if (sectionId == undefined) { return new Observable<string>(subscriber => subscriber.next('')) }
        return this.runQuery<SectionResult>(`&page=${actor}&section=${sectionId.index}&prop=text&formatversion=2`)
          .pipe(map(res => res.parse.text));
      }));

    return zip(searchSection$, searchPage$, (resSection: string, resPage: string) => ({ resSection, resPage }))
      .pipe(map(res => {
        if (res.resSection == '' && res.resPage == '') return '';
        return (res.resSection == '') ? res.resPage : res.resSection;
      }));
  }

  getMovieAcademyAwards(title: string): Observable<string> {
    // Titanic_(película_de_1997)
    // Green_Book_(película)
    // Avengers:_Endgame
    // A_Star_Is_Born_(película_de_2018)
    // The_Guard_(película_de_2011)
    // El_irlandés
    // Anexo:Premios_y_nominaciones_de_Whiplash_(pel%C3%ADcula_de_2014)
    console.log('original title', title);
    const searchPage$ = this.runQuery<ResultsWK>(`&page=${title}&prop=sections`)
      .pipe(concatMap(resp => {
        let sectionId: Section;
        if ('error' in resp) { return new Observable<string>(subscriber => subscriber.next('')) }
        const sections: Section[] = resp.parse.sections;
        sectionId = sections.find(el => el.anchor == "Premios");
        if (sectionId == undefined) sectionId = sections.find(el => el.anchor == "Premios_y_nominaciones");
        if (sectionId == undefined) { return new Observable<string>(subscriber => subscriber.next('')) }
        return this.runQuery<SectionResult>(`&page=${title}&section=${sectionId.index}&prop=text&formatversion=2`)
          .pipe(map(res => res.parse.text));
      }));
    searchPage$.subscribe(console.log);
    return searchPage$;
  }

}
