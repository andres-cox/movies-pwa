import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetailsComponent } from '../details.component';
import { TVShowDetails, ActorDetails, Provider } from 'src/app/interfaces/interfaces';
import { JustwatchApiService } from 'src/app/services/justwatch-api.service';
import { WikipediaApiService } from 'src/app/services/wikipedia-api.service';
import { MoviesAPIService } from 'src/app/services/movies-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tvshow-details',
  templateUrl: './tvshow-details.component.html',
  styleUrls: ['./tvshow-details.component.scss'],
})
export class TvshowDetailsComponent implements OnInit {

  @Input() id;
  @Output() closeModal = new EventEmitter();


  tvshow: TVShowDetails = {};
  actors: ActorDetails[] = [];

  animationGenre: boolean = false;
  animationActors: string[] = [];

  streamProviders: Observable<Provider[]>;
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
    private justwatchService: JustwatchApiService,
    private wikipediaService: WikipediaApiService,
  ) { }

  ngOnInit() {
    this.moviesService.getTVShowDetails(this.id)
      .subscribe(resp => {
        this.tvshow = resp;
        this.animationGenre = this.tvshow.genres.some(genre => genre.name.toLowerCase() == 'animación');
        this.streamProviders = this.justwatchService.searchProviders(this.tvshow.name);
      });

    this.moviesService.getTVShowActors(this.id)
      .subscribe(resp => this.actors = resp.cast);

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
