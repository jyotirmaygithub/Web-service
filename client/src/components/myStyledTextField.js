import styled from 'styled-components';
import TextField from '@mui/material/TextField';

const MyStyledTextField = styled(TextField)`
  & label.Mui-focused {
    color: grey; 
  }
  & .MuiInputBase-input.Mui-focused {
    color: grey; 
  }
  & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: grey; 
  }
`;

export default MyStyledTextField;
