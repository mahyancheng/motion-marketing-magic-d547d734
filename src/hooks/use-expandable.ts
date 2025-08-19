import { useState } from "react";

export function useExpandable(initialState: boolean = false) {
  const [isExpanded, setIsExpanded] = useState(initialState);

  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  const expand = () => {
    setIsExpanded(true);
  };

  const collapse = () => {
    setIsExpanded(false);
  };

  return {
    isExpanded,
    toggleExpand,
    expand,
    collapse,
  };
}