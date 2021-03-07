import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public readonly apiURL = environment.servers.apiURL;
  public readonly gamePath = "/game"

  constructor(private http: HttpClient) { }

  public newGame(): Observable<any> {
    const url = `${this.apiURL}${this.gamePath}/new`;
    return this.http.post(`${url}`, null);
  }

  public flagSquare(boardId: string, row :number, col: number): Observable<any> {
    const url = `${this.apiURL}${this.gamePath}/${boardId}/flag/${row}/${col}`;
    return this.http.patch(`${url}`, null);
  }

  public revealSquare(boardId: string, row :number, col: number): Observable<any> {
    const url = `${this.apiURL}${this.gamePath}/${boardId}/reveal/${row}/${col}`;
    return this.http.patch(`${url}`, null);
  }

}
