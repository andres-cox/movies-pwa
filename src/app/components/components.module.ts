import { NgModule, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesPosterComponent } from './slides-poster/slides-poster.component';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [
    SlidesPosterComponent
  ],
  exports: [
    SlidesPosterComponent
  ],
  imports: [
    CommonModule,
    PipesModule
  ]
})
export class ComponentsModule { }
