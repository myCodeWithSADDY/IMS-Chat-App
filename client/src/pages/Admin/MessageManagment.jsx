import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/Layout/AdminLayout";
import Table from "../../components/Shared/Table";
import { Avatar, Box, Stack } from "@mui/material";
import { dashboardData } from "../../../constants/sampledata";
import { fileFormat, transformImage } from "../../lib/features";
import moment from "moment"; // Import moment for date formatting
import RenderContent from "../../components/Shared/RenderContent";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "attachments",
    headerName: "Attachments",
    width: 300,
    renderCell: (params) => {
      const { attachments } = params.row;

      return attachments?.length > 0 ? (
        attachments.map((attachment, index) => {
          const url = attachment.url;
          const file = fileFormat(url);

          return (
            <Box key={index}>
              <a
                href={url}
                download
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "black",
                  height: "20%",
                }}
              >
                {RenderContent(file, url)}
              </a>
            </Box>
          );
        })
      ) : (
        <span>No attachments</span>
      );
    },
  },
  { field: "content", headerName: "Content", width: 400 },
  {
    field: "sender",
    headerName: "Sent By",
    width: 200,
    renderCell: (params) => (
      <Stack direction="row" spacing={1} alignItems="center">
        <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
        <span>{params.row.sender.name}</span>
      </Stack>
    ),
  },
  { field: "chat", headerName: "Chat", width: 220 },
  { field: "groupChat", headerName: "Group Chat", width: 100 },
  { field: "createdAt", headerName: "Time", width: 250 },
];

const MessageManagement = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(
      dashboardData.messages.map((message) => ({
        id: message._id,
        content: message.content,
        attachments: message.attachments,
        sender: {
          name: message.sender.name,
          avatar: transformImage(message.sender.avatar, 50),
        },
        chat: message.chat,
        groupChat: message.groupchat || false,
        createdAt: moment(message.createdAt).format("MMM DD, YYYY"),
      }))
    );
  }, []);

  return (
    <AdminLayout>
      <Table
        heading="All Messages"
        columns={columns}
        rows={rows}
        rowHeight={200}
      />
    </AdminLayout>
  );
};

export default MessageManagement;
