import { TextFieldProps } from "@mui/material";
import React, { useReducer } from "react";

interface action {
  type: "SET_VALUE";
  value: string;
}

const reducer: React.Reducer<TextFieldProps, action> = (state, action) => {
  switch (action.type) {
    case "SET_VALUE": {
      return {
        ...state,
        value: action.value,
      };
    }
    default:
      throw new Error("useTextFieldProps에 정의되지 않은 action type입니다!");
  }
};

export const useTextFieldProps = (initialState: TextFieldProps) => {
  return useReducer(reducer, initialState);
};
