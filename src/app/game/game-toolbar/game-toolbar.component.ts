import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { GameShareDataService } from '../game-share-data.service';

@Component({
  selector: 'app-game-toolbar',
  templateUrl: './game-toolbar.component.html',
  styleUrls: ['./game-toolbar.component.css']
})
export class GameToolbarComponent implements OnInit {
  gameNameControl = new FormControl();
  gameFilter: Observable<string[]>;
  gamesList: any = [];

  platforms = ["PC", "Macintosh", "PlayStation 3", "Xbox 360", "iPad", "PlayStation Vita", "Nintendo DS"]

  constructor(public gameDataShareService: GameShareDataService) {
    this.gameDataShareService = gameDataShareService;
  }

  ngOnInit(): void {
    this.gameFilter = this.gameNameControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    this.gameDataShareService.getGameList().subscribe(gamesList => {
      this.gamesList = gamesList;
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    // TODO: when origin or dest city is selected that city must be excluded from the other
    // let citiesList = dest ? this.cities.filter(city => city !== this.selectedOrigin) : this.cities;
    return this.gamesList.filter(option => option.title.toLowerCase().includes(filterValue)).map(obj => obj.title);
  }

  updateSearchData(event) {
    this.gameDataShareService.addSearchData(event.option && event.option.value ? event.option.value : "");
  }

  updateSelectedFilter(event) {
    this.gameDataShareService.addFilterData(event.option && event.option.value ? event.option.value : "");
  }
  updateSort(sort) {
    this.gameDataShareService.addFilterData(sort);
  }
}
