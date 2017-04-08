import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ENV } from '../../config/environment';
import { DetailPage } from '../detail/detail';
import { GetComics } from '../../providers/get-comics/get-comics';
import { Http } from '@angular/http';
import {Md5} from 'ts-md5/dist/md5'

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [GetComics]
})
export class ListPage {
  selectedItem: any;
  result: any;
  searchValue: string;
  searchValue2: string;
  public comics: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public getComics: GetComics,public http: Http) {
    this.loadComics(20);
  }
//
  loadComics(number) {
    console.log(number)
    this.getComics.loadData('&noVariants=true&dateDescriptor=thisMonth&orderBy=title&limit='+number+'&apikey='+ENV.PUBLIC_API_KEY+'&hash='+Md5.hashStr('1'+ENV.PRIVATE_API_KEY+ENV.PUBLIC_API_KEY)+'&ts=1')
      .then(data => {
        console.log(data.data.results);
        this.comics = data.data.results;
      });
  }

  itemTapped(event, comic) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(DetailPage, {
      comic: comic
    });
  }

  onKey(event: any,type) { // without type info

    if (type == 'cosa'){
      this.loadComics(Math.floor(Math.random() * 20)+1);
      this.searchValue = event.target.value + ' ' + type + ' ' + ENV.PUBLIC_API_KEY;
    } else if (type == 'cosito')
      this.searchValue2 = event.target.value + ' ' + type;

  }
}
