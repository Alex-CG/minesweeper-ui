import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnChanges {

  @Input() resumedGameId: string;
  @Output() loadSavedGames = new EventEmitter<any[]>();

  show = true;
  saveMode: boolean;

  game: any = {
    id: '',
    board: [[]]
  };

  gameNameToSave: string;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.newGame();
    this.loadAll();
  }

  loadAll(): void {
    this.gameService.getAll().subscribe(resp => {
      if (resp) {
        this.loadSavedGames.emit(resp);
      }
    });
  }

  newGame(): void {
    this.gameService.newGame().subscribe(resp => {
      this.loadGame(resp);
    });
  }

  revealSquare(square: any): void {
    if (this.game.face !== 'HAPPY' || square.opened || square.flag !== 'NONE') { return; }

    this.gameService.revealSquare(this.game.id, square.row, square.col).subscribe(resp => {
      if (resp) {
        this.loadGame(resp);
      }
    });
  }

  flagSquare(event: any, square: any): void {
    event.preventDefault();
    if (this.game.face !== 'HAPPY' || square.opened) { return; }

    this.gameService.flagSquare(this.game.id, square.row, square.col).subscribe(resp => {
      if (resp) {
        this.loadGame(resp);
      }
    });
  }

  saveGame(): void {
    if (!this.gameNameToSave) { return; }

    this.gameService.saveGame(this.game.id, this.gameNameToSave).subscribe(resp => {
      if (resp) {
        this.loadSavedGames.emit(resp);
        this.restartSaveMode();
        this.newGame();
      }
    });
  }

  loadGame(game: any): void {
    if (game) {
      this.show = false;
      this.game = game;
      if (this.game.face === 'SAD') {
        this.restartSaveMode();
      }
      this.show = true;
    }
  }

  goToSaveMode(): void {
    if (this.game.face === 'HAPPY') {
      this.saveMode = !this.saveMode;
    }
  }

  restartSaveMode(): void {
    this.saveMode = false;
    this.gameNameToSave = '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.resumedGameId && changes.resumedGameId.currentValue) {
        this.gameService.getGame(changes.resumedGameId.currentValue).subscribe(resp => {
          this.loadGame(resp);
        });
    }
  }

}
