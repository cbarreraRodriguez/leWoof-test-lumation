import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class HttpWrapper {

  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {

  }
  public get(url: any) {
    return this.http.get(url, {headers: this.headers});
  }

  public post(url: any, request: any) {
    return this.http.post(url, request, {headers: this.headers});
  }

  public put(url: any, request: any) {
    return this.http.put(url, request, {headers: this.headers});

  }

  public delete(url: any) {
    return this.http.delete(url, {headers: this.headers});
  }
}
