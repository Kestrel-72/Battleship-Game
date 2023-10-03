import { ComputerPlayer } from "./computerPlayer.js";
import { Player } from "./player.js";
import { ShipsRandomizer } from "./shipsRandomizer.js";
import { Battlefield } from "./battlefieldBuilder.js";

export class Game {
   constructor(playerOneBoard) {
      this.player = new Player();
      this.player.board = playerOneBoard;
      console.log(this.player);
      this.computer = new ComputerPlayer();
      this.populateComputerBoard();
      this.isOver = false;
      this.winner = null;
      this.computer.board = new ShipsRandomizer();
      console.log(this.computer.board)
   }

   refresh() {
      let main = document.querySelector('main');
      main.innerHTML = '';

      this.renderPlayerOneDiv(main);
      this.renderComputerDiv(main);
   }

   populateBoards() {
      // this.populatePlayerBoard();
      this.populateComputerBoard();
   }

   populatePlayerBoard() {
      this.player.board.addShip([[0, 0], [0, 1], [0, 2]]);
      this.player.board.addShip([[2, 0], [2, 1], [2, 2]]);
      this.player.board.addShip([[4, 0], [4, 1], [4, 2]]);
      this.player.board.addShip([[4, 6], [4, 7], [4, 8]]);
   }

   populateComputerBoard() {
      this.computer.board.addShip([[0, 0], [0, 1], [0, 2]]);
      this.computer.board.addShip([[2, 0], [2, 1], [2, 2]]);
      this.computer.board.addShip([[4, 0], [4, 1], [4, 2]]);
      this.computer.board.addShip([[4, 6], [4, 7], [4, 8]]);
   }

   renderPlayerOneDiv(main) {
      let playerOneDiv = document.createElement('div');
      playerOneDiv.classList.add('player-div', 'player-one-div');
      let playerBattlefield = new Battlefield(this.player.board.gameboard, 'Game(Player)');
      playerOneDiv.appendChild(playerBattlefield);
      main.appendChild(playerOneDiv);
   }

   renderComputerDiv(main) {
      let computerDiv = document.createElement('div');
      computerDiv.classList.add('player-div', 'player-two-div');
      let computerBattlefield = new Battlefield(this.computer.board.gameboard, 'Game(Computer)');
      computerBattlefield.addEventListener('click', (e) => {
         console.log(e.target.parentNode);
         if (!e.target.parentNode.classList.contains('cell')) return;
         let coords = [e.target.parentNode.dataset.row, e.target.parentNode.dataset.column];
         this.playerTurn(coords);
      })
      computerDiv.appendChild(computerBattlefield);
      main.appendChild(computerDiv);
   }

   computerTurn() {
      let main = document.querySelector('main');
      let hit = this.computer.makeTurn(this.player);
      if (hit) {
         this.checkGameOver();
         main.classList.add('disabled');
         setTimeout(() => {
            this.computerTurn()
         }, 500);
      } else {
         main.classList.remove('disabled');
      }

      this.refresh();
   }

   playerTurn(coords) {
      let hit = this.player.attack(coords, this.computer);
      if (hit) {
         this.checkGameOver();
      } else {
         this.computerTurn();
      }

      this.refresh();
   }

   removePlayerBoard() {
      if(document.querySelector('.player-board')) {
         document.querySelector('.player-board').remove();
      }
   }

   removeComputerBoard() {
      if(document.querySelector('.computer-board')) {
         document.querySelector('.computer-board').remove();
      }
   }

   checkGameOver() {
      this.player.checkBoard();
      this.computer.checkBoard();
      if (this.player.hasLost) {
         this.winner = this.computer;
      }
      if (this.computer.hasLost) {
         this.winner = this.player;
      }
      if (this.player.hasLost || this.computer.hasLost) {
         console.log(this.winner.name + ' won!');
         this.isOver = true;
         let main = document.querySelector('main');
         main.classList.add('disabled');
      }
   }

}