import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from '../Shared/data-storage.service'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
  
})
export class HeaderComponent  {
  // @Output() featureSelected = new EventEmitter<string>();
  // onSelect(feature: string){
  //   this.featureSelected.emit(feature);
  // };
  constructor( httpClient: HttpClient, private dataService: DataStorageService ) {};

  onSaveData(){
      this.dataService.storeRecipes();
  };

  onFetchData(){
    this.dataService.fetchRecipes().subscribe();
  };

};
