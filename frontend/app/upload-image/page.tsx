"use client";

import {
  Button,
  Grid,
  makeStyles,
  Paper,
  styled,
  TextField,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function UploadImage() {
  return (
    <div className="pt-5">
      <Grid container spacing={2} className="flex flex-start justify-center">
        <Grid item xs={12}>
          <Item className="pb-10">
            <h1 className="text-xl pb-4 pt-2">Enviar Imagem</h1>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload
              <VisuallyHiddenInput type="file" />
            </Button>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <h1 className="text-xl pb-4 pt-2">Transcrição</h1>
            <TextField
              fullWidth
              variant="outlined"
              multiline
              inputProps={{ style: { resize: "both" } }}
              disabled
            />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <h1 className="text-xl pb-4 pt-2">Resumo</h1>
            <TextField
              fullWidth
              variant="outlined"
              multiline
              inputProps={{ style: { resize: "both" } }}
              disabled
            />
          </Item>
        </Grid>
      </Grid>
    </div>
  );
}
