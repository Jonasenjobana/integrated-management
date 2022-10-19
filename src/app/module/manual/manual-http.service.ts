
import { listResult } from '../share/model/result.model';
import { manual } from './manual.model';
import { BaseCurdService } from './../share/serve/base-curd.service';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../share/serve/http-client.service';
import { paramsData } from '../share/model/common.model';

@Injectable({
  providedIn: 'root'
})
export class ManualHttpService extends BaseCurdService<paramsData, listResult<manual[]>>{

  constructor(protected override baseHttp:HttpClientService) { 
    super(baseHttp, '/api/manual')
  }
}
