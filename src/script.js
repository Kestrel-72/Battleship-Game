import { Cell } from './cell.js';
import { Ship } from './ship.js';
import { Gameboard } from './gameboard.js';
import { Player } from './player.js';
import { ComputerPlayer } from './computerPlayer.js';
import { Game } from './game.js';

let game = new Game();
game.populateBoards();
game.refresh();

export { Ship, Cell, Gameboard, Player, ComputerPlayer };