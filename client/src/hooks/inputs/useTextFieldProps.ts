import { TextFieldProps } from "@mui/material";
import React, { useReducer } from "react";

export type ModifiedTextFieldProps = TextFieldProps & {
  value: string;
};

type action =
  | {
      type: "SET_VALUE";
      value: string;
    }
  | {
      type: "SET_ERROR_MESSAGE";
      helperText: string;
    }
  | {
      type: "CLEAR_ERROR";
    };

const reducer: React.Reducer<ModifiedTextFieldProps, action> = (
  state,
  action
) => {
  switch (action.type) {
    case "SET_VALUE": {
      return {
        ...state,
        value: action.value,
      };
    }
    case "SET_ERROR_MESSAGE":
      return {
        ...state,
        error: true,
        helperText: action.helperText,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: false,
        helperText: "",
      };
  }
};

export const useTextFieldProps = (initialState: ModifiedTextFieldProps) => {
  return useReducer(reducer, initialState);
};
