import {Box, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";

const AnswerDisplay = (props) => {

    const StyledAnswerBox = styled(Box)(() => ({
        margin: '10px 0',
        height: '20px'
    }))

    return (
        <StyledAnswerBox display={"flex"} justifyContent={"center"}>
            <Typography>{props.children}</Typography>
        </StyledAnswerBox>
    )
}

export default AnswerDisplay