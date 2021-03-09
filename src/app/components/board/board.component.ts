import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input() resumedGameId: string;
  @Output() loadSavedGames = new EventEmitter<any[]>();

  show = true;
  saveMode: boolean;

  game: any = {
    id: "",
    board: [[]]
  };
  
  gameNameToSave: string;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.gameService.newGame().subscribe(resp => {
      this.loadGame(resp);
    });
  }

  revealSquare(square: any) {
    if (!this.game.happy || square.opened || square.flag !== "NONE") return;

    this.gameService.revealSquare(this.game.id, square.row, square.col).subscribe(resp => {
      if (resp) {
        this.loadGame(resp);
      }
    });
  }

  flagSquare(event: any, square: any) {
    event.preventDefault();
    if (!this.game.happy || square.opened) return;

    this.gameService.flagSquare(this.game.id, square.row, square.col).subscribe(resp => {
      if (resp) {
        this.loadGame(resp);
      }
    });
  }

  saveGame() {
    if (!this.gameNameToSave) return;

    this.gameService.saveGame(this.game.id, this.gameNameToSave).subscribe(resp => {
      if (resp) {
        this.loadSavedGames.emit(resp);
        this.restartSaveMode();
      }
    });
  }

  loadGame(game: any) {
    if (game) {
      this.show = false;
      this.game = game;
      if (!this.game.happy) {
        this.restartSaveMode();
      }
      this.show = true;
    }
  }

  goToSaveMode() {
    if (this.game.happy) {
      this.saveMode = !this.saveMode;
    }
  }

  restartSaveMode() {
    this.saveMode = false;
    this.gameNameToSave = '';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.resumedGameId && changes.resumedGameId.currentValue) {
        this.gameService.getGame(changes.resumedGameId.currentValue).subscribe(resp => {
          this.loadGame(resp);
        });
    }
  }

}
