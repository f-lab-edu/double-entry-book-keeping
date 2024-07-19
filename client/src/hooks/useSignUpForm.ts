import { TextFieldProps } from "@mui/material";
import { useTextFieldProps } from "./inputs/useTextFieldProps";

export const useSignUpForm: () => {
  idProps: TextFieldProps;
  password1Props: TextFieldProps;
  password2Props: TextFieldProps;
} = () => {
  const [idState, idDispatch] = useTextFieldProps({
    value: "",
  });
  const [password1State, password1Dispatch] = useTextFieldProps({
    value: "",
  });
  const [password2State, password2Dispatch] = useTextFieldProps({
    value: "",
  });

  const onChangeId: TextFieldProps["onChange"] = ({ target: { value } }) => {
    idDispatch({
      type: "SET_VALUE",
      value,
    });
  };

  const onChangePassword1: TextFieldProps["onChange"] = ({
    target: { value },
  }) => {
    password1Dispatch({
      type: "SET_VALUE",
      value,
    });
  };

  const onChangePassword2: TextFieldProps["onChange"] = ({
    target: { value },
  }) => {
    password2Dispatch({
      type: "SET_VALUE",
      value,
    });
  };

  return {
    idProps: {
      ...idState,
      onChange: onChangeId,
    },
    password1Props: {
      ...password1State,
      onChange: onChangePassword1,
    },
    password2Props: {
      ...password2State,
      onChange: onChangePassword2,
    },
  };
};
