import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";

const ErrorDisplay = (props) => {

    const StyledErrorBox = styled(Box)(() => ({
        margin: '10px 0',
        height: '20px'
    }))

    const StyledErrorDisplay = styled(Typography)(() => ({
        color: "red"
    }))

    return (
        <StyledErrorBox display={"flex"} justifyContent={"center"}>
            <StyledErrorDisplay>{props.children}</StyledErrorDisplay>
        </StyledErrorBox>
    )
}

export default ErrorDisplay