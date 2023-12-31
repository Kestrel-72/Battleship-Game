import { Cell } from "./cell.js";
import { Ship } from "./ship.js";

export class Gameboard {
   constructor() {
      this.rows = 10;
      this.columns = 10;
      this.shipsList = [];
      this.gameboard = [];
      this.allSunk = false;
      for (let i = 0; i < this.rows; i++) {
         let row = [];
         for (let j = 0; j < this.columns; j++) {
            row.push(new Cell);
         }
         this.gameboard.push(row);
      }
   }

   addShip(coords) {
      let newShip = new Ship(coords.length);
      coords.forEach(coord => {
         this.gameboard[coord[0]][coord[1]].ship = newShip;
      })
      this.shipsList.push(newShip);
   }

   receiveHit(coord) {
      this.gameboard[coord[0]][coord[1]].isHit = true;
      if (this.gameboard[coord[0]][coord[1]].ship != null) {
         this.gameboard[coord[0]][coord[1]].ship.hit();
         this.checkIfAllSunk();
         return true;
      } 
      return false;
   }

   checkIfAllSunk() {
      let allSunk = true;
      this.shipsList.forEach(ship => {
         if (ship.isSunk == false) allSunk = false;
      });
      if (allSunk) this.allSunk = true;
   }

}