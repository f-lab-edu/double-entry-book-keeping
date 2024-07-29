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
import { useSignInForm } from "../hooks/useSignInForm";
import { useRedirectToMainIfAuthenticated } from "../hooks/utils/useRedirectToMainIfAuthenticated";

export const SignIn = () => {
  const { idProps, passwordProps } = useSignInForm();

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
        로그인
      </Typography>
      <Box component="form" onSubmit={() => {}} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="아이디"
          autoFocus
          {...idProps}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="비밀번호"
          type="password"
          {...passwordProps}
        />
        {/* <FormControlLabel
          control={<Checkbox color="primary" />}
          label="로그인 유지"
        /> */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
          }}
        >
          로그인
        </Button>
        <Grid container>
          <Grid item xs />
          <Grid item>
            <Link href="/sign-up" variant="body2">
              회원가입
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
