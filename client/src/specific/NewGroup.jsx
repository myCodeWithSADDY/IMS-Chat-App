import React, { useState } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { sampleUsers } from "../constants/sampledata";
import UserItem from "../components/Shared/UserItem";
import { useInputValidation } from "6pp";
import { darkPurple } from "../constants/color";
import { useDispatch, useSelector } from "react-redux";
import {
  useAvailableFriendsQuery,
  useNewGroupMutation,
} from "../redux/api/api";
import { useAsyncMutation, useErrors } from "../hooks/hook";
import { setisNewGroup } from "../redux/reducers/misc";
import toast from "react-hot-toast";
const NewGroup = () => {
  const dispatch = useDispatch();
  const { isNewGroup } = useSelector((state) => state.misc);
  const { isError, isLoading, error, data } = useAvailableFriendsQuery();
  const [NewGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);

  const groupName = useInputValidation("");

  //states
  const [SelectedMembers, setSelectedMembers] = useState([]);

  //Errors
  const errors = [
    {
      isError,
      error,
    },
  ];
  useErrors(errors);

  //handlers
  const selectMemberhandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };
  const submitHandler = () => {
    if (!groupName.value) return toast.error("Group name is required");
    if (SelectedMembers.length < 2)
      return toast.error("Group must have at least 3 members");
    NewGroup("Creating New Group...", {
      name: groupName.value,
      members: SelectedMembers,
    });

    closeHandler();
  };
  const closeHandler = () => {
    dispatch(setisNewGroup(false));
  };

  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack
        padding={{ xs: "1rem", sm: "3rem" }}
        width={"25rem"}
        spacing={"1rem"}
      >
        <DialogTitle variant="h4" textAlign={"center"}>
          New Group
        </DialogTitle>

        <TextField
          label="Group"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />
        <Typography variant="body1">Members</Typography>
        <Stack>
          {isLoading ? (
            <Skeleton />
          ) : (
            data?.friends?.map((user) => (
              <UserItem
                user={user}
                key={user._id}
                handler={selectMemberhandler}
                isAdded={SelectedMembers.includes(user._id)}
              />
            ))
          )}
        </Stack>

        <Stack
          direction={"row"}
          spacing={"1rem"}
          justifyContent={"space-evenly"}
        >
          <Button
            variant="outlined"
            color="error"
            size="large"
            onClick={closeHandler}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: darkPurple }}
            size="large"
            onClick={submitHandler}
            disabled={isLoadingNewGroup}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
