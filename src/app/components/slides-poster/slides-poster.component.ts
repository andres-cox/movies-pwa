import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from 'src/app/interfaces/interfaces';
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
    slidesPerColumn: 2,
    freeMode: true

  }

  @Input() movies: Movie[] = [];
  @Input() tvShows: Movie[] = [];
  @Output() loadMore = new EventEmitter();


  constructor(private modalController: ModalController) { }

  ngOnInit() {
    //console.log(this.movies);
    //console.log(this.tvShows);
  }

  onClick() {
    this.loadMore.emit();
  }

  async searchDetails(id: string) {

    const modal = await this.modalController.create({
      component: DetailsComponent,
      componentProps: {
        id
      }
    });

    modal.present();

  }


}
