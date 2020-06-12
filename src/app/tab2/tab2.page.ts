import { Component, ViewChild } from '@angular/core';
import { MoviesAPIService } from '../services/movies-api.service';
import { Movie, ResultsTMDb, Genre, ResultGenres } from '../interfaces/interfaces';
import { DetailsComponent } from '../components/details/details.component';
import { ModalController, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild('slidesGenres') slidesGenres: IonSlides;
  @ViewChild('slidesYears') slidesYears: IonSlides;
  slideOptsGenres = {
    slidesPerView: 3,
    grabCursor: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      540: {  //sm
        slidesPerView: 5,
      },
      720: {  //md
        slidesPerView: 6,
      },
      960: {  //lg
        slidesPerView: 8,
      },
      1140: { //xl
        slidesPerView: 12,
      }
    }
  }
  slideOptsYears = {
    slidesPerView: 4,
    grabCursor: true,
    breakpoints: {
      540: {  //sm
        slidesPerView: 6,
      },
      720: {  //md
        slidesPerView: 8,
      },
      960: {  //lg
        slidesPerView: 10,
      },
      1140: { //xl
        slidesPerView: 16,
      }
    },
  }
  popularMovies: Movie[] = [];
  genres: Genre[] = [];
  hide = 180;
  genre: number = 28; //Action
  genreName: string = 'Acción';
  year: number = 2020;
  years: number[] = [];


  constructor(private moviesService: MoviesAPIService,
    private modalController: ModalController) { }

  ngOnInit(): void {
    for (let i = 30; i > 0; i--) {
      this.years.push(1990 + i);
    }
    this.moviesService.getMoviesByGenreAndYear(this.genre, this.year)
      .subscribe((res: ResultsTMDb) => {
        this.popularMovies = res.results;
      });
    this.moviesService.getGenres()
      .subscribe((res: ResultGenres) => {
        this.genres = res.genres;
      })
  }

  next(slides: string) {
    (slides == 'years') ? this.slidesYears.slideNext() : this.slidesGenres.slideNext();
  }

  prev(slides: string) {
    (slides == 'years') ? this.slidesYears.slidePrev() : this.slidesGenres.slidePrev();
  }

  changeYear(year) {
    this.popularMovies = [];
    this.moviesService.getMoviesByGenreAndYear(this.genre, year)
      .subscribe((res: ResultsTMDb) => {
        this.popularMovies = res.results;
      });
    this.year = year;
  }

  changeGenre(genre: Genre) {
    this.popularMovies = [];
    this.moviesService.getMoviesByGenreAndYear(genre.id, this.year)
      .subscribe((res: ResultsTMDb) => {
        this.popularMovies = res.results;
      });
    this.genre = genre.id;
    this.genreName = genre.name;
  }

  loadData(event?) {
    this.moviesService.getMoviesByGenreAndYear(this.genre, this.year).subscribe(resp => {

      if (resp.results.length === 0) {
        event.target.disabled = true;
        event.target.complete();
        return;
      }

      this.popularMovies.push(...resp.results);

      if (event) {
        event.target.complete();
      }
    });
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
