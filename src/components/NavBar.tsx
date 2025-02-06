import "../styles/NavBar.css";

import SearchIcon from "@mui/icons-material/Search";
import { Button, Stack, TextField } from "@mui/material";
import CreatePostComp from "./CreatePostComp";
import { useState } from "react";
import { jsonPlaceHolderApi } from "../services/jsonPlaceHolderApi";

const NavBar = () => {
  const [singlePost, setSinglePost] = useState<number | null>(null);

  const [getPost] = jsonPlaceHolderApi.useLazyGetOnePostQuery();
  const [refetch] = jsonPlaceHolderApi.useLazyGetPostsQuery();

  const handleUserEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSinglePost(Number(event.target.value));
  };

  const handleSinglePost = () => {
    if (!singlePost) {
      refetch();
    } else {
      getPost(singlePost);
    }
  };

  return (
    <div
      style={{
        padding: "16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* <Stack direction={"row"} justifyContent={"space-between"}> */}
      <CreatePostComp />
      <Stack direction={"row"} spacing={1.5}>
        <TextField
          placeholder="Search by ID"
          type="number"
          variant="outlined"
          size="small"
          sx={{ width: "200px", marginRight: "12px" }}
          onChange={handleUserEvent}
        />
        <Button
          size="small"
          variant="contained"
          sx={{
            // paddingTop: "8px",
            // paddingLeft: "16px",
            // paddingRight: "16px",
            // paddingBottom: "8px",
            backgroundColor: "#19234B",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={handleSinglePost}
        >
          <SearchIcon />
        </Button>
      </Stack>
    </div>
    // </Stack>
  );
};

export default NavBar;
