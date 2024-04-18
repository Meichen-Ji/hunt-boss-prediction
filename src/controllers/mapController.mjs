import { MapPiece } from '../models/mapPiece.mjs';

const NUM_MAPS = 3;
const NUM_PIECES_PER_MAP = 16;

export const mapController = {
  getMap: (req, res) => {
    const mapNumber = req.params.mapNumber;
    if (mapNumber < 1 || mapNumber > NUM_MAPS) {
      res.status(404).send('Map not found');
      return;
    }
    const mapPieces = [];
    for (let i = 1; i <= NUM_PIECES_PER_MAP; i++) {
      const pieceId = `SB${i.toString().padStart(2, '0')}`;
      const piece = new MapPiece(pieceId, `/images/map${mapNumber}/${pieceId}.png`);
      mapPieces.push(piece);
    }
    res.render('map', { mapNumber, mapPieces});
  }
};
