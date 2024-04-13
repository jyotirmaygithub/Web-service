import { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import PopUp from "../components/editInfo";
import { FrontAuthContext } from "../Context/Context";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function TableData(props) {
  // Destructuring handleDeleteUser from context
  const { handleDeleteUser } = FrontAuthContext();
  const { data } = props;
  const [open, setOpen] = useState(false);

  // Function to open the PopUp
  function handleOpen() {
    setOpen(true);
  }

  // Function to handle user deletion
  async function handleDelete(id) {
    const response = await handleDeleteUser(id);
    console.log("Deleted User: ", response);
    returnResponse(response);
  }

  // Function to handle response from deletion operation
  function returnResponse(response) {
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  }

  return (
    <StyledTableRow>
      <StyledTableCell>{data.name}</StyledTableCell>
      <StyledTableCell>{data.age}</StyledTableCell>
      <StyledTableCell>{data.gender}</StyledTableCell>
      <StyledTableCell>{data.mobileNumber}</StyledTableCell>
      <StyledTableCell className="space-x-2">
        <Button
          sx={{
            background: "black",
            border: "1px solid black",
            "&:hover": {
              background: "white",
              color: "black",
              border: "1px solid black",
            },
          }}
          onClick={handleOpen}
          variant="contained"
          color="primary"
        >
          Edit
        </Button>
        {open && (
          <PopUp entireDocument={data} open={open} openState={setOpen} />
        )}
        <Button
          sx={{
            background: "white",
            color: "black",
            border: "1px solid black",
            "&:hover": {
              background: "black",
              color: "white",
              border: "1px solid black",
            },
          }}
          onClick={() => handleDelete(data._id)}
          variant="contained"
          color="primary"
        >
          Delete
        </Button>
      </StyledTableCell>
    </StyledTableRow>
  );
}
