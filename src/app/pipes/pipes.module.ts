import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePipe } from './image.pipe';
import { VoiceActorPipe } from './voice-actor.pipe';



@NgModule({
  declarations: [
    ImagePipe,
    VoiceActorPipe
  ],
  exports: [
    ImagePipe,
    VoiceActorPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
