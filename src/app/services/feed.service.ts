import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {configs} from "../config/config";
import {Observable} from "rxjs";
import {Response} from "../models/Response";
import {Hosts} from '../models/Hosts';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(
    private http: HttpClient) {
  }

  getFeedXML() {
    return this.http.get(`${configs.XML}`,
      {
        headers: new HttpHeaders(),
        responseType: 'text'
      })
  }

  getFeedXML2(){
    return this.http.get(`${configs.XML2}`,
      {
        headers: new HttpHeaders(),
        responseType: 'text'
      })
  }


  getFeedXML3(){
    return this.http.get(`${configs.XML3}`,
      {
        headers: new HttpHeaders(),
        responseType: 'text'
      })
  }
  createFeed(feed): Observable<Response> {
    const headers = new HttpHeaders()
      .set('authorization', localStorage.getItem('userToken'));
    return this.http.post<Response>(`${configs.HOST}/feed`, feed, {headers})
  }

  deleteFeed(id: number) {
    const headers = new HttpHeaders()
      .set('authorization', localStorage.getItem('userToken'));
    return this.http.delete(`${configs.HOST}/feed` + '/' + id, {headers});

  }

  getFeed() {
    return this.http.get(`${configs.HOST}/feed/findAll`)
  }
}
