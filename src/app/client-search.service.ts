import { Injectable } from '@angular/core';
import 'rxjs/add/operator/delay';
import { Observable } from 'rxjs/Observable';
import { ClientSearchResults } from './client-search-results';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable'
import { Client } from './client';

@Injectable()
export class ClientSearchService {
  data: ClientSearchResults = {
    clientData: [
      { firstName: "Ann", lastName: "Liebmann", phoneNumber: "+27-61-453-5444", email: "ann.lieb@mail.com", policyNumber: "0013983887 | 0013983887" },
      { firstName: "Ann", lastName: "Summer", phoneNumber: "+27-61-453-5444", email: "ann.summer@mail.com", policyNumber: "0013983887 | 0013983887" },
      { firstName: "Anabelle", lastName: "Samuel", phoneNumber: "+27-61-453-5444", email: "ann.samuel@mail.com", policyNumber: "0013983887 | 0013983887" },
      { firstName: "Andy", lastName: "Hunt", phoneNumber: "+987-654-3210", email: "andy@mail.com", policyNumber: "0013983887 | 0013983887" },
      { firstName: "Andrew", lastName: "Ng", phoneNumber: "+987-654-3210", email: "andrew@mail.com", policyNumber: "0013983887 | 0013983887" },
      { firstName: "Bjarne", lastName: "Stroustrup", phoneNumber: "+987-654-3210", email: "bjarne@mail.com", policyNumber: "0013983887 | 0013983887" },
      { firstName: "David", lastName: "Flanagan", phoneNumber: "+987-654-3210", email: "david@mail.com", policyNumber: "0013983887 | 0013983887" },
      { firstName: "David", lastName: "Thomas", phoneNumber: "+987-654-3210", email: "david@mail.com", policyNumber: "0013983887 | 0013983887" },
      { firstName: "Donald", lastName: "Knuth", phoneNumber: "+987-654-3210", email: "donald@mail.com", policyNumber: "0013983887 | 0013983887" },
      { firstName: "Erich", lastName: "Gamma", phoneNumber: "+987-654-3210", email: "erich@mail.com", policyNumber: "0013983887 | 0013983887" },
      { firstName: "James", lastName: "Gosling", phoneNumber: "+987-654-3210", email: "james@mail.com", policyNumber: "0013983887 | 0013983887" },
      { firstName: "James", lastName: "Rumbaugh", phoneNumber: "+987-654-3210", email: "james@mail.com", policyNumber: "0013983887 | 0013983887" },
      { firstName: "Kent", lastName: "Beck", phoneNumber: "+987-654-3210", email: "kent@mail.com", policyNumber: "0013983887 | 0013983887" },
      { firstName: "Nat", lastName: "Pryce", phoneNumber: "+987-654-3210", email: "nat@mail.com", policyNumber: "0013983887 | 0013983887" },
      { firstName: "Martin", lastName: "Fowler", phoneNumber: "+987-654-3210", email: "martin@mail.com", policyNumber: "0013983887 | 0013983887" },
      { firstName: "Rich", lastName: "Hickey", phoneNumber: "+987-654-3210", email: "rich@mail.com", policyNumber: "0013983887 | 0013983887" },
      { firstName: "Robert", lastName: "Martin", phoneNumber: "+987-654-3210", email: "robert@mail.com", policyNumber: "0013983887 | 0013983887" },
      { firstName: "Steve", lastName: "Freeman", phoneNumber: "+987-654-3210", email: "steve@mail.com", policyNumber: "0013983887 | 0013983887" },
      { firstName: "Steve", lastName: "Jobs", phoneNumber: "+987-654-3210", email: "steve@mail.com", policyNumber: "0013983887 | 0013983887" },
      { firstName: "Tom", lastName: "Kyte", phoneNumber: "+987-654-3210", email: "tom@mail.com", policyNumber: "0013983887 | 0013983887" },
      { firstName: "Yukihiro", lastName: "Matsumoto", phoneNumber: "+987-654-3210", email: "yukihiro@mail.com", policyNumber: "0013983887 | 0013983887" },
    ]
  };

  constructor() { }

  search(terms: Observable<string>, debounceMillis = 350) {
    return terms
      .debounceTime(debounceMillis)
      .distinctUntilChanged()
      .switchMap(term => this.searchData(term));
  }

  searchData(term: string): Observable<Client[]> {
    if (term.trim().length == 0)
      return ArrayObservable.of([]);

    let filteredResults = this.filterClientData(this.data.clientData, term);

    console.log("this.data.clientData: " + JSON.stringify(this.data.clientData));
    console.log("filteredResults: " + JSON.stringify(filteredResults));

    return ArrayObservable.of(filteredResults);
  }


  filterClientData(array: Client[], term: string): Client[] {
    let result = [];

    array.forEach(element => {
      if (this.elementContainsTerm(element, term))
        result.push(element);
    });

    return result;
  }

  elementContainsTerm(element:Client, term: string) {
    let textToSearch = element.firstName + " " + element.lastName + " " + element.email;
    let lowerCaseTextToSearch = textToSearch.toLowerCase();
    let lowerCaseTerm = term.toLowerCase();
    let result = lowerCaseTextToSearch.indexOf(lowerCaseTerm) != -1;
    return result;
  }
}
