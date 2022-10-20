import { Product } from './components/product.model';
import { ListResult } from '../share/model/result.model';
import { Injectable } from '@angular/core';
import { BaseCurdService } from '../share/serve/base-curd.service';
import { HttpClientService } from '../share/serve/http-client.service';
import { ParamsData } from '../share/model/common.model';

@Injectable({
  providedIn: 'root'
})
export class ProductHttpService extends BaseCurdService<ParamsData, ListResult<Product[]>>{

  constructor(protected override baseHttp:HttpClientService) {
    super(baseHttp, '/api/product')
   }
}
