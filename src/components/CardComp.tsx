import "../styles/CardComp.css";
import EditComp from "./EditComp";
import DeleteComp from "./DeleteComp";

import { Card, CardContent, Typography, Box, Stack } from "@mui/material";

interface cardProps {
  title: string;
  id: number;
  body: string;
}

export default function CardComp({ title, id, body }: cardProps) {
  const idToEditComp = id;
  return (
    <Card
      sx={{
        minWidth: 275,
        padding: "16px",
        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.25)",
      }}
      className="h-100 cardHover"
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ marginBottom: "16px" }}
        >
          <Typography sx={{ marginRight: "8px" }}>{id}</Typography>

          <Typography
            sx={{
              fontFamily: "Roboto Slab",
              fontWeight: "800",
              fontSize: "18px",
              color: "#000000",
            }}
          >
            {title}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <EditComp
              idRequired={idToEditComp}
              body={body}
              title={title}
            ></EditComp>

            <DeleteComp idRequired={idToEditComp}></DeleteComp>
          </Box>
        </Stack>

        <Box sx={{ marginTop: "16px" }}>
          <Typography sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {body}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
