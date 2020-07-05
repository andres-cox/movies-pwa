import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetailsComponent } from '../details.component';
import { Movie, ActorDetails, SectionResult } from 'src/app/interfaces/interfaces';
import { MoviesAPIService } from 'src/app/services/movies-api.service';
import { WikipediaApiService } from 'src/app/services/wikipedia-api.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss'],
})
export class PersonDetailsComponent implements OnInit {
  @Input() id;
  @Output() closeModal = new EventEmitter();


  actor: ActorDetails = {};
  movies: Movie[] = [];
  tvshows = [];
  year;
  hide = 250;

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
    this.moviesService.getActorDetails(this.id)
      .subscribe(resp => {
        this.actor = resp;
        this.wikipediaService.getActorAcademyAwards(this.actor.name).subscribe((res: string) => {
          this.actorAcademyAwards = res;
        })
      });

    this.moviesService.getActorMovies(this.id)
      .subscribe(resp => {
        this.movies = resp;
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

  back() {
    this.closeModal.emit();
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
