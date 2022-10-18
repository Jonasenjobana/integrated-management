import { manualData, paramsData } from './manual.model';
import { BaseCurdService } from './../share/serve/base-curd.service';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../share/serve/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ManualHttpService extends BaseCurdService<paramsData, manualData>{

  constructor(protected override baseHttp:HttpClientService) { 
    super(baseHttp, '/api/manual')
  }
  
}
