import { Button, Link, Stack, TextField } from "@mui/material";
import NextLink from "next/link";

export default function Login() {
  return (
    <Stack
      spacing={4}
      className="w-full max-w-lg p-6"
      sx={{ backgroundColor: "#2b2e30", borderRadius: "20px" }}
    >
      <h1 className="text-4xl pb-4 pt-4">Login</h1>
      <TextField label="Email" variant="outlined" type="email" />
      <TextField label="Senha" variant="outlined" type="password" />
      <Button variant="contained">Login</Button>
      <Link component={NextLink} href="/signup" className="self-center">
        Não tem um login? Faça seu cadastro!
      </Link>
    </Stack>
  );
}
