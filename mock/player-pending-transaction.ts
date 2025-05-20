export const dataPlayerPendingTransaction = {
    "data": [
        {
            "username": "JJ_kekesi",
            "dealer_id": "slotmania88",
            "game_name": "Vanilla Joss",
            "isBet": true,
            "round_id": "67bd72cef251ae29a500b2f9",
            "bet_date": "2025-02-25 14:36:14",
            "status": "unsettle",
            "bet": 36,
            "win": 0.3
        }
    ],
    "error": null
}

export interface PlayerPendingTransaction {
  data: PlayerPendingTransactionType[];
  error: null;
}

export interface PlayerPendingTransactionType {
  username: string;
  dealer_id: string;
  game_name: string;
  isBet: boolean;
  round_id: string;
  bet_date: string;
  status: string;
  bet: number;
  win: number;
}