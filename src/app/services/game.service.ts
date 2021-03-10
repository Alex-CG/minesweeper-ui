import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public readonly apiURL = `${environment.servers.apiURL}/ms-api`;
  public readonly gamePath = "/games"

  constructor(private http: HttpClient) { }

  public newGame(): Observable<any> {
    const url = `${this.apiURL}${this.gamePath}`;
    return this.http.post(`${url}`, null);
  }

  public saveGame(id: string, name: string): Observable<any> {
    const url = `${this.apiURL}${this.gamePath}/${id}`;
    return this.http.patch(`${url}`, {name});
  }

  public getGame(id: string): Observable<any> {
    const url = `${this.apiURL}${this.gamePath}/${id}`;
    return this.http.get(`${url}`);
  }

  public getAll(): Observable<any> {
    const url = `${this.apiURL}${this.gamePath}`;
    return this.http.get(`${url}`);
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
