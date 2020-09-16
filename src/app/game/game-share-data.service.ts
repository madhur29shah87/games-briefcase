import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameShareDataService {
  private filterDataUpdated = new Subject();
  private searchDataUpdated = new Subject();
  private filterData;
  private searchData;

  private gameListUpdated = new Subject();
  private gameList;

  constructor() { }

  getSearchData() {
    return this.searchDataUpdated.asObservable();
  }

  addSearchData(searchData){
    this.searchData = searchData;
    this.searchDataUpdated.next(this.searchData);
  }

  getFilterData() {
    return this.filterDataUpdated.asObservable();
  }

  addFilterData(filterData){
    this.filterData = filterData;
    this.filterDataUpdated.next(this.filterData);
  }

  getGameList() {
    return this.gameListUpdated.asObservable();
  }

  setGameList(gameList){
    this.gameList = gameList;
    this.gameListUpdated.next(this.gameList);
  }
}
