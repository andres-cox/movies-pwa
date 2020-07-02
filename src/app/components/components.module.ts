import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesPosterComponent } from './slides-poster/slides-poster.component';
import { PipesModule } from '../pipes/pipes.module';
import { DetailsComponent } from './details/details.component';
import { IonicModule } from '@ionic/angular';
import { MovieDetailsComponent } from './details/movie-details/movie-details.component';
import { TvshowDetailsComponent } from './details/tvshow-details/tvshow-details.component';
import { PersonDetailsComponent } from './details/person-details/person-details.component';



@NgModule({
  entryComponents: [
    DetailsComponent
  ],
  declarations: [
    MovieDetailsComponent,
    TvshowDetailsComponent,
    PersonDetailsComponent,
    SlidesPosterComponent,
    DetailsComponent
  ],
  exports: [
    SlidesPosterComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    IonicModule
  ]
})
export class ComponentsModule { }
