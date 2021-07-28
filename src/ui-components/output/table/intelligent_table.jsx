import React from "react";
import "./table.css";
import { MDBDataTable } from "mdbreact";

export default function IntelligentTable({ data = { columns: [], rows: [] } }) {
  return (
    <MDBDataTable striped bordered sortable small sorting="true" data={data} />
  );
}
