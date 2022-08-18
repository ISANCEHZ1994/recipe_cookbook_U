import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../Shared/data-storage.service'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
  
})
export class HeaderComponent implements OnInit, OnDestroy {
  // @Output() featureSelected = new EventEmitter<string>();
  // onSelect(feature: string){
  //   this.featureSelected.emit(feature);
  // };
  isAuthenticated = false;
  private userSub: Subscription;

  constructor( private dataService: DataStorageService, private auth: AuthService ) {};

  ngOnInit(): void {
     this.userSub = this.auth.user.subscribe(
        user => {
          // !!user shorter version of => !user ? false : true
          this.isAuthenticated = !!user;
          console.log( !user );
          console.log( !!user );
        }
     );
  };  

  onSaveData(){
     this.dataService.storeRecipes();
  };

  onFetchData(){
    this.dataService.fetchRecipes().subscribe();
  };

  onLogout(){
    this.auth.logout();
  };

  ngOnDestroy(): void {
    this.userSub.unsubscribe();   
  }

};
