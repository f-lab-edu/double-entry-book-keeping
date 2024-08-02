import { CheckboxProps } from "@mui/material";
import { useReducer } from "react";

interface action {
  type: "SET_CHECKED";
  checked: boolean;
}

const reducer: React.Reducer<CheckboxProps, action> = (state, action) => {
  switch (action.type) {
    case "SET_CHECKED":
      return {
        ...state,
        checked: action.checked,
      };
    default:
      throw new Error("useCheckboxProps에 정의되지 않은 action type입니다!");
  }
};

export const useCheckboxProps = (initialState: CheckboxProps) => {
  return useReducer(reducer, initialState);
};
