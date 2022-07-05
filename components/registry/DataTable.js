import React from "react";
import Container from "@mui/material/Container";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const columns = [
  { headerName: "ID", field: "id", width: 200 },
  { headerName: "Title", field: "title", width: 200 },
  { headerName: "Issued to", field: "issued_to", width: 200 },
  { headerName: "Programme", field: "programme", width: 200 },
  { headerName: "Institution", field: "institution", width: 200 },
  { headerName: "Token ID", field: "tokenId", width: 100 },
  {
    field: "link",
    headerName: "",
    width: 50,
    renderCell: (params) => (
      <a
        style={{ textDecoration: "none", color: "#4D776D" }}
        href={`/credentials/${params.value}`}
      >
        View
      </a>
    ),
  },
];

function createData(
  id,
  title,
  issued_to,
  programme,
  institution,
  tokenId,
  link
) {
  return { id, title, issued_to, programme, institution, tokenId, link };
}

export default function DataTable({ credentials }) {
  const rows = credentials.map((credential) =>
    createData(
      credential._id,
      credential.title,
      credential.issued_to.name,
      credential.programme.programme_name,
      credential.institution.institution_name,
      credential.tokenId,
      credential.tokenId
    )
  );
  return (
    <div style={{ height: 550, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        components={{
          Toolbar: GridToolbar,
        }}
        rowsPerPageOptions={[10, 20, 30, 50, 100]}
        pagination
      />
    </div>
  );
}