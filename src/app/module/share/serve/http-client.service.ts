import { result, params } from './../model/result';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private http: HttpClient) { }

  get<T>(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.http.get<result<T>>(url).subscribe({
        next: (res: result<T>) => {
          if (res.rlt === 0) {
            resolve(res.datas)
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
      this.http.post<result<T>>(url, data).subscribe(
        (res: result<T>) => {
          if (res.rlt === 0) {
            resolve(res.datas)
          } else {
            reject(res.info || '响应接口错误')
          }
        }
      )
    })
  }
}