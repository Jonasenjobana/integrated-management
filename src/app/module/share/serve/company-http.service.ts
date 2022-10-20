import { Company } from './../model/common.model';
import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyHttpService {
  companyList: Company[] = []
  constructor(private baseHttp:HttpClientService) { }
  private getList(): Promise<Company[]> {
    return this.baseHttp.post<object, Company[]>('/api/company/getList', {})
  }
  async getCompanyList() {
    if (this.companyList.length === 0) {
      this.companyList = await this.getList()
    }
    return Promise.resolve(this.companyList)
  }
}
