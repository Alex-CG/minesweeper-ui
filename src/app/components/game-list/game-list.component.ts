import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  @Input() savedGames: any[] = [];
  @Output() resumeNow = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  show = false;

  constructor() { }

  ngOnInit(): void {
  }

  resumeGame(game: any): void {
    this.resumeNow.emit(game.id);
  }

  deleteGame(game: any): void {
    this.delete.emit(game.id);
  }

}
