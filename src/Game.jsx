import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {
    AppBar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Tab,
    Tabs,
    Toolbar,
    Typography
} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import moment from "moment";
import {randomCube, solve} from "min2phase/src/min2phase";
import algUtil from './lib/algUtil'
import Cube from "cubejs"
import cubeJsUtil from "./lib/cubejsUtil"
import timeLib from './lib/time'
import {TwitterShareButton} from "react-share";
import CubePlayer from "./component/CubePlayer";

const Game = (props) => {

    const navigate = useNavigate()

    const StyledContainer = styled(Box)(({theme}) => ({
        margin: '0 auto',
        padding: '20px',
        maxWidth: '500px'
    }))

    const StyledInputContent = styled(Box)(({theme}) => ({
        backgroundColor: "lightgray",
        padding: '5px 5px',
    }))

    const StyledButton = styled(Button)(({theme}) => ({
        margin: theme.spacing(1),
        width: props.width,
        height: '30px'
    }))

    const StyledNotationButton = styled(Button)(({theme}) => ({
        margin: theme.spacing(1),
        width: '10px',
        height: '30px',
        textTransform: 'none',
    }))

    const StyledErrorBox = styled(Box)(({theme}) => ({
        margin: '10px 0',
        height: '20px'
    }))

    const StyledErrorDisplay = styled(Typography)(({theme}) => ({
        color: "red"
    }))

    const StyledAnswerBox = styled(Box)(({theme}) => ({
        margin: '10px 0',
        height: '20px'
    }))

    const StyledTab = styled(Tab)(({theme}) => ({
        minWidth: '50px'
    }))

    const StyledWhiteButton = styled(Button)(({theme}) => ({
        margin: '5px 5px',
        backgroundColor: 'white',
        '&:hover': {
            backgroundColor: 'white',
        },
    }))

    const StyledYellowButton = styled(Button)(({theme}) => ({
        margin: '5px 5px',
        backgroundColor: 'yellow',
        '&:hover': {
            backgroundColor: 'yellow',
        },
    }))

    const StyledGreenButton = styled(Button)(({theme}) => ({
        margin: '5px 5px',
        backgroundColor: 'green',
        '&:hover': {
            backgroundColor: 'green',
        },
    }))

    const StyledBlueButton = styled(Button)(({theme}) => ({
        margin: '5px 5px',
        backgroundColor: 'blue',
        '&:hover': {
            backgroundColor: 'blue',
        },
    }))

    const StyledRedButton = styled(Button)(({theme}) => ({
        margin: '5px 5px',
        backgroundColor: 'red',
        '&:hover': {
            backgroundColor: 'red',
        },
    }))

    const StyledOrangeButton = styled(Button)(({theme}) => ({
        margin: '5px 5px',
        backgroundColor: 'orange',
        '&:hover': {
            backgroundColor: 'orange',
        },
    }))

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

    const faceletConversionList = [
        "UBL", "UB", "UBR", "UL", "Uセンター", "UR", "UFL", "UF", "UFR",
        "RUF", "RU", "RUB", "RF", "Rセンター", "RB", "RDF", "RD", "RDB",
        "FUL", "FU", "FUR", "FL", "Fセンター", "FR", "FDL", "FD", "FDR",
        "DFL", "DF", "DFR", "DL", "Dセンター", "DR", "DBL", "DB", "DBR",
        "LUB", "LU", "LUF", "LB", "Lセンター", "LF", "LDB", "LD", "LDF",
        "BUR", "BU", "BUL", "BR", "Bセンター", "BL", "BDR", "BD", "BDL",
    ]

    const colorConversionList = [
        ["U", "白"],
        ["D", "黄色"],
        ["F", "緑"],
        ["B", "青"],
        ["R", "赤"],
        ["L", "オレンジ"],
    ]

    const intervalRef = useRef(null);
    const [time, setTime] = useState(0);
    const [realTime, setRealTime] = useState(0);
    const [startDateTime, setStartDateTime] = useState(0);
    const [scramble, setScramble] = useState('');
    const [mySolution, setMySolution] = useState([]);
    const [rotationList, setRotationList] = useState([]);
    const [cube, setCube] = useState(new Cube())
    const [faceletList, setFaceletList] = useState([])
    const [isStickerSelectDialogOpen, setIsStickerSelectDialogOpen] = useState(false)
    const [isColorSelectDialogOpen, setIsColorSelectDialogOpen] = useState(false)
    const [selectedStickerNum, setSelectedStickerNum] = useState(0)
    const [yesNoAnswer, setYesNoAnswer] = useState("")
    const [isCorrectDialogOpen, setIsCorrectDialogOpen] = useState(false)
    const [isFailureDialogOpen, setIsFailureDialogOpen] = useState(false)
    const [incorrectMessage, setIncorrectMessage] = useState(null)
    const [storageData, setStorageData] = useState([])
    const [tabValue, setTabValue] = useState(0)
    const [questionCount, setQuestionCount] = useState(0)

    useEffect(() => {
        if (localStorage.storageData) {
            const data = JSON.parse(localStorage.storageData)
            if (Array.isArray(data)) {
                setStorageData(data)
            }
        }
        moveCube([])
        startGame()
        return () => {
            stopTimer()
        }
    }, [])

    useEffect(() => {
        const [newRotationLessSolution, newRotationList] = algUtil.makeRotationLessAlg(mySolutionWithoutNewLine(mySolution))
        setRotationList(newRotationList)

        moveCube(newRotationLessSolution)
    }, [mySolution])

    useEffect(() => {
        const faceletString = cube.asString()

        updateFaceletList(faceletString.split(""), rotationList)
    }, [cube])

    const startGame = () => {
        setTime(0)
        setRealTime(0)
        setStartDateTime(0)
        setScramble("")
        setMySolution([])
        setRotationList([])
        setFaceletList([])
        setSelectedStickerNum(0)
        setIsCorrectDialogOpen(false)
        setIsFailureDialogOpen(false)
        setYesNoAnswer("")
        setTabValue(0)
        setQuestionCount(0)
        makeScramble()
        startTimer()
    }

    const startTimer = () => {
        if (intervalRef.current !== null) return;
        setStartDateTime(new Date().getTime())
        intervalRef.current = setInterval(() => {
            setTime(c => c + 1)
        }, 1000)
    }

    const stopTimer = () => {
        if (intervalRef.current === null) return
        clearInterval(intervalRef.current)
        intervalRef.current = null
    }

    const makeScramble = () => {
        setScramble(solve(randomCube()))
    }

    const solutionListToString = (solutionList) => {
        return solutionList.join(" ")
    }

    const solutionListToStringWithNewLine = (solutionList) => {
        const solutionString = solutionList.join(" ")
        const solutionStringList = solutionString.split(" n")
        return solutionStringList.map((item, index) =>
            <span key={index}>{item}<br/></span>
        )
    }

    const mySolutionWithoutNewLine = (solutionList) => {
        return solutionList.filter(i => i !== "n")
    }

    const addMove = (move) => {
        setMySolution((solution) => solution.concat(move))
    }

    const removeMove = () => {
        setMySolution((solution) => solution.slice(0, solution.length - 1))
    }

    const moveCube = (newSolution) => {
        const newCube = new Cube()
        newCube.move(`${scramble} ${solutionListToString(newSolution)}`)
        setCube(newCube)
    }

    const updateFaceletList = (faceletList, rotationList) => {
        const newFaceletList = cubeJsUtil.convertFaceletStringByRotation(faceletList, rotationList)
        setFaceletList(newFaceletList)
    }

    const handleDialogStickerClick = (stickerNum) => {
        setSelectedStickerNum(stickerNum)
        setIsStickerSelectDialogOpen(false)
        setIsColorSelectDialogOpen(true)
    }

    const handleDialogStickerClose = () => {
        setIsStickerSelectDialogOpen(false)
    }

    const handleDialogColorClick = (colorNum) => {
        setIsColorSelectDialogOpen(false)
        setQuestionCount((count) => count + 1)
        setYesNoAnswer(`質問: ${faceletConversionList[selectedStickerNum]}の色は${colorConversionList[colorNum][1]}ですか？ 答え: ${faceletList[selectedStickerNum] === colorConversionList[colorNum][0] ? "Yes!" : "No!"}`)
    }

    const handleDialogColorClose = () => {
        setIsColorSelectDialogOpen(false)
    }

    const askQuestion = () => {
        setIsStickerSelectDialogOpen(true)
        setYesNoAnswer("")
    }

    const judgeSolution = () => {
        if (cube.isSolved()) {
            stopTimer()
            const realTimeTmp = (new Date().getTime() - startDateTime) / 1000
            const storageDataTmp = [...storageData]
            storageDataTmp.push([realTimeTmp, questionCount])
            localStorage.setItem('storageData', JSON.stringify(storageDataTmp))
            setRealTime(realTimeTmp)
            setStorageData(storageDataTmp)
            setIsCorrectDialogOpen(true)
        } else {
            setIncorrectMessage("不正解!")
            setTimeout(() => {
                setIncorrectMessage(null)
            }, 3000)
        }
    }

    const giveUpGame = () => {
        stopTimer()
        const realTimeTmp = (new Date().getTime() - startDateTime) / 1000
        setRealTime(realTimeTmp)
        setIsFailureDialogOpen(true)
    }

    const handleTabChanged = (event, newValue) => {
        setTabValue(newValue)
    }

    const displayNotationList = (list) => {
        return list.map((oneNotationList, i) =>
            <Box display={"flex"} justifyContent={"center"} key={i + 1}>
                {oneNotationList.map((notation, j) =>
                    <StyledNotationButton
                        onClick={() => addMove(notation)}
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
        <div>
            <AppBar position={"relative"}>
                <Toolbar>
                    <Typography>Yes/No BLD</Typography>
                </Toolbar>
            </AppBar>
            <StyledContainer maxWidth={"xs"} display={"flex"} flexDirection={"column"}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Button variant='contained' onClick={() => navigate('/')}>
                        戻る
                    </Button>
                    <Typography variant='h5'>{moment(time * 1000).format('mm:ss')}</Typography>
                </Box>
                <StyledErrorBox display={"flex"} justifyContent={"center"}>
                    <StyledErrorDisplay>{incorrectMessage}</StyledErrorDisplay>
                </StyledErrorBox>
                <StyledAnswerBox display={"flex"} justifyContent={"center"}>
                    <Typography>{yesNoAnswer}</Typography>
                </StyledAnswerBox>
                <Box display={"flex"} justifyContent={"center"}>
                    <StyledButton variant='contained' color='primary' width='150px'
                                  onClick={judgeSolution}>完成しました!</StyledButton>
                    <StyledButton variant='contained' color='primary' width='120px'
                                  onClick={giveUpGame}>降参する</StyledButton>
                </Box>
                <StyledInputContent display={"flex"}>
                    <Typography>自分の回答: <br/>{solutionListToStringWithNewLine(mySolution)}</Typography>
                </StyledInputContent>
                {/*<StyledInputContent display={"flex"}>*/}
                {/*    <Typography>スクランブル: {scramble}</Typography>*/}
                {/*</StyledInputContent>*/}
                {/*<StyledInputContent display={"flex"}>*/}
                {/*    <Typography>faceletList: {faceletList.join("")}</Typography>*/}
                {/*</StyledInputContent>*/}
                <Box display={"flex"} justifyContent={"center"}>
                    <StyledButton variant='contained' color='success' width='120px'
                                  onClick={askQuestion}>質問する</StyledButton>
                    <StyledButton variant='contained' color='primary' width='120px'
                                  onClick={() => addMove("n")}>改行する</StyledButton>
                    <StyledButton variant='contained' color='error' width='120px'
                                  onClick={removeMove}>1文字削除</StyledButton>
                </Box>
                <Box display={"flex"} justifyContent={"center"}>
                    <Tabs value={tabValue} onChange={handleTabChanged} centered>
                        <StyledTab label="基本"/>
                        <StyledTab label="二層回し"/>
                        <StyledTab label="スライス"/>
                        <StyledTab label="持ち替え"/>
                    </Tabs>
                </Box>
                <Box display={"flex"} justifyContent={"center"}>
                    <div hidden={tabValue !== 0}>
                        {displayNotationList(notationList)}
                    </div>
                    <div hidden={tabValue !== 1}>
                        {displayNotationList(notationDoubleList)}
                    </div>
                    <div hidden={tabValue !== 2}>
                        {displayNotationList(notationSliceList)}
                    </div>
                    <div hidden={tabValue !== 3}>
                        {displayNotationList(notationRotationList)}
                    </div>
                </Box>
            </StyledContainer>
            <Dialog open={isStickerSelectDialogOpen} onClose={handleDialogStickerClose}>
                <DialogTitle>質問したいステッカーを選んでください</DialogTitle>
                <DialogContent>
                    <div style={{width: "400px", overflow: "scroll"}}>
                        <table style={{borderSpacing: "0px", borderCollapse: "collapse", whiteSpace: "nowrap"}}>
                            <tbody>
                            <tr>
                                <td rowSpan={3} colSpan={3}></td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(0)}>&nbsp;</td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(1)}>&nbsp;</td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(2)}>&nbsp;</td>
                                <td rowSpan={3} colSpan={6}></td>
                            </tr>
                            <tr>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(3)}>&nbsp;</td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(4)}>U
                                </td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(5)}>&nbsp;</td>
                            </tr>
                            <tr>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(6)}>&nbsp;</td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(7)}>&nbsp;</td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(8)}>&nbsp;</td>
                            </tr>
                            <tr>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(36)}>&nbsp;</td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(37)}>&nbsp;</td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(38)}>&nbsp;</td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(18)}>&nbsp;</td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(19)}>&nbsp;</td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(20)}>&nbsp;</td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(9)}>&nbsp;</td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(10)}>&nbsp;</td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(11)}>&nbsp;</td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(45)}>&nbsp;</td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(46)}>&nbsp;</td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(47)}>&nbsp;</td>
                            </tr>
                            <tr>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(39)}>&nbsp;</td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(40)}>L
                                </td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(41)}>&nbsp;</td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(21)}>&nbsp;</td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(22)}>F
                                </td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(23)}>&nbsp;</td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(12)}>&nbsp;</td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(13)}>R
                                </td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(14)}>&nbsp;</td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(48)}>&nbsp;</td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(49)}>B
                                </td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(50)}>&nbsp;</td>
                            </tr>
                            <tr>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(42)}>&nbsp;</td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(43)}>&nbsp;</td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(44)}>&nbsp;</td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(24)}>&nbsp;</td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(25)}>&nbsp;</td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(26)}>&nbsp;</td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(15)}>&nbsp;</td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(16)}>&nbsp;</td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(17)}>&nbsp;</td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(51)}>&nbsp;</td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(52)}>&nbsp;</td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(53)}>&nbsp;</td>
                            </tr>
                            <tr>
                                <td rowSpan={3} colSpan={3}></td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(27)}>&nbsp;</td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(28)}>&nbsp;</td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(29)}>&nbsp;</td>
                                <td rowSpan={3} colSpan={6}></td>
                            </tr>
                            <tr>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(30)}>&nbsp;</td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(31)}>D
                                </td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(32)}>&nbsp;</td>
                            </tr>
                            <tr>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(33)}>&nbsp;</td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(34)}>&nbsp;</td>
                                <td style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center"
                                }} onClick={() => handleDialogStickerClick(35)}>&nbsp;</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </DialogContent>
            </Dialog>
            <Dialog open={isColorSelectDialogOpen} onClose={handleDialogColorClose}>
                <DialogTitle>予想する色を選んでください</DialogTitle>
                <DialogContent>
                    {/*{colorConversionList.map((color, index) =>*/}
                    {/*    <Button onClick={() => handleDialogColorClick(index)} key={index}>{color[1]}</Button>*/}
                    {/*)}*/}
                    <StyledWhiteButton onClick={() => handleDialogColorClick(0)}>
                        <span style={{color: 'black'}}>白</span>
                    </StyledWhiteButton>
                    <StyledYellowButton onClick={() => handleDialogColorClick(1)}>
                        <span style={{color: 'black'}}>黄色</span>
                    </StyledYellowButton>
                    <StyledGreenButton onClick={() => handleDialogColorClick(2)}>
                        <span style={{color: 'white'}}>緑</span>
                    </StyledGreenButton>
                    <br/>
                    <StyledBlueButton onClick={() => handleDialogColorClick(3)}>
                        <span style={{color: 'white'}}>青</span>
                    </StyledBlueButton>
                    <StyledRedButton onClick={() => handleDialogColorClick(4)}>
                        <span style={{color: 'white'}}>赤</span>
                    </StyledRedButton>
                    <StyledOrangeButton onClick={() => handleDialogColorClick(5)}>
                        <span style={{color: 'black'}}>オレンジ</span>
                    </StyledOrangeButton>
                </DialogContent>
            </Dialog>
            <Dialog open={isCorrectDialogOpen}>
                <DialogTitle>完成!</DialogTitle>
                <DialogContent>
                    <DialogContentText align={"center"}>
                        お見事!<br/>
                        かかった時間: {timeLib.format(realTime)}<br/>
                        質問回数: {questionCount}回<br/>
                        <CubePlayer
                            scramble={scramble + " " + solutionListToString(mySolutionWithoutNewLine(mySolution))}
                        /><br/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='primary'>
                        <TwitterShareButton
                            url={"Yes/No BLDを成功させました！\n"
                                + `タイム: ${timeLib.format(realTime)}\n`
                                + `質問回数: ${questionCount}回\n`
                                + 'https://uesyuu.github.io/yes_no_bld #YesNoBLD'}>
                            <Typography variant='body2'>Twitterでシェア</Typography>
                        </TwitterShareButton>
                    </Button>
                    <Button variant='contained' color='primary' onClick={startGame}>
                        <Typography variant='body2'>もう一度</Typography>
                    </Button>
                    <Button variant='contained' color='primary' onClick={() => navigate('/')}>
                        <Typography variant='body2'>ホームに戻る</Typography>
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={isFailureDialogOpen}>
                <DialogTitle>失敗…</DialogTitle>
                <DialogContent>
                    <DialogContentText align={"center"}>
                        残念…<br/>
                        かかった時間: {timeLib.format(realTime)}<br/>
                        質問回数: {questionCount}回<br/>
                        <CubePlayer
                            scramble={scramble + " " + solutionListToString(mySolutionWithoutNewLine(mySolution))}
                        /><br/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='primary' onClick={startGame}>
                        <Typography variant='body2'>もう一度</Typography>
                    </Button>
                    <Button variant='contained' color='primary' onClick={() => navigate('/')}>
                        <Typography variant='body2'>ホームに戻る</Typography>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Game
