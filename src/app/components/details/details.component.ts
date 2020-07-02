import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  @Input() id;
  @Input() mediaType: string;

  media: string;

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.media = this.mediaType;
  }

  back() {
    this.modalController.dismiss();
  }

}
