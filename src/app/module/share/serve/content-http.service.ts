import { Content } from './../model/result.model';
import { HttpClientService } from './http-client.service';
import { BaseCurdService } from './base-curd.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContentHttpService{

  constructor(private baseHttp:HttpClientService) { }
  async save() {
    this.baseHttp.post<object, Content>('/api/content/upload', {})
  }
}
