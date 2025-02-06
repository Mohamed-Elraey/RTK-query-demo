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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { jsonPlaceHolderApi } from "../services/jsonPlaceHolderApi";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const CreatePostComp = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [createPost] = jsonPlaceHolderApi.useCreatePostMutation();

  const [newPost, setNewPost] = React.useState({
    title: "",
    body: "",
    userId: 1,
    id: 1,
  });

  const handleCreateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPost({ ...newPost, title: e.target.value });
  };

  const handleCreateContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPost({ ...newPost, body: e.target.value });
  };

  const handleCreatePost = async () => {
    try {
      await createPost(newPost).unwrap();
      setNewPost({ ...newPost, title: "", body: "" });
      handleClose();
    } catch (err) {
      console.error("Failed to create post", err);
      alert("Something is wrong");
    }
  };

  return (
    <React.Fragment>
      <Button
        size="small"
        variant="contained"
        startIcon={<AddCircleOutlineIcon />}
        sx={{
          color: "#fff",
          paddingTop: "8px",
          paddingLeft: "16px",
          paddingRight: "16px",
          paddingBottom: "8px",
          backgroundColor: "#19234B",
        }}
        onClick={handleClickOpen}
      >
        create post
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            width: "620px",
            height: "440px",
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
          Create Form
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
              onChange={handleCreateName}
            ></TextField>
            <TextField
              variant="outlined"
              label="content"
              multiline
              rows={4}
              onChange={handleCreateContent}
            ></TextField>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ alignContent: "center" }}>
          <Button
            sx={{ spacing: "20px", margin: "20px", backgroundColor: "#19234B" }}
            variant="contained"
            fullWidth
            onClick={handleCreatePost}
          >
            Create
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default CreatePostComp;
