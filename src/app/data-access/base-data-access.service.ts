import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, Injector } from '@angular/core';
import { Response } from './response';

export const BASE_PATH = new InjectionToken<string>('basePath');

@Injectable()
export class BaseDataAccessService<T> {
  url = 'http://localhost:4000/api';

  httpClient: HttpClient;

  constructor(@Inject(BASE_PATH) basePath: string, injector: Injector) {
    this.httpClient = injector.get(HttpClient);
    this.url += basePath;
  }

  getAll(subPath: string) {
    return this.httpClient.get<T[]>(this.getFullPath(subPath));
  }
  getSingle(subPath: string) {
    return this.httpClient.get<T>(this.getFullPath(subPath));
  }

  post(subPath: string, data: T & Record<string, any>) {
    return this.httpClient.post<T & Record<string, any>>(
      this.getFullPath(subPath),
      data
    );
  }
  patch(subPath: string, data: T & Record<string, any>) {
    return this.httpClient.patch<T & Record<string, any>>(
      this.getFullPath(subPath),
      data
    );
  }
  delete(subPath: string) {
    return this.httpClient.delete<any>(this.getFullPath(subPath));
  }
  getFullPath(subPath: string) {
    if (!subPath) return this.url;
    return `${this.url}${subPath}`;
  }
}
