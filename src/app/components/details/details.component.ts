import { Component, OnInit, Input } from '@angular/core';
import { MoviesAPIService } from 'src/app/services/movies-api.service';
import { MovieDetails, Cast } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  @Input() id;

  slideOptCasting = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: 0
  };

  movie: MovieDetails = {};
  actors: Cast[] = [];
  hide = 150;
  star = 'star-outline';



  constructor(private moviesService: MoviesAPIService,
    private modalController: ModalController) { }

  ngOnInit() {

    this.moviesService.getMovieDetails(this.id)
      .subscribe(resp => {
        console.log(resp);
        this.movie = resp;
      });

    this.moviesService.getMovieActors(this.id)
      .subscribe(resp => {
        console.log(resp);
        this.actors = resp.cast;
      });

  }

  back() {
    this.modalController.dismiss();
  }

}
