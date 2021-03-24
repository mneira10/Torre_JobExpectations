import React from "react";
import { TextField } from "@material-ui/core";

export default function SearchUserGenome(props) {
  return (
    <div>
      <TextField
        size="medium"
        variant="filled"
        label="Genome username"
        onChange={(e) => props.setUsername(e.target.value)}
      />
    </div>
  );
}
