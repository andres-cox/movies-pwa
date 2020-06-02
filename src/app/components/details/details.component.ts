import { Component, OnInit, Input } from '@angular/core';
import { MoviesAPIService } from 'src/app/services/movies-api.service';
import { MovieDetails, Cast, TVShowDetails } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  @Input() id;
  @Input() typeTVShow;

  slideOptCasting = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: 0
  };

  movie: MovieDetails = {};
  tvshow: TVShowDetails = {};
  actors: Cast[] = [];
  hide = 150;
  star = 'star-outline';



  constructor(private moviesService: MoviesAPIService,
    private modalController: ModalController) { }

  ngOnInit() {
    console.log(this.id, this.typeTVShow);

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

    if (this.typeTVShow) {

      this.moviesService.getTVShowDetails(this.id)
        .subscribe(resp => {
          console.log(resp);
          this.movie = resp;
        });


      this.moviesService.getTVShowActors(this.id)
        .subscribe(resp => {
          console.log(resp);
          this.actors = resp.cast;
        });
    }

  }

  back() {
    this.modalController.dismiss();
  }

}
