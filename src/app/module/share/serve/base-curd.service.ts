import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class BaseCurdService<S, T> {

  constructor(private baseHttp:HttpClientService) { }
  baseUrl: string = ""
  getInfo(id: string) {
    return this.baseHttp.get<T>(`${this.baseUrl}/getInfo/${id}`)
  }

  getList(data: S) {
    return this.baseHttp.post<S,T>(`${this.baseUrl}/getList`, data)
  }

  save(data: S) {
    return this.baseHttp.post<S, T>(`${this.baseUrl}/save`, data)
  }

  delete(id: string) {
    return this.baseHttp.get<T>(`${this.baseUrl}/delete/${id}`)
  }
}
