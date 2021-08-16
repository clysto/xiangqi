import { Game } from './game';
import { GameCanvas } from './canvas';
import './style.css';

const game = new Game();
new GameCanvas('#app', game);
