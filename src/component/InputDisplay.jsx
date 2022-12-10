import {Box, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";

const InputDisplay = (props) => {

    const StyledInputContent = styled(Box)(() => ({
        backgroundColor: "lightgray",
        padding: '5px 5px',
    }))

    return (
        <StyledInputContent display={"flex"}>
            <Typography>自分の回答: <br/>{props.children}</Typography>
        </StyledInputContent>
    )
}

export default InputDisplay