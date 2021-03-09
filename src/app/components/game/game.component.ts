import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  resumedGameId: string;
  savedGames: any[];

  constructor() { }

  ngOnInit(): void {
  }

  resumeGame(gameId: string) {
    this.resumedGameId = gameId;
  }

  loadSavedGames(savedGames: any[]) {
    this.savedGames = savedGames;
  }

}
