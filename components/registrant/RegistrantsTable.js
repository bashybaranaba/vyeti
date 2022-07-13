import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CreateCredential from "../credential/CreateCredential";
import DeleteRegistrant from "./DeleteRegistrant";
import dayjs from "dayjs";

const columns = [
  {
    field: "id",
    headerName: "Award",
    width: 64,
    renderCell: (params) => <CreateCredential registrantId={params.value} />,
  },
  { headerName: "Name", field: "name", width: 180 },
  { headerName: "Gender", field: "gender", width: 68 },
  { headerName: "Admission", field: "admission", width: 100 },
  { headerName: "Email", field: "email", width: 180 },
  { headerName: "Phone", field: "phone", width: 110 },
  { headerName: "Enrollment Date", field: "enrollment", width: 140 },
  { headerName: "Expected Completion", field: "exp_completion", width: 160 },
  { headerName: "Completion Date", field: "completion", width: 140 },
  { headerName: "Date of Birth", field: "dob", width: 140 },
  { headerName: "Birth Cert No", field: "birthCertNo", width: 100 },
  { headerName: "National ID", field: "nationalId", width: 100 },
  { headerName: "Passport", field: "passport", width: 100 },
  {
    field: "deletebutton",
    headerName: "Delete",
    width: 64,
    renderCell: (params) => <DeleteRegistrant registrantId={params.value} />,
  },
];

function createData(
  id,
  name,
  gender,
  admission,
  email,
  phone,
  enrollment,
  exp_completion,
  completion,
  dob,
  birthCertNo,
  nationalId,
  passport,
  deletebutton
) {
  return {
    id,
    name,
    gender,
    admission,
    email,
    phone,
    enrollment,
    exp_completion,
    completion,
    dob,
    birthCertNo,
    nationalId,
    passport,
    deletebutton,
  };
}

export default function RegistrantsTable({ registrants }) {
  const rows = registrants.map((registrant) =>
    createData(
      registrant._id,
      registrant.fullname,
      registrant.gender,
      registrant.admission_no,
      registrant.email,
      registrant.phone,
      dayjs(registrant.enrollment_date).format("MMMM DD YYYY"),
      dayjs(registrant.expected_completion).format("MMMM DD YYYY"),
      registrant.completion_date,
      dayjs(registrant.date_of_birth).format("MMMM DD YYYY"),
      registrant.birth_certificate,
      registrant.national_id,
      registrant.passport_no,
      registrant._id
    )
  );
  return (
    <div style={{ height: 500, width: "100%" }}>
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
