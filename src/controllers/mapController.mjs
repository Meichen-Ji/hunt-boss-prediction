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

    let mapName = '';
    let piecePrefix = '';
    if (mapNumber === '1') {
      mapName = 'Stillwater Bayou';
      piecePrefix = 'SB';
    } else if (mapNumber === '2') {
      mapName = 'Lawson Delta';
      piecePrefix = 'LD';
    } else if (mapNumber === '3') {
      mapName = 'DeSalle';
      piecePrefix = 'DS';
    }

    const mapPieces = [];
    for (let i = 0; i < NUM_PIECES_PER_MAP; i++) {
      const pieceId = `${piecePrefix}${i.toString().padStart(2, '0')}`;
      const piece = new MapPiece(pieceId, `/images/map${mapNumber}_${piecePrefix}/${pieceId}.png`);
      mapPieces.push(piece);
    }
    
    res.render('map', { mapNumber, mapName, mapPieces});
  }
};
