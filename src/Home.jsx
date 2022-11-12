import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import { styled } from '@mui/material/styles';
import {useNavigate} from "react-router-dom";

const Home = (props) => {

    const navigate = useNavigate()

    const StyledTitleBox = styled(Box)(({theme}) => ({
        padding: '20px 0',
    }))

    const StyledContainer = styled(Box)(({theme}) => ({
        margin: '0 auto',
        padding: '20px',
        maxWidth: '500px'
    }))

    const StyledLink = styled(Box)(({theme}) => ({
        margin: '20px 0'
    }))

    const StyledButton = styled(Button)(({theme}) => ({
        width: '200px'
    }))

    return (
        <div>
            <AppBar position={"relative"}>
                <Toolbar>
                    <Typography>Yes/No BLD</Typography>
                </Toolbar>
            </AppBar>
            <StyledContainer maxWidth={"xs"} display={"flex"} flexDirection={"column"}>
                <StyledTitleBox display={"flex"} justifyContent={"center"}>
                    <Typography variant='h3' align='center'>Yes/No BLD</Typography>
                </StyledTitleBox>
                <StyledLink display={"flex"} justifyContent={"center"}>
                    <StyledButton variant='contained' size='large' onClick={() => navigate("/game")}>
                        スタート
                    </StyledButton>
                </StyledLink>
                <StyledLink display={"flex"} justifyContent={"center"}>
                    <StyledButton variant='contained' size='large' onClick={() => navigate("/about")}>
                        遊び方
                    </StyledButton>
                </StyledLink>
                <StyledLink display={"flex"} justifyContent={"center"}>
                    <StyledButton variant='contained' size='large' onClick={() => navigate("/results")}>
                        記録
                    </StyledButton>
                </StyledLink>
            </StyledContainer>
        </div>
    )
}

export default Home
