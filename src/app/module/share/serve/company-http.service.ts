import { company } from './../model/common.model';
import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyHttpService {
  companyList: company[] = []
  constructor(private baseHttp:HttpClientService) { }
  private getList(): Promise<company[]> {
    return this.baseHttp.post<object, company[]>('/api/company/getList', {})
  }
  async getCompanyList() {
    if (this.companyList.length === 0) {
      try {
        this.companyList = await this.getList()
      } catch(err) {
        console.log(err)
      }
    }
    return Promise.resolve(this.companyList)
  }
}
