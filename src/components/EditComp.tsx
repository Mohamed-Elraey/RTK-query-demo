import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Stack, TextField } from "@mui/material";
import { jsonPlaceHolderApi } from "../services/jsonPlaceHolderApi";
import EditIcon from "@mui/icons-material/Edit";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface idType {
  idRequired: number;
}

export interface editProps {
  idRequired: number;
  body: string;
  title: string;
}

export default function EditComp({ idRequired, body, title }: editProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [updatedPost, setUpdatedPost] = React.useState({
    title: "",
    body: "",
    userId: 1,
    id: idRequired,
  });

  const handleUpdateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedPost({ ...updatedPost, title: e.target.value });
  };
  const handleUpdateContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedPost({ ...updatedPost, body: e.target.value });
  };

  const [updatePost] = jsonPlaceHolderApi.useUpdatePostMutation();

  const handleUpdatePost = async () => {
    try {
      await updatePost(updatedPost).unwrap();
      setUpdatedPost({ ...updatedPost, title: "", body: "" });
      handleClose();
    } catch (error) {
      console.error("Failed to update Post", error);
      alert("Something is wrong");
    }
  };

  return (
    <React.Fragment>
      <IconButton size="small" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            width: "820px",
            height: "640px",
            maxWidth: "100%",
            maxHeight: "100%",
            backgroundColor: "#FFFFFF",
          },
          "& .MuiBackdrop-root": {
            backgroundColor: "#FFFFFFE0",
          },
        }}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            backgroundColor: "#19234B",
            color: "#FFFFFF",
            textAlign: "center",
          }}
          id="customized-dialog-title"
        >
          EDIT
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers>
          <Stack spacing={2} margin={2}>
            <TextField
              variant="outlined"
              label="Name"
              onChange={handleUpdateName}
              value={title}
            ></TextField>
            <TextField
              variant="outlined"
              label="content"
              multiline
              rows={12}
              onChange={handleUpdateContent}
              value={body}
            ></TextField>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ alignContent: "center" }}>
          <Button
            sx={{ spacing: "20px", margin: "20px", backgroundColor: "#19234B" }}
            variant="contained"
            fullWidth
            onClick={handleUpdatePost}
          >
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
