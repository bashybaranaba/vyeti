import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function TotalsCard({ value, label }) {
  return (
    <div>
      <Card elevation={3} sx={{ m: 2 }}>
        <CardContent>
          <Typography gutterBottom>{label}</Typography>
          <Box sx={{ display: "flex" }}>
            <Typography variant="h4" sx={{ color: "#009688" }}>
              {value}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}
