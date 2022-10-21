import { CompanyName } from './../model/common.model';
import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyHttpService {
  companyList: CompanyName[] = []
  constructor(private baseHttp:HttpClientService) { }
  private getList(): Promise<CompanyName[]> {
    return this.baseHttp.post<object, CompanyName[]>('/api/company/getList', {})
  }
  async getCompanyList() {
    if (this.companyList.length === 0) {
      this.companyList = await this.getList()
    }
    return Promise.resolve(this.companyList)
  }
}
