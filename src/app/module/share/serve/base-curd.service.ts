import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Page } from '../model/result.model';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class BaseCurdService<S, T> {

  constructor(protected baseHttp:HttpClientService, @Inject('') baseUrl:string) {
    this.baseUrl = baseUrl
   }
  baseUrl: string = ""
  getInfo(id: string) {
    return this.baseHttp.get<T>(`${this.baseUrl}/getInfo/${id}`)
  }

  getList(data: S) {
    return this.baseHttp.post<S, Page<T[]>>(`${this.baseUrl}/getList`, data)
  }

  save(data: S) {
    return this.baseHttp.post<S, T>(`${this.baseUrl}/save`, data)
  }

  delete(id: string) {
    return this.baseHttp.get<T>(`${this.baseUrl}/delete/${id}`)
  }
}
