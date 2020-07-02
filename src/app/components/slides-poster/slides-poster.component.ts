import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Billboard, TVShow } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetailsComponent } from '../details/details.component';

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
  @Input() billboard: Billboard[] = [];



  @Output() loadMore = new EventEmitter();

  constructor(private modalController: ModalController) {

  }

  ngOnInit() {
  }

  async searchDetails(id: string) {
    const mediaType: string = this.mediaType;

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
