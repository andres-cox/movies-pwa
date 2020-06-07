import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'voiceActor'
})
export class VoiceActorPipe implements PipeTransform {

  transform(actorName: string): unknown {
    const actorVoice = actorName.replace(' (voice)', '');
    return actorVoice;
  }

}
