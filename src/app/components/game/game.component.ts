import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  resumedGameId: string;
  savedGames: any[];

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
  }

  resumeGame(gameId: string): void {
    this.resumedGameId = gameId;
  }

  loadSavedGames(savedGames: any[]): void {
    this.savedGames = savedGames;
  }

  deleteGame(gameId: string): void {
    this.gameService.deleteGame(gameId).subscribe(resp => {
      if (resp) {
        this.loadSavedGames(resp);
      }
    });
  }

}
