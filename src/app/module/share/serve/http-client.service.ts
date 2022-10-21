import { Result, Params } from '../model/result.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { debounceTime } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private http: HttpClient) { }

  get<T>(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.http.get<Result<T>>(url).subscribe({
        next: (res: Result<T>) => {
          if (res.rlt === 0) {
            setTimeout(() => {
              resolve(res.datas)
            }, 5000);
          } else {
            reject(res.info || '响应接口错误')
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
    })
  }

  post<S, T>(url: string, data: S): Promise<T> {
    return new Promise((resolve, reject) => {
      this.http.post<Result<T>>(url, data).subscribe(
        (res: Result<T>) => {
          if (res.rlt === 0) {
            setTimeout(() => {
              resolve(res.datas)
            }, 5000);
          } else {
            reject(res.info || '响应接口错误')
          }
        }
      )
    })
  }
}
