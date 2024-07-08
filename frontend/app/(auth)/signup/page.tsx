import { Button, Link, Stack, TextField } from "@mui/material";
import NextLink from "next/link";

export default function Login() {
  <Stack spacing={4} className="w-full max-w-xs">
    <div>
      <TextField label="Primeiro nome" variant="outlined" />
      <TextField label="Sobrenome" variant="outlined" />
    </div>
    <TextField label="Email" variant="outlined" type="email" />
    <div>
      <TextField label="Senha" variant="outlined" type="password" />
      <TextField
        label="Confirmação de senha"
        variant="outlined"
        type="password"
      />
    </div>
    <Button variant="contained">Finalizar cadastro</Button>
    <Link component={NextLink} href="/login" className="self-center">
      Já tem uma conta? Faça seu login!
    </Link>
  </Stack>;
}
