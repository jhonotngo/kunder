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
  myDate: String = '';
  myDate2: String = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public getComics: GetComics,public http: Http) {
    this.loadComics(1);
    this.myDate = '';
    this.myDate2 = '';
    this.searchValue = ''
  }

  loadComics(event) {
    var parameters = '';
    if (!((this.searchValue === undefined) || (this.searchValue === '')))
      parameters = parameters + '&titleStartsWith='+this.searchValue;
    if (this.myDate!= '' && this.myDate2!='')
      parameters = parameters + '&dateRange='+this.myDate+','+this.myDate2;


    parameters = parameters+'&orderBy=title&limit=20&apikey='+ENV.PUBLIC_API_KEY+'&hash='+Md5.hashStr('1'+ENV.PRIVATE_API_KEY+ENV.PUBLIC_API_KEY)+'&ts=1'
    this.getComics.loadData(parameters,this.searchValue)
      .then(data => {
        this.comics = (this.searchValue== data[1])? data[0].data.results:this.comics;
      });
  }

  itemTapped(event, comic) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(DetailPage, {
      comic: comic
    });
  }

  changeDate(event: any,type) { // without type info
    if (new Date(this.myDate2.toString()).getTime() < new Date(this.myDate.toString()).getTime() && type=='max' ){
      this.myDate = this.myDate2;
    }
    if (new Date(this.myDate2.toString()).getTime() < new Date(this.myDate.toString()).getTime() && type=='min' ){
      this.myDate2 = this.myDate;
    }

    this.loadComics(1);
  }

  formatDate(date){
          var dateOut = new Date(date);
          return dateOut;
    };

}
