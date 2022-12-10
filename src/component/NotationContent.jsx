import {Box, Button, Tab, Tabs} from "@mui/material";
import {styled} from "@mui/material/styles";

const NotationContent = (props) => {

    const notationList = [
        ["U", "U'", "U2"],
        ["D", "D'", "D2"],
        ["R", "R'", "R2"],
        ["L", "L'", "L2"],
        ["F", "F'", "F2"],
        ["B", "B'", "B2"],
    ]

    const notationDoubleList = [
        ["Uw", "Uw'", "Uw2"],
        ["Dw", "Dw'", "Dw2"],
        ["Rw", "Rw'", "Rw2"],
        ["Lw", "Lw'", "Lw2"],
        ["Fw", "Fw'", "Fw2"],
        ["Bw", "Bw'", "Bw2"],
    ]

    const notationSliceList = [
        ["M", "M'", "M2"],
        ["S", "S'", "S2"],
        ["E", "E'", "E2"],
    ]

    const notationRotationList = [
        ["x", "x'", "x2"],
        ["y", "y'", "y2"],
        ["z", "z'", "z2"],
    ]

    const StyledTab = styled(Tab)(() => ({
        minWidth: '50px'
    }))

    const StyledNotationButton = styled(Button)(({theme}) => ({
        margin: theme.spacing(1),
        width: '10px',
        height: '30px',
        textTransform: 'none',
    }))

    const handleTabChanged = (event, newValue) => {
        props.setTabValue(newValue)
    }

    const displayNotationList = (list) => {
        return list.map((oneNotationList, i) =>
            <Box display={"flex"} justifyContent={"center"} key={i + 1}>
                {oneNotationList.map((notation, j) =>
                    <StyledNotationButton
                        onClick={() => props.addMove(notation)}
                        variant='contained'
                        key={(i + 1) * 10 + j}
                    >
                        {notation}
                    </StyledNotationButton>
                )}
            </Box>
        )
    }

    return (
        <>
            <Box display={"flex"} justifyContent={"center"}>
                <Tabs value={props.tabValue} onChange={handleTabChanged} centered>
                    <StyledTab label="基本"/>
                    <StyledTab label="二層回し"/>
                    <StyledTab label="スライス"/>
                    <StyledTab label="持ち替え"/>
                </Tabs>
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
                <div hidden={props.tabValue !== 0}>
                    {displayNotationList(notationList)}
                </div>
                <div hidden={props.tabValue !== 1}>
                    {displayNotationList(notationDoubleList)}
                </div>
                <div hidden={props.tabValue !== 2}>
                    {displayNotationList(notationSliceList)}
                </div>
                <div hidden={props.tabValue !== 3}>
                    {displayNotationList(notationRotationList)}
                </div>
            </Box>
        </>
    )
}

export default NotationContent