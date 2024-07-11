"use client";

import { login } from "@/app/common/services/authService";
import { Alert, Button, Link, Stack, TextField } from "@mui/material";
import NextLink from "next/link";
import { useFormState } from "react-dom";

export default function Login() {
  const [state, formAction] = useFormState(login, { error: [] });

  return (
    <form action={formAction} className="w-full max-w-lg">
      {state.error.map((errorMessage: string, index: number) => (
        <Alert key={index} severity="error" className="mb-3">
          {errorMessage}
        </Alert>
      ))}
      <Stack
        spacing={4}
        className="p-6"
        sx={{ backgroundColor: "#2b2e30", borderRadius: "20px" }}
      >
        <h1 className="text-4xl pb-4 pt-4">Login</h1>
        <TextField name="email" label="Email" variant="outlined" type="email" />
        <TextField
          name="password"
          label="Senha"
          variant="outlined"
          type="password"
        />
        <Button type="submit" variant="contained">
          Login
        </Button>
        <Link component={NextLink} href="/signup" className="self-center">
          Não tem um login? Faça seu cadastro!
        </Link>
      </Stack>
    </form>
  );
}
