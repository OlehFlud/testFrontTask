import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FeedService} from "../../services/feed.service";
import * as xml2js from 'xml2js';
import {Response} from '../../models/Response';
import {Feed} from "../../models/Feed";
import {Router} from "@angular/router";

@Component({
  selector: 'list',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  feed = {
    username: '',
    title: '',
    url: ''
  };
  feeds: Feed[];
  statusMessage: string;
  public feedItems: any;
  public xmlItems: any;
  isCollapsed :boolean = true;

  constructor(
    private http: HttpClient,
    private feedService: FeedService,
    private _router: Router
  ) {
    this.loadXML();
    this.loadFeed();
  }
  toggleCollapse(){
    this.isCollapsed = !this.isCollapsed
  }

  createFeedDefinitions(): void {
    this.feedService.createFeed(this.feed)
      .subscribe((response: Response) => {
        console.log(response.message);
      })
  }

  ngOnInit() {
    this.loadFeed()
  }

  loadXML() {
    this.feedService.getFeedXML()
      .subscribe((data) => {
        this.parseXML(data)
          .then((data) => {
            this.xmlItems = data;
          })
      })
  }

  parseXML(data) {
    return new Promise(resolve => {
      let k: string | number,
      arr = [],
        parser = new xml2js.Parser(
          {
            trim: true,
            explicitArray: true
          });
      parser.parseString(data, function (err, result) {
        const obj = result.feed;
        for (k in obj.entry) {
          let item = obj.entry[k];
          arr.push({
            author: item.author[0],
            title: item.title,
          });
        }
        console.log(arr);
        return resolve(arr);
      });
    });
  }

  private loadFeed() {
    this.feedService.getFeed()
      .subscribe((data) => {
        this.feedItems = data;
      })
  }

  deleteFeed(feed: Feed) {
    this.feedService.deleteFeed(feed.id).subscribe(data => {
      this.statusMessage = 'Дані успішно видалені';
      this.loadFeed()
    });
  }

  sighOut(): void {
    localStorage.removeItem('userToken');
    this._router.navigate(['/login'])
  }

}
