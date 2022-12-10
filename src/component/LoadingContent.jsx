import {Box, CircularProgress} from "@mui/material";
import {styled} from "@mui/material/styles";

const LoadingContent = () => {

    const StyledProgressBox = styled(Box)(() => ({
        marginTop: '20px'
    }))

    return (
        <StyledProgressBox display={"flex"} justifyContent={"center"}>
            <CircularProgress/>
        </StyledProgressBox>
    )
}

export default LoadingContent