import { TextFieldProps } from "@mui/material";
import { useTextFieldProps } from "./inputs/useTextFieldProps";

export const useSignInForm: () => {
  idProps: TextFieldProps;
  passwordProps: TextFieldProps;
} = () => {
  const [idState, idDispatch] = useTextFieldProps({
    value: "",
  });
  const [passwordState, passwordDispatch] = useTextFieldProps({
    value: "",
  });

  const onChangeId: TextFieldProps["onChange"] = ({ target: { value } }) => {
    idDispatch({
      type: "SET_VALUE",
      value,
    });
  };

  const onChangePassword: TextFieldProps["onChange"] = ({
    target: { value },
  }) => {
    passwordDispatch({
      type: "SET_VALUE",
      value,
    });
  };

  return {
    idProps: {
      ...idState,
      onChange: onChangeId,
    },
    passwordProps: {
      ...passwordState,
      onChange: onChangePassword,
    },
  };
};
