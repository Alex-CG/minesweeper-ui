import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  @Input() savedGames: any[] = [];
  @Output() resume = new EventEmitter<string>();

  show = false;

  constructor() { }

  ngOnInit(): void {
  }

  resumeGame(game: any) {
    this.resume.emit(game.id);
  }

}
