import { Button, Divider, Link, Stack, TextField } from "@mui/material";
import NextLink from "next/link";

export default function Login() {
  return (
    <Stack
      spacing={4}
      className="w-full max-w-lg p-6"
      sx={{ backgroundColor: "#2b2e30", borderRadius: "20px" }}
    >
      <h1 className="text-4xl pb-4 pt-4">Cadastro</h1>
      <div className="flex space-x-4">
        <TextField label="Primeiro nome" variant="outlined" />
        <TextField label="Sobrenome" variant="outlined" />
      </div>
      <TextField label="Email" variant="outlined" type="email" />
      <div className="flex space-x-4">
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
    </Stack>
  );
}
