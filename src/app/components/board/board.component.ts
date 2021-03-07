import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  show = true;
  board = {
    id: "",
    matrix: [[]]
  };

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.gameService.newGame().subscribe(resp => {
      this.updateBoard(resp);
    });
  }

  revealSquare(square: any) {
    if (square.openned || square.flag !== "NONE") return;

    this.gameService.revealSquare(this.board.id, square.row, square.col).subscribe(resp => {
      if (resp) {
        this.updateBoard(resp);
      }
    });
  }

  flagSquare(event: any, square: any) {
    event.preventDefault();
    if (square.openned) return;

    this.gameService.flagSquare(this.board.id, square.row, square.col).subscribe(resp => {
      if (resp) {
        this.updateBoard(resp);
      }
    });
  }

  updateBoard(board: any) {
    if (board) {
      this.show = false;
      this.board = board;
      this.show = true;
    }
  }

}
