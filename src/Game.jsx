import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {
    AppBar,
    Box,
    Button, CircularProgress,
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

    const StyledContainer = styled(Box)(() => ({
        margin: '0 auto',
        padding: '20px',
        maxWidth: '500px'
    }))

    const StyledInputContent = styled(Box)(() => ({
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

    const StyledErrorBox = styled(Box)(() => ({
        margin: '10px 0',
        height: '20px'
    }))

    const StyledErrorDisplay = styled(Typography)(() => ({
        color: "red"
    }))

    const StyledAnswerBox = styled(Box)(() => ({
        margin: '10px 0',
        height: '20px'
    }))

    const StyledTab = styled(Tab)(() => ({
        minWidth: '50px'
    }))

    const StyledColorButton = styled(Button)(() => ({
        margin: '5px 5px',
    }))

    const StyledProgressBox = styled(Box)(() => ({
        marginTop: '20px'
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
        ["U", "白", "white", "black"],
        ["D", "黄色", "yellow", "black"],
        ["F", "緑", "green", "white"],
        ["B", "青", "blue", "white"],
        ["R", "赤", "red", "white"],
        ["L", "オレンジ", "orange", "black"],
    ]

    const intervalRef = useRef(null);
    const [time, setTime] = useState(0);
    const [realTime, setRealTime] = useState(0);
    const [startDateTime, setStartDateTime] = useState(0);
    const [scramble, setScramble] = useState('');
    const [mySolutionList, setMySolutionList] = useState([]);
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
    const [isLoading, setIsLoading] = useState(true)

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
        const [newRotationLessSolutionList, newRotationList] = algUtil.makeRotationLessAlg(mySolutionListWithoutNewLine(mySolutionList))
        setRotationList(newRotationList)

        moveCube(newRotationLessSolutionList)
    }, [mySolutionList])

    useEffect(() => {
        const faceletString = cube.asString()

        updateFaceletList(faceletString.split(""), rotationList)
    }, [cube])

    const startGame = () => {
        setIsLoading(true)
        setTime(0)
        setRealTime(0)
        setStartDateTime(0)
        setScramble("")
        setMySolutionList([])
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
        setIsLoading(false)
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
        const solutionStringList = solutionString.split("n")
        return solutionStringList.map((item, index) =>
            <span key={index}>{item}<br/></span>
        )
    }

    const mySolutionListWithoutNewLine = (solutionList) => {
        return solutionList.filter(i => i !== "n")
    }

    const addMove = (move) => {
        setMySolutionList((solution) => solution.concat(move))
    }

    const removeMove = () => {
        setMySolutionList((solution) => solution.slice(0, solution.length - 1))
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

    const StickerCell = (props) => {
        return <td
            style={{
                width: "30px",
                height: "30px",
                border: "1px solid black",
                textAlign: "center"
            }}
            onClick={() => handleDialogStickerClick(props.num)}>{props.children}</td>
    }

    return (
        <div>
            <AppBar position={"relative"}>
                <Toolbar>
                    <Typography>Yes/No BLD</Typography>
                </Toolbar>
            </AppBar>
            {!isLoading &&
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
                        <Typography>自分の回答: <br/>{solutionListToStringWithNewLine(mySolutionList)}</Typography>
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
            }
            {isLoading &&
                <StyledProgressBox display={"flex"} justifyContent={"center"}>
                    <CircularProgress />
                </StyledProgressBox>
            }
            <Dialog open={isStickerSelectDialogOpen} onClose={handleDialogStickerClose}>
                <DialogTitle>質問したいステッカーを選んでください</DialogTitle>
                <DialogContent>
                    <div style={{width: "400px", overflow: "scroll"}}>
                        <table style={{borderSpacing: "0px", borderCollapse: "collapse", whiteSpace: "nowrap"}}>
                            <tbody>
                            <tr>
                                <td rowSpan={3} colSpan={3}></td>
                                <StickerCell num={0}></StickerCell>
                                <StickerCell num={1}></StickerCell>
                                <StickerCell num={2}></StickerCell>
                                <td rowSpan={3} colSpan={6}></td>
                            </tr>
                            <tr>
                                <StickerCell num={3}></StickerCell>
                                <StickerCell num={4}>U</StickerCell>
                                <StickerCell num={5}></StickerCell>
                            </tr>
                            <tr>
                                <StickerCell num={6}></StickerCell>
                                <StickerCell num={7}></StickerCell>
                                <StickerCell num={8}></StickerCell>
                            </tr>
                            <tr>
                                <StickerCell num={36}></StickerCell>
                                <StickerCell num={37}></StickerCell>
                                <StickerCell num={38}></StickerCell>
                                <StickerCell num={18}></StickerCell>
                                <StickerCell num={19}></StickerCell>
                                <StickerCell num={20}></StickerCell>
                                <StickerCell num={9}></StickerCell>
                                <StickerCell num={10}></StickerCell>
                                <StickerCell num={11}></StickerCell>
                                <StickerCell num={45}></StickerCell>
                                <StickerCell num={46}></StickerCell>
                                <StickerCell num={47}></StickerCell>
                            </tr>
                            <tr>
                                <StickerCell num={39}></StickerCell>
                                <StickerCell num={40}>L</StickerCell>
                                <StickerCell num={41}></StickerCell>
                                <StickerCell num={21}></StickerCell>
                                <StickerCell num={22}>F</StickerCell>
                                <StickerCell num={23}></StickerCell>
                                <StickerCell num={12}></StickerCell>
                                <StickerCell num={13}>R</StickerCell>
                                <StickerCell num={14}></StickerCell>
                                <StickerCell num={48}></StickerCell>
                                <StickerCell num={49}>B</StickerCell>
                                <StickerCell num={50}></StickerCell>
                            </tr>
                            <tr>
                                <StickerCell num={42}></StickerCell>
                                <StickerCell num={43}></StickerCell>
                                <StickerCell num={44}></StickerCell>
                                <StickerCell num={24}></StickerCell>
                                <StickerCell num={25}></StickerCell>
                                <StickerCell num={26}></StickerCell>
                                <StickerCell num={15}></StickerCell>
                                <StickerCell num={16}></StickerCell>
                                <StickerCell num={17}></StickerCell>
                                <StickerCell num={51}></StickerCell>
                                <StickerCell num={52}></StickerCell>
                                <StickerCell num={53}></StickerCell>
                            </tr>
                            <tr>
                                <td rowSpan={3} colSpan={3}></td>
                                <StickerCell num={27}></StickerCell>
                                <StickerCell num={28}></StickerCell>
                                <StickerCell num={29}></StickerCell>
                                <td rowSpan={3} colSpan={6}></td>
                            </tr>
                            <tr>
                                <StickerCell num={30}></StickerCell>
                                <StickerCell num={31}>D</StickerCell>
                                <StickerCell num={32}></StickerCell>
                            </tr>
                            <tr>
                                <StickerCell num={33}></StickerCell>
                                <StickerCell num={34}></StickerCell>
                                <StickerCell num={35}></StickerCell>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </DialogContent>
            </Dialog>
            <Dialog open={isColorSelectDialogOpen} onClose={handleDialogColorClose}>
                <DialogTitle>予想する色を選んでください</DialogTitle>
                <DialogContent>
                    {colorConversionList.map((color, index) =>
                        <span key={index}>
                            <StyledColorButton
                                sx={{
                                    backgroundColor: color[2],
                                    '&:hover': {
                                        backgroundColor: color[2],
                                    },
                                }}
                                onClick={() => handleDialogColorClick(index)}
                            >
                                <span style={{color: color[3]}}>{color[1]}</span>
                            </StyledColorButton>
                            {index === 2 ? <br/> : ""}
                        </span>
                    )}
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
                            scramble={scramble + " " + solutionListToString(mySolutionListWithoutNewLine(mySolutionList))}
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
                            scramble={scramble + " " + solutionListToString(mySolutionListWithoutNewLine(mySolutionList))}
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
