import {
  ModifiedTextFieldProps,
  useTextFieldProps,
} from "./inputs/useTextFieldProps";
import { useSignUpMutation } from "./mutations/useSignUpMutation";
import { useNavigate } from "react-router-dom";

export const useSignUpForm: () => {
  idProps: ModifiedTextFieldProps;
  password1Props: ModifiedTextFieldProps;
  password2Props: ModifiedTextFieldProps;
  onClickSubmitButton: () => void;
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

  const onChangeId: ModifiedTextFieldProps["onChange"] = ({
    target: { value },
  }) => {
    idDispatch({
      type: "SET_VALUE",
      value,
    });
  };

  const onChangePassword1: ModifiedTextFieldProps["onChange"] = ({
    target: { value },
  }) => {
    password1Dispatch({
      type: "SET_VALUE",
      value,
    });
  };

  const onChangePassword2: ModifiedTextFieldProps["onChange"] = ({
    target: { value },
  }) => {
    password2Dispatch({
      type: "SET_VALUE",
      value,
    });
  };

  const navigate = useNavigate();

  const { mutate } = useSignUpMutation({
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      if (error.response?.data?.statusCode === 409) {
        idDispatch({
          type: "SET_ERROR_MESSAGE",
          helperText: error.response.data.message,
        });
        password1Dispatch({
          type: "CLEAR_ERROR",
        });
        password2Dispatch({
          type: "CLEAR_ERROR",
        });
      } else {
        alert(error);
      }
    },
  });

  const onClickSubmitButton = () => {
    const isIdEmpty = idState.value === "";

    const isPassword1Empty = password1State.value === "";

    const isPassword2Empty = password2State.value === "";

    const arePasswordsDifferent = password1State.value !== password2State.value;

    if (isIdEmpty) {
      idDispatch({
        type: "SET_ERROR_MESSAGE",
        helperText: "아이디를 입력해주세요",
      });
    } else {
      idDispatch({
        type: "CLEAR_ERROR",
      });
    }

    if (isPassword1Empty) {
      password1Dispatch({
        type: "SET_ERROR_MESSAGE",
        helperText: "비밀번호를 입력해주세요.",
      });
    } else {
      password1Dispatch({
        type: "CLEAR_ERROR",
      });
    }

    if (isPassword2Empty) {
      password2Dispatch({
        type: "SET_ERROR_MESSAGE",
        helperText: "비밀번호 확인값을 입력해주세요.",
      });
    } else if (arePasswordsDifferent) {
      password2Dispatch({
        type: "SET_ERROR_MESSAGE",
        helperText: "비밀번호 확인값이 비밀번호와 다릅니다.",
      });
    } else {
      password2Dispatch({
        type: "CLEAR_ERROR",
      });
    }

    const shouldSubmit =
      !isIdEmpty &&
      !isPassword1Empty &&
      !isPassword2Empty &&
      !arePasswordsDifferent;

    if (shouldSubmit) {
      mutate({
        id: idState.value,
        password: password1State.value,
      });
    }
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
    onClickSubmitButton,
  };
};
