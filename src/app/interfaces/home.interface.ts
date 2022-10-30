export enum COST_TYPES {
  QUOTED = 'Quoted',
  SCREENED = 'Screened',
}

export type CostTypes = COST_TYPES.QUOTED | COST_TYPES.SCREENED;

export enum TOTAL_TYPES {
  BASE = 'Base',
  EXCHANGED = 'Exchanged',
}

export type TotalTypes = TOTAL_TYPES.BASE | TOTAL_TYPES.EXCHANGED;

export interface Comments {
  tableIndex: number;
  rows: CommentsRows[];
}
export interface CommentsRows {
  rowIndex: number;
  toggled: boolean;
}

export const emptyQuotedCost = {
  daStage: '',
  persona: '',
  type: COST_TYPES.QUOTED,
  amount: 0,
};

export const emptyScreenedCost = {
  daStage: '',
  persona: '',
  type: COST_TYPES.SCREENED,
  amount: 0,
};
