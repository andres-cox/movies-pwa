import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetailsComponent } from '../details.component';
import { Movie, ActorDetails } from 'src/app/interfaces/interfaces';
import { MoviesAPIService } from 'src/app/services/movies-api.service';
import { WikipediaApiService } from 'src/app/services/wikipedia-api.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss'],
})
export class PersonDetailsComponent implements OnInit {
  @Input() id;

  actor: ActorDetails = {};
  movies: Movie[] = [];
  tvshows = [];
  year;

  actorAcademyAwards;


  slideOptCasting = {
    slidesPerView: 3.3,
    freeMode: true,
    breakpoints: {
      720: {  //md
        slidesPerView: 5.3,
      }
    }
  };

  constructor(
    private modalController: ModalController,
    private moviesService: MoviesAPIService,
    private wikipediaService: WikipediaApiService,
  ) { }

  async ngOnInit() {
    await this.moviesService.getActorDetails(this.id)
      .subscribe(resp => {
        this.actor = resp;
        const wikiResponse = this.wikipediaService.getActorAcademyAwards(this.actor.name);

        wikiResponse.then((res: any) => {
          res.subscribe((res: any) => {
            const sections = res.remaining.sections;
            console.log(sections);
            const actorAcademyAwards = sections.find(el => el.anchor == "Premios_y_nominaciones");
            this.actorAcademyAwards = actorAcademyAwards.text;
          });
        });
      });

    this.moviesService.getActorMovies(this.id)
      .subscribe(resp => {
        this.movies = resp.results;
      });

    this.moviesService.getActorTVShows(this.id)
      .subscribe(resp => {
        this.tvshows = resp.cast.sort(this.sortByProperty('popularity')).filter(el => { if (el.character == 'Himself' || el.character == 'Herself' || el.character == 'Guest' || el.character == '') { return } else { return el } });
      });
  }

  sortByProperty(property) {
    return function (a, b) {
      if (a[property] > b[property])
        return -1;
      else if (a[property] < b[property])
        return 1;
      return 0;
    }
  }


  async searchDetails(id: string, mediaType: string) {

    const modal = await this.modalController.create({
      component: DetailsComponent,
      componentProps: {
        id,
        mediaType
      }
    });

    modal.present();

  }
}
