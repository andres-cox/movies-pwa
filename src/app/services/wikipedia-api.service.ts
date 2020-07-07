import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, zip } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import { ResultsWK, Section, SectionResult } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const URL = environment.urlwikipedia;
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

    const queries = [
      `&page=${actor}`,
      `&page=Anexo:Premios_y_nominaciones_de_${actor}`,
    ]

    const searches$: Array<Observable<string>> = queries.map(query => {
      return this.runQuery<ResultsWK>(`${query}&prop=sections`)
        .pipe(concatMap(resp => {
          if ('error' in resp) return new Observable<string>(subscriber => subscriber.next(''));
          let sectionId: Section;
          const sections: Section[] = resp.parse.sections;
          sectionId = sections.find(el => el.anchor == "Premios_Óscar");
          if (sectionId == undefined) sectionId = sections.find(el => el.anchor == "Óscar");
          if (sectionId == undefined) sectionId = sections.find(el => el.anchor == "Premios_y_nominaciones");
          if (sectionId == undefined) sectionId = sections.find(el => el.anchor == "Reconocimientos_artísticos");
          if (sectionId == undefined) return new Observable<string>(subscriber => subscriber.next(''));
          return this.runQuery<SectionResult>(`${query}&section=${sectionId.index}&prop=text&formatversion=2`)
            .pipe(map(res => res.parse.text));
        }))
    });

    return zip(...searches$).pipe(map(res => {
      const results = res.filter(r => r != '');
      return (results.length != 0) ? results[0] : '';
    }));
  }

  getMovieAcademyAwards(title: string, year: string, titleES: string): Observable<string> {

    const queries = [
      `&page=${title}`,
      `&page=${title}_(película)`,
      `&page=${title}_(película_de_${year})`,
      `&page=Anexo:Premios_y_nominaciones_de_${title}_(película_de_${year})`,
      `&page=${titleES}`,
    ]

    const searches$: Array<Observable<string>> = queries.map(query => {
      return this.runQuery<ResultsWK>(`${query}&prop=sections`)
        .pipe(concatMap(resp => {
          if ('error' in resp) return new Observable<string>(subscriber => subscriber.next(''));
          let sectionId: Section;
          const sections: Section[] = resp.parse.sections;
          sectionId = sections.find(el => el.anchor == "Premios");
          if (sectionId == undefined) sectionId = sections.find(el => el.anchor == "Premios_y_nominaciones");
          if (sectionId == undefined) return new Observable<string>(subscriber => subscriber.next(''));
          return this.runQuery<SectionResult>(`${query}&section=${sectionId.index}&prop=text&formatversion=2`)
            .pipe(map(res => res.parse.text));
        }));
    })


    return zip(...searches$).pipe(map(res => {
      const results = res.filter(r => r != '');
      return (results.length != 0) ? results[0] : '';
    }));

  }

}
