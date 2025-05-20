import React from 'react';
import { ArrowDownZA, ArrowUpAZ, ArrowUpDown } from "lucide-react";

const ButtonSort = ({ sortType }: { sortType: string | boolean }) => {
  const icons = {
    asc: <ArrowUpAZ />,
    desc: <ArrowDownZA />,
    default: <ArrowUpDown />,
  };

  return icons[sortType as keyof typeof icons] || icons.default;
};

export default ButtonSort;