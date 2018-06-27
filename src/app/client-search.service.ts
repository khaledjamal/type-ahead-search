import { Injectable } from '@angular/core';
import 'rxjs/add/operator/delay';
import { Observable } from 'rxjs/Observable';
import { ClientSearchResults } from './client-search-results';
import {ArrayObservable} from 'rxjs/observable/ArrayObservable'
import { Client } from './client';

@Injectable()
export class ClientSearchService {
  data:ClientSearchResults = {clientData: [
    {firstName: "Andy", lastName: "Hunt", phoneNumber: "987-654-3210", email: "andy@mail.com", policyNumber: "1234567890"},
    {firstName: "Andrew", lastName: "Ng", phoneNumber: "987-654-3210", email: "andrew@mail.com", policyNumber: "1234567890"},
    {firstName: "Bjarne", lastName: "Stroustrup", phoneNumber: "987-654-3210", email: "bjarne@mail.com", policyNumber: "1234567890"},
    {firstName: "David", lastName: "Flanagan", phoneNumber: "987-654-3210", email: "david@mail.com", policyNumber: "1234567890"},
    {firstName: "David", lastName: "Thomas", phoneNumber: "987-654-3210", email: "david@mail.com", policyNumber: "1234567890"},
    {firstName: "Donald", lastName: "Knuth", phoneNumber: "987-654-3210", email: "donal@mail.com", policyNumber: "1234567890"},
    {firstName: "Erich", lastName: "Gamma", phoneNumber: "987-654-3210", email: "erich@mail.com", policyNumber: "1234567890"},
    {firstName: "James", lastName: "Gosling", phoneNumber: "987-654-3210", email: "james@mail.com", policyNumber: "1234567890"},
    {firstName: "James", lastName: "Rumbaugh", phoneNumber: "987-654-3210", email: "james@mail.com", policyNumber: "1234567890"},
    {firstName: "Kent", lastName: "Beck", phoneNumber: "987-654-3210", email: "kent@mail.com", policyNumber: "1234567890"},
    {firstName: "Nat", lastName: "Pryce", phoneNumber: "987-654-3210", email: "nat@mail.com", policyNumber: "1234567890"},
    {firstName: "Martin", lastName: "Fowler", phoneNumber: "987-654-3210", email: "martin@mail.com", policyNumber: "1234567890"},
    {firstName: "Rich", lastName: "Hickey", phoneNumber: "987-654-3210", email: "rich@mail.com", policyNumber: "1234567890"},
    {firstName: "Robert", lastName: "Martin", phoneNumber: "987-654-3210", email: "robert@mail.com", policyNumber: "1234567890"},
    {firstName: "Steve", lastName: "Freeman", phoneNumber: "987-654-3210", email: "steve@mail.com", policyNumber: "1234567890"},
    {firstName: "Steve", lastName: "Jobs", phoneNumber: "987-654-3210", email: "steve@mail.com", policyNumber: "1234567890"},
    {firstName: "Tom", lastName: "Kyte", phoneNumber: "987-654-3210", email: "tom@mail.com", policyNumber: "1234567890"},
    {firstName: "Yukihiro", lastName: "Matsumoto", phoneNumber: "987-654-3210", email: "yukihiro@mail.com", policyNumber: "1234567890"},
  ]};

  constructor() { }

  search(terms: Observable<string>, debounceMillis = 350 ) {
    return terms
        .debounceTime(debounceMillis)
        .distinctUntilChanged()
        .switchMap(term => this.rawsearch(term));
  }

  rawsearch (term: string):Observable<Client[]> {
    let filteredResults = this.filterClientData(this.data.clientData, term);

    console.log("this.data.clientData: " + JSON.stringify(this.data.clientData));
    console.log("filteredResults: " + JSON.stringify(filteredResults));

    return ArrayObservable.of(filteredResults);
  }


  filterClientData(array:Client[], term:string) : Client[] {
    let result = [];

    array.forEach(element => {
      let name = element.firstName + " " + element.lastName;
      let lowerCaseName = name.toLowerCase();
      let lowerCaseTerm = term.toLowerCase();
      if (lowerCaseName.startsWith(lowerCaseTerm))
        result.push(element);
    });

    return result;
  }

}
