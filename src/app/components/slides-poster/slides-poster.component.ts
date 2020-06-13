import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie, TVShow } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetailsComponent } from '../details/details.component';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-slides-poster',
  templateUrl: './slides-poster.component.html',
  styleUrls: ['./slides-poster.component.scss'],
})
export class SlidesPosterComponent implements OnInit {
  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    breakpoints: {
      720: {  //md
        slidesPerView: 5.3,
      },
      960: {  //lg
        slidesPerView: 7.3,
      },
      1140: { //xl
        slidesPerView: 9.3,
      }
    }
  }

  @Input() mediaType: string;
  @Input() pagerButton: boolean = true;
  @Input() movies: Movie[] = [];
  @Input() tvShows: TVShow[] = [];
  media: string;


  @Output() loadMore = new EventEmitter();

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.media = this.mediaType;
  }

  onClick() {
    this.loadMore.emit();
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
