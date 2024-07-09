"use client";

import { Button, Link, Stack, TextField } from "@mui/material";
import NextLink from "next/link";
import { useFormState } from "react-dom";
import createUser from "../../services/userService";

export default function Login() {
  const [state, formAction] = useFormState(createUser, { error: "" });

  return (
    <form action={formAction} className="w-full max-w-lg">
      <Stack
        spacing={4}
        sx={{ backgroundColor: "#2b2e30", borderRadius: "20px" }}
        className="p-6"
      >
        <h1 className="text-4xl pb-4 pt-4">Cadastro</h1>
        <div className="flex space-x-4">
          <TextField
            fullWidth
            name="firstName"
            label="Primeiro nome"
            variant="outlined"
          />
          <TextField
            fullWidth
            name="lastName"
            label="Sobrenome"
            variant="outlined"
          />
        </div>
        <TextField name="email" label="Email" variant="outlined" type="email" />
        <div className="flex space-x-4">
          <TextField
            fullWidth
            name="password"
            label="Senha"
            variant="outlined"
            type="password"
          />
          <TextField
            fullWidth
            name="passwordConfirmation"
            label="Confirmação de senha"
            variant="outlined"
            type="password"
          />
        </div>
        <Button type="submit" variant="contained">
          Finalizar cadastro
        </Button>
        <Link component={NextLink} href="/login" className="self-center">
          Já tem uma conta? Faça seu login!
        </Link>
      </Stack>
    </form>
  );
}
