import {
    AppBar,
    Box,
    Button,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
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
        width: '300px'
    }))

    const StyledTab = styled(Tab)(({theme}) => ({
        minWidth: '50px'
    }))

    const [storageData, setStorageData] = useState([])
    const [tabValue, setTabValue] = useState(0)

    useEffect(() => {
        if (localStorage.storageData) {
            const data = JSON.parse(localStorage.storageData)
            if (Array.isArray(data)) {
                setStorageData(data)
            }
        }
    }, [])

    const handleTabChanged = (event, newValue) => {
        setTabValue(newValue)
    }

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
                <Box display={"flex"} justifyContent={"center"}>
                    <Tabs value={tabValue} onChange={handleTabChanged} centered>
                        <StyledTab label="タイム"/>
                        <StyledTab label="質問回数"/>
                    </Tabs>
                </Box>
                <Box display={"flex"} justifyContent={"center"}>
                    <div hidden={tabValue !== 0}>
                        <StyledTableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='center'>ランク</TableCell>
                                        <TableCell align='center'>タイム</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {storageData
                                        .sort((a, b) => a[0] - b[0])
                                        .slice(0, 10)
                                        .map((item, index) =>
                                            <TableRow key={index}>
                                                <TableCell align='center'>{index + 1}位</TableCell>
                                                <TableCell align='center'>{timeLib.format(item[0])}秒</TableCell>
                                            </TableRow>
                                        )}
                                </TableBody>
                            </Table>
                        </StyledTableContainer>
                    </div>
                    <div hidden={tabValue !== 1}>
                        <StyledTableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='center'>ランク</TableCell>
                                        <TableCell align='center'>質問回数</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {storageData
                                        .sort((a, b) => a[1] - b[1])
                                        .slice(0, 10)
                                        .map((item, index) =>
                                            <TableRow key={index}>
                                                <TableCell align='center'>{index + 1}位</TableCell>
                                                <TableCell align='center'>{item[1]}回</TableCell>
                                            </TableRow>
                                        )}
                                </TableBody>
                            </Table>
                        </StyledTableContainer>
                    </div>
                </Box>
            </StyledContainer>
        </div>
    )
}

export default Results
