import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../search/api.service';


import 'rxjs/Rx';

@Component({
  selector: 'app-search',
  template: `<section class="filter-wrapper" >
  <div class="keyword-wrapper" >
<input type="text" #stardog placeholder="search..." autofocus/>
</div>
      <ul class="filter-select">
        <li *ngFor="let result of results" class="filter-select-list" ><p>
          {{ result.string }}</p></ul></section>  `,
  styleUrls: ['./search.component.css']
})



export class SearchComponent implements OnInit {

  results: any[] = [];
  constructor(private _apiService: ApiService) { }
  
  @ViewChild('stardog') stardog: ElementRef;
  search: string;   // text to search 

  ngOnInit() {
    Observable.fromEvent(this.stardog.nativeElement, 'keyup')
      .map((evt: any) => evt.target.value)
      .debounceTime(50)
      .distinctUntilChanged()
      .switchMap((text) => this._apiService.search(text,true))
      .subscribe((data: Array<object>) => {
        //if(data.results.length > 0)
        if(data.data.search.results.length > 0)
        {
          this.search = data.data.search.results[0].matches.map(a => a.string);
          this.results = data.data.search.results[0].matches;
        }
        else
        {
            this.search = '';
        }
      console.log(data);
    })};
  }
}

      //.switchMap((searchText) => this._apollo.query({query: gql'{search(text: '+ searchText +') {term results { uri label types {uri} matches {propertyUri string} }}}' }))
