import { NgModule, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesPosterComponent } from './slides-poster/slides-poster.component';
import { PipesModule } from '../pipes/pipes.module';
import { DetailsComponent } from './details/details.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  entryComponents: [
    DetailsComponent
  ],
  declarations: [
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
