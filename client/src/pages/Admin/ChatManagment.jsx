import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/Layout/AdminLayout";
import Table from "../../components/Shared/Table";
import { Avatar, Stack } from "@mui/material";
import { dashboardData } from "../../../constants/sampledata";
import { transformImage } from "../../lib/features";
import AvatarCard from "../../components/Shared/AvatarCard";

// Column definitions for chat management table
const columns = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "avatar",
    headerName: "Avatar",
    width: 150,
    renderCell: (params) => <AvatarCard avatar={params.row.avatar} />,
  },
  { field: "name", headerName: "Name", width: 200 },
  {
    field: "TotalMembers",
    headerName: "Total Members",
    width: 150,
    renderCell: (params) => (
      <AvatarCard max={100} avatar={params.row.members} />
    ),
  },
  { field: "totalMessages", headerName: "Total Messages", width: 200 },
  {
    field: "Creator",
    headerName: "Created By",
    width: 250,
    renderCell: (params) => (
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        <Avatar src={params.row.creator.avatar} alt={params.row.creator.name} />
        <span>{params.row.creator.name}</span>
      </Stack>
    ),
  },
];

const ChatManagement = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Setting up rows based on `dashboardData.chats`
    setRows(
      dashboardData.chats.map((chat) => ({
        id: chat._id,
        name: chat.name,
        avatar: chat.avatar.map((img) => transformImage(img, 50)),
        members: chat.members.map((member) =>
          transformImage(member.avatar, 50)
        ),
        totalMessages: chat.totalMessages,
        creator: {
          name: chat.creator.name,
          avatar: transformImage(chat.creator.avatar, 50),
        },
      }))
    );
  }, []);

  return (
    <AdminLayout>
      <Table heading="All Chats" columns={columns} rows={rows} />
    </AdminLayout>
  );
};

export default ChatManagement;
