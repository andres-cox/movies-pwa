import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  @Input() id: string;
  @Input() mediaType: string;


  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {

  }

  back() {
    this.modalController.dismiss();
  }

}
