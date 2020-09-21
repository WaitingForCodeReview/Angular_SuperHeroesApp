import { Injectable } from '@angular/core';
import {PowerUp} from "./interfaces.config";

function powerUps(): Array<PowerUp> {
  return [
    {
      title: 'Captain\'s America Shield',
      powerStatName: 'durability',
      powerStatUpgradeValue: '10',
      usesLeft: '5',
      imgUrl: 'https://png.pngitem.com/pimgs/s/6-61962_captain-america-shield-png-transparent-png.png',
    },
    {
      title: 'Mjolnir',
      powerStatName: 'power',
      powerStatUpgradeValue: '10',
      usesLeft: '5',
      imgUrl: 'https://www.seekpng.com/png/small/57-573278_thor-hammer-png-image-transparent-download-mjolnir-icon.png',
    },
    {
      title: 'Iron Man\'s Nano Armor',
      powerStatName: 'combat',
      powerStatUpgradeValue: '10',
      usesLeft: '5',
      imgUrl: 'https://simg.nicepng.com/png/small/78-782326_ironman1icon-reactor-arc-iron-man.png',
    },
    {
      title: 'Dr.Strange\'s Cloak',
      powerStatName: 'intelligence',
      powerStatUpgradeValue: '10',
      usesLeft: '5',
      imgUrl: 'https://p.jing.fm/clipimg/small/175-1752857_doctor-strange-costume-png-doctor-strange-editing-background.png',
    },
    {
      title: 'Green Lantern\'s Ring',
      powerStatName: 'strength',
      powerStatUpgradeValue: '10',
      usesLeft: '5',
      imgUrl: 'https://i.pinimg.com/originals/2f/e2/8c/2fe28ce820eed86d6d8a42fae92a17b1.png',
    },
    {
      title: 'Flash Boots',
      powerStatName: 'speed',
      powerStatUpgradeValue: '10',
      usesLeft: '5',
      imgUrl: 'https://i.imgur.com/VTp6Kal.png',
    },
  ]
}


@Injectable({
  providedIn: 'root'
})
export class PowerUpsService {

  powerUps = powerUps()

  constructor() { }
}
