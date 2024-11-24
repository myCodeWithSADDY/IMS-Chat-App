import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/Layout/AdminLayout";
import Table from "../../components/Shared/Table";
import { Avatar } from "@mui/material";
import { dashboardData } from "../../../constants/sampledata";
import { transformImage } from "../../lib/features";

// Sample columns configuration for users
const columns = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "avatar",
    headerName: "Avatar",
    width: 150,
    renderCell: (params) => (
      <Avatar alt={params.row.name} src={params.row.avatar} />
    ),
  },
  { field: "name", headerName: "Name", width: 200 },
  { field: "username", headerName: "Username", width: 200 },
  { field: "friends", headerName: "Friends", width: 150 },
  { field: "groups", headerName: "Groups", width: 200 },
];

const UserManagement = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(
      dashboardData.users.map((i) => ({
        ...i,
        id: i._id,
        avatar: transformImage(i.avatar, 50),
      }))
    );
  }, []);

  return (
    <AdminLayout>
      <Table heading="User Management" columns={columns} rows={rows} />
    </AdminLayout>
  );
};

export default UserManagement;
