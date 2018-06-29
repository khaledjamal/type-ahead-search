import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

//rxjs operators
//import 'rxjs/add/observable/of';
import 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import {ClientSearchService} from './client-search.service'
import { Client } from './client';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  items:Array<string>;
  rows:Array<string>;
  clients:Array<Client>;

  // $ is used to indicate an Observable
  searchTerm$ = new Subject<string>();

  constructor(private clientSearchService:ClientSearchService) {}

  ngOnInit() {
    this.clientSearchService.search(this.searchTerm$).subscribe(results => this.clients = results);
  }

  getClientContainerClass(i) {
    let evenOrOdd = this.isEven(i+1) ? "even" : "odd";
    let result = "client-container client-container-" + evenOrOdd;
    return result ;
  }

  isEven(n) {
    return n % 2 == 0;
 }
}
