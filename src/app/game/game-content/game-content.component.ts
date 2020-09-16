import { Component, OnInit } from '@angular/core';
import { GameDataService } from '../game-data.service';
import { GameShareDataService } from '../game-share-data.service';

@Component({
  selector: 'app-game-content',
  templateUrl: './game-content.component.html',
  styleUrls: ['./game-content.component.css']
})
export class GameContentComponent implements OnInit {
  getGamesUrl = "https://api.jsonbin.io/b/5d45e4d789ed890b24cb25f5";
  gameData;
  persistOriginalGameData: any;

  constructor(public gameDataService: GameDataService, public gameDataShareService: GameShareDataService) {
    this.gameDataService = gameDataService;
    this.gameDataShareService = gameDataShareService;
  }

  ngOnInit(): void {
    this.gameDataService.get(this.getGamesUrl).subscribe(gameData => {
      this.gameData = gameData;
      this.gameData.shift();
      this.persistOriginalGameData = [].concat(this.gameData);
      this.gameDataShareService.setGameList(this.gameData);
    });

    this.gameDataShareService.getSearchData().subscribe(searchData => {
      this.gameData = this.persistOriginalGameData.filter(option => option.title.includes(searchData));
    });

    this.gameDataShareService.getFilterData().subscribe(sort => {
      this.gameData = [].concat(this.persistOriginalGameData);
      if(sort === 'ASC' || sort === 'DESC') {
        this.gameData.sort((a, b) => sort === 'ASC' ? ((a.score > b.score) ? 1 : -1) : ((a.score < b.score) ? 1 : -1));
      } else {
        this.gameData = this.persistOriginalGameData.filter(option => option.platform.toLowerCase().includes((""+sort).toLowerCase()));
      }
    });
  }

  sortObjects(a, b) {
    // Use toUpperCase() to ignore character casing
    const bandA = a.band.toUpperCase();
    const bandB = b.band.toUpperCase();

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }



}
