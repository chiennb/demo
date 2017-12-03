import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { SystemConstants } from '../../core/common/system.contants';
import { MessageConstants } from '../../core/common/message.constants';

import { AuthenService } from './authen.service';
import { NotificationService } from './notification.service';
import { UtilityService } from './utility.service';
@Injectable()
export class DataService {
  private headers: Headers;

  constructor(private _http: Http, _router: Router, private _authenService: AuthenService, private _notificatorService, private _utilityService: UtilityService) { }

  get(uri: string) {
    this.headers.delete("Authorization");
    this.headers.append("Authorization", "Bearer" + this._authenService.getLoggedIsUser().access_token);
    return this._http.get(SystemConstants.BASE_API + uri, { headers: this.headers }).map(this.extractData);
  }

  post(uri: string, data?: any) {
    this.headers.delete("Authorization");
    this.headers.append("Authorization", "Bearer" + this._authenService.getLoggedIsUser().access_token);
    return this._http.post(SystemConstants.BASE_API + uri, data, { headers: this.headers }).map(this.extractData);
  }

  push(uri: string, data?: any) {
    this.headers.delete("Authorization");
    this.headers.append("Authorization", "Bearer" + this._authenService.getLoggedIsUser().access_token);
    return this._http.put(SystemConstants.BASE_API + uri, data, { headers: this.headers }).map(this.extractData);
  }

  delete(uri: string, key: string, id: string) {
    let newheaders = new Headers();
    newheaders.append("Authorization", "Bearer" + this._authenService.getLoggedIsUser().access_token);
    return this._http.delete(SystemConstants.BASE_API + uri + "/?" + key + "=" + id, { headers: newheaders }).map(this.extractData);
  }

  postFile(uri: string, data?: any) {
    this.headers.delete("Authorization");
    this.headers.append("Authorization", "Bearer" + this._authenService.getLoggedIsUser().access_token);
    return this._http.post(SystemConstants.BASE_API + uri, data, { headers: this.headers }).map(this.extractData);
  }

  handleError(error: any) {
    if (error.status == 401) {
      localStorage.removeItem(SystemConstants.CURRENT_USER);
      this._notificatorService.printErrorMessage(MessageConstants.LOGIN_AGAIN_MSG);
      this._utilityService.navigateToLogin();
    }
    else {
      let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Lỗi hệ thống';
      this._notificatorService.printErrorMessage(errMsg);
      return Observable.throw(errMsg);
    }
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }
}
