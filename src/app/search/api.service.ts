import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import gql from 'graphql-tag';





const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic YWRtaW46YWRtaW4='
  })
};

@Injectable()
export class ApiService {
  baseUrlForRest: string = 'http://localhost:5820/annex/appmon_new/search/';
  
  baseUrl: string = 'http://localhost:4000/graphql';

  constructor(private _http: HttpClient) { }


  search(queryString: string, graph: boolean) {
    if (graph === true && queryString !== "")
    {
      let _URL = this.baseUrl;
      console.log('url', _URL);
      return this._http.post(_URL,
        { "operationName": null, "variables": {}, "query": "{\n  search(text: \""+ queryString +"*\") {\n    term\n    results {\n      uri\n      label\n      types {\n        uri\n      }\n      matches {\n        propertyUri\n        string\n      }\n    }\n  }\n}\n" }
        ,httpOptions   
        );
    }
    else if (queryString !== "")
    {
        {
        let _URL = this.baseUrlForRest + queryString + '*';
          console.log('url',_URL);
          return this._http.get(_URL,httpOptions);
        }
    }
    else
        {
          return new Observable();
        }
  }
}