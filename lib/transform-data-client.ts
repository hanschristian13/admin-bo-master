interface ParentData {
  new_register_player: number;
  active_player: number;
  dealer_id: string;
  turnover: number;
  win_player: number;
  profit: number;
  // ... properti lain yang mungkin ada
}

interface TransformedData {
  date: string;
  parentId: string;
  new_register_player: number;
  active_player: number;
  dealer_id: string;
  turnover: number;
  win_player: number;
  profit: number;
  // ... properti lain yang mungkin ada
}

export const TransformDataClient = (data: Record<string, Record<string, ParentData>>): TransformedData[] => {
  const result: TransformedData[] = [];
  for (const date in data) {
    if (data.hasOwnProperty(date)) {
      const parentData = data[date];
      for (const parentId in parentData) {
        if (parentData.hasOwnProperty(parentId)) {
          const item = parentData[parentId];
          result.push({
            date,
            parentId,
            ...item,
          });
        }
      }
    }
  }
  return result;
};