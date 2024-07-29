import { TextFieldProps } from "@mui/material";
import { useTextFieldProps } from "./inputs/useTextFieldProps";
import { useSignInMutation } from "./mutations/useSignInMutation";
import { useNavigate } from "react-router-dom";

export const useSignInForm: () => {
  idProps: TextFieldProps;
  passwordProps: TextFieldProps;
  onClickSubmitButton: () => void;
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

  const navigate = useNavigate();

  const { mutate } = useSignInMutation({
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      if (error.response?.data?.statusCode === 404) {
        idDispatch({
          type: "SET_ERROR_MESSAGE",
          helperText: error.response.data.message,
        });
        passwordDispatch({
          type: "CLEAR_ERROR",
        });
      } else if (error.response?.data?.statusCode === 401) {
        idDispatch({
          type: "CLEAR_ERROR",
        });
        passwordDispatch({
          type: "SET_ERROR_MESSAGE",
          helperText: error.response.data.message,
        });
      }
    },
  });

  const onClickSubmitButton = () => {
    const isIdEmpty = idState.value === "";

    const isPasswordEmpty = passwordState.value === "";

    if (isIdEmpty) {
      idDispatch({
        type: "SET_ERROR_MESSAGE",
        helperText: "아이디를 입력해주세요.",
      });
    } else {
      idDispatch({
        type: "CLEAR_ERROR",
      });
    }

    if (isPasswordEmpty) {
      passwordDispatch({
        type: "SET_ERROR_MESSAGE",
        helperText: "비밀번호를 입력해주세요.",
      });
    } else {
      passwordDispatch({
        type: "CLEAR_ERROR",
      });
    }

    const shouldSubmit = !isIdEmpty && !isPasswordEmpty;

    if (shouldSubmit) {
      mutate({
        id: idState.value,
        password: passwordState.value,
      });
    }
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
    onClickSubmitButton,
  };
};
