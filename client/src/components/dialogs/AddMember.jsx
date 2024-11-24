import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/sampledata";
import UserItem from "../Shared/UserItem";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import {
  useAddGroupMemberMutation,
  useAvailableFriendsQuery,
} from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../../redux/reducers/misc";
const AddMemberDialog = ({ chatId }) => {
  const dispatch = useDispatch();
  const { isAddMember } = useSelector((state) => state.misc);

  //api calls
  const [addMembers, isLoadingAddMember] = useAsyncMutation(
    useAddGroupMemberMutation
  );
  const { isLoading, data, isError, error } = useAvailableFriendsQuery(chatId);

  const [SelectedMembers, setSelectedMembers] = useState([]);

  const selectMemberhandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };

  const AddmembersubmitHandler = () => {
    addMembers("adding Members...", { members: SelectedMembers, chatId });
    closehandler();
  };

  const closehandler = () => {
    dispatch(setIsAddMember(false));
  };

  //erros
  useErrors([{ isError, error }]);

  return (
    <Dialog open={isAddMember} onClose={closehandler}>
      <Stack spacing={"1rem"} p={"2rem"} width={"20rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
        <Stack>
          {isLoading ? (
            <Skeleton />
          ) : data?.friends?.length > 0 ? (
            data?.friends?.map((i) => (
              <UserItem
                user={i}
                key={i._id}
                handler={selectMemberhandler}
                isAdded={SelectedMembers.includes(i._id)}
              />
            ))
          ) : (
            <Typography textAlign={"center"}> No friends</Typography>
          )}
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Button color="error" onClick={closehandler}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={AddmembersubmitHandler}
            disabled={isLoadingAddMember}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
