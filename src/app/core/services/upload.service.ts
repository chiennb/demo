import { Injectable } from '@angular/core';

import { DataService } from './data.service';
import { UtilityService } from './utility.service';

import { UrlConstants } from '../../core/common/url.constants';

@Injectable()
export class UploadService {
  public responseData: any;
  constructor(private dataService: DataService, private utilityService: UtilityService) { }

  postWithFile(url: string, postData: any, files: File[]) {
    let formData: FormData = new FormData();
    formData.append('files', files[0], files[0].name);
    if (postData !== "" && postData !== undefined && postData !== null) {
      for (var property of postData) {
        if (postData.hasOwnPropert(property)) {
          formData.append(property, postData[property]);
        }
      }
    }

    var returnResponse = new Promise((resolve, reject) => {
      this.dataService.postFile(url, formData).subscribe(
        res => {
          this.responseData = res;
          resolve(this.responseData);
        },
        error => this.dataService.handleError(error)
      );
    });
    return returnResponse;
  }
}
