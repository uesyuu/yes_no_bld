import {
    AppBar,
    Box,
    Button,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Toolbar,
    Typography
} from "@mui/material";
import {styled} from "@mui/material/styles";
import {useEffect, useState} from "react";
import timeLib from "./lib/time";
import {useNavigate} from "react-router-dom";

const Results = () => {

    const navigate = useNavigate()

    const StyledContainer = styled(Box)(({theme}) => ({
        margin: '0 auto',
        padding: '20px',
        maxWidth: '500px'
    }))
    const StyledTableContainer = styled(TableContainer)(({theme}) => ({
        minWidth: '50px'
    }))

    const [ storageData, setStorageData ] = useState([])

    useEffect(() => {
        if (localStorage.storageData) {
            const data = JSON.parse(localStorage.storageData)
            if (Array.isArray(data)) {
                setStorageData(data)
            }
        }
    }, [])

    return (
        <div>
            <AppBar position={"relative"}>
                <Toolbar>
                    <Typography>Yes/No BLD</Typography>
                </Toolbar>
            </AppBar>
            <StyledContainer maxWidth={"xs"} display={"flex"} flexDirection={"column"}>
                <Box display={"flex"}>
                    <Button variant='contained' onClick={() => navigate('/')}>
                        戻る
                    </Button>
                </Box>
                <Box display={"flex"} justifyContent={"center"}>
                    <Typography variant='h3'>記録</Typography>
                </Box>
                <StyledTableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>ランク</TableCell>
                                <TableCell align='center'>タイム(秒)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {storageData
                                .sort((a, b) => a - b)
                                .slice(0, 10)
                                .map((item, index) =>
                                    <TableRow key={index}>
                                        <TableCell align='center'>{index + 1}位</TableCell>
                                        <TableCell align='center'>{timeLib.format(item)}</TableCell>
                                    </TableRow>
                                )}
                        </TableBody>
                    </Table>
                </StyledTableContainer>
            </StyledContainer>
        </div>
    )
}

export default Results
