import { IconButton, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { idType } from "./EditComp";
import { jsonPlaceHolderApi } from "../services/jsonPlaceHolderApi";
import DeleteIcon from "@mui/icons-material/Delete";

function DeleteComp({ idRequired }: idType) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [deletePost] = jsonPlaceHolderApi.useDeletePostMutation();

  const handleDeletePost = async () => {
    try {
      await deletePost(idRequired);
    } catch (err) {
      console.error("Failed to Delete Post", err);
      alert("Something is wrong");
    }
  };

  return (
    <React.Fragment>
      <IconButton size="small" onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        sx={{
          "& .MuiDialog-paper": {
            width: "auto",
            maxWidth: "none",
            height: "auto",
            maxHeight: "100%",
            backgroundColor: "#FFFFFF",
            padding: "18px",
            display: "inline-block",
          },
          "& .MuiBackdrop-root": {
            backgroundColor: "#FFFFFFE0",
          },
        }}
      >
        <DialogTitle
          id="responsive-dialog-title"
          sx={{
            fontStyle: "Noto Sans",
            fontWeight: "500",
            fontSize: "20px",
            color: "#000000",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {"Delete Form"}
        </DialogTitle>
        <DialogContent sx={{ overflow: "hidden" }}>
          <DialogContentText>
            <Typography
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontStyle: "Noto Sans",
                fontWeight: "400",
                fontSize: "16px",
                color: "#000000",
              }}
            >
              Are you sure you want to delete this workspace
            </Typography>
            <Typography
              sx={{
                fontStyle: "Noto Sans",
                fontWeight: "400",
                fontSize: "14px",
                color: "#5C5C5C",
              }}
            >
              This Action Cannot be Reversed
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#19234B",
              fontStyle: "Noto Sans",
              fontWeight: "500",
              fontSize: "12px",
              color: "#FFFFFF",
            }}
            fullWidth
            onClick={handleDeletePost}
          >
            DELETE
          </Button>
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #000000",
              fontStyle: "Noto Sans",
              fontWeight: "500",
              fontSize: "12px",
              color: "#000000DE",
            }}
            fullWidth
          >
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export default DeleteComp;
