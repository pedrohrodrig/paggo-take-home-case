import { Button, Link, Stack, TextField } from "@mui/material";
import NextLink from "next/link";

export default function Login() {
  <Stack spacing={4} className="w-full max-w-xs">
    <TextField label="Email" variant="outlined" type="email" />
    <TextField label="Senha" variant="outlined" type="password" />
    <Button variant="contained">Login</Button>
    <Link component={NextLink} href="/signup" className="self-center">
      Não tem um login? Faça seu cadastro!
    </Link>
  </Stack>;
}
