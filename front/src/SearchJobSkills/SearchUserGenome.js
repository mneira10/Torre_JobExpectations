import React from "react";
import { TextField, Card, CardContent, Box, Typography, Button } from "@material-ui/core";

export default function SearchUserGenome(props) {
  return (
    <Card>
      <CardContent>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="subtitle1" align={"center"}>
            Compare the industry required skills with your Torre Genome
          </Typography>
          <Box m={2}>
            <TextField
              size="medium"
              variant="filled"
              label="Genome username"
              onChange={(e) => props.setUsername(e.target.value)}
            />
            {/* <SearchUserGenome
              username={genomeUsername}
              setUsername={setGenomeUsername}
            /> */}
          </Box>
          <Box m={1}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => props.setCompare(true)}
            >
              Search
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
