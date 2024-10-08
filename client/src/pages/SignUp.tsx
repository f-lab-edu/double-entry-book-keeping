import {
  Avatar,
  Box,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useSignUpForm } from "../hooks/useSignUpForm";
import { useRedirectToMainIfAuthenticated } from "../hooks/utils/useRedirectToMainIfAuthenticated";

export const SignUp = () => {
  const { idProps, password1Props, password2Props, onClickSubmitButton } =
    useSignUpForm();

  const { isLoading } = useRedirectToMainIfAuthenticated();

  if (isLoading) return <>로딩중입니다...</>;

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        회원가입
      </Typography>
      <Box component="form" noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="아이디"
              autoFocus
              {...idProps}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="비밀번호"
              type="password"
              {...password1Props}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="비밀번호 확인"
              type="password"
              {...password2Props}
            />
          </Grid>
        </Grid>
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={onClickSubmitButton}
        >
          가입하기
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/sign-in" variant="body2">
              로그인
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
