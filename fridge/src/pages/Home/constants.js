export const GRID_COLUMN_FIELD_NAME_NAME = "name";
export const GRID_COLUMN_FIELD_NAME_BEST_BEFORE = "bestBefore";
export const GRID_COLUMN_FIELD_NAME_SLIDER = "slider";
export const GRID_COLUMN_FIELD_NAME_FULL_AMOUNT = "fullAmount";
export const GRID_COLUMN_FIELD_NAME_AMOUNT_TYPE = "amountType";

export const GRID_COLUMN_HEADER_TITLE_NAME = "Grocery";
export const GRID_COLUMN_HEADER_TITLE_BEST_BEFORE = "Best before";
export const GRID_COLUMN_HEADER_TITLE_SLIDER = "Amount left";
export const GRID_COLUMN_HEADER_TITLE_FULL_AMOUNT = "Full amount";
export const GRID_COLUMN_HEADER_TITLE_AMOUNT_TYPE = "Amount type";

export const DATE_FORMAT = "YYYY-MM-DD";

export const GROCERIES_TABLE_COLUMNS = [
  {
    field: GRID_COLUMN_FIELD_NAME_NAME,
    headerName: GRID_COLUMN_HEADER_TITLE_NAME,
    flex: 1,
    disableClickEventBubbling: true,
  },
  {
    field: GRID_COLUMN_FIELD_NAME_BEST_BEFORE,
    headerName: GRID_COLUMN_HEADER_TITLE_BEST_BEFORE,
    flex: 1,
    disableClickEventBubbling: true,
  },
  {
    field: GRID_COLUMN_FIELD_NAME_FULL_AMOUNT,
    headerName: GRID_COLUMN_HEADER_TITLE_FULL_AMOUNT,
    flex: 1,
    disableClickEventBubbling: true,
  },
  {
    field: GRID_COLUMN_FIELD_NAME_AMOUNT_TYPE,
    headerName: GRID_COLUMN_HEADER_TITLE_AMOUNT_TYPE,
    flex: 1,
    disableClickEventBubbling: true,
  },
];
