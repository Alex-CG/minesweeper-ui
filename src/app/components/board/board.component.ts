import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  board = {
    matrix: [[]]
  };

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.newGame().subscribe(resp => {
      if (resp) {
        this.board = resp;
      }
    });
  }

}
