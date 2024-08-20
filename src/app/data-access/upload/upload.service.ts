import { Injectable, Injector } from '@angular/core';
import { BaseDataAccessService } from '../base-data-access.service';

@Injectable({
  providedIn: 'root',
})
export class UploadService extends BaseDataAccessService<any> {
  baseImgPath = `http://localhost:4000/uploads`;
  constructor(private injector: Injector) {
    super('/upload', injector);
  }

  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);
    return this.post('', formData);
  }

  getImagePath(imageName?: string) {
    if (!imageName) {
      return '';
    }
    return `${this.baseImgPath}/${imageName}`;
  }
}
