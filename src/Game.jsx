import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import moment from "moment";
import {randomCube, solve} from "min2phase/src/min2phase";
import algUtil from './lib/algUtil'
import Cube from "cubejs"
import cubeJsUtil from "./lib/cubejsUtil"
import FailureDialog from "./component/FailureDialog";
import CorrectDialog from "./component/CorrectDialog";
import ColorSelectDialog from "./component/ColorSelectDialog";
import StickerSelectDialog from "./component/StickerSelectDialog";
import LoadingContent from "./component/LoadingContent";
import NotationContent from "./component/NotationContent";
import AnswerDisplay from "./component/AnswerDisplay";
import ErrorDisplay from "./component/ErrorDisplay";
import InputDisplay from "./component/InputDisplay";

const Game = (props) => {

    const navigate = useNavigate()

    const StyledContainer = styled(Box)(() => ({
        margin: '0 auto',
        padding: '20px',
        maxWidth: '500px'
    }))

    const StyledButton = styled(Button)(({theme}) => ({
        margin: theme.spacing(1),
        width: props.width,
        height: '30px'
    }))

    const faceletConversionList = [
        "UBL", "UB", "UBR", "UL", "Uセンター", "UR", "UFL", "UF", "UFR",
        "RUF", "RU", "RUB", "RF", "Rセンター", "RB", "RDF", "RD", "RDB",
        "FUL", "FU", "FUR", "FL", "Fセンター", "FR", "FDL", "FD", "FDR",
        "DFL", "DF", "DFR", "DL", "Dセンター", "DR", "DBL", "DB", "DBR",
        "LUB", "LU", "LUF", "LB", "Lセンター", "LF", "LDB", "LD", "LDF",
        "BUR", "BU", "BUL", "BR", "Bセンター", "BL", "BDR", "BD", "BDL",
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
    const [questionCount, setQuestionCount] = useState(0)
    const [tabValue, setTabValue] = useState(0)
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

    useEffect(() => {
        if (time >= 1 && isLoading) {
            setIsLoading(false)
        }
    }, [time])

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
        setTabValue(0)
        setYesNoAnswer("")
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

    const handleDialogColorClick = (face, color) => {
        setIsColorSelectDialogOpen(false)
        setQuestionCount((count) => count + 1)
        setYesNoAnswer(`質問: ${faceletConversionList[selectedStickerNum]}の色は${color}ですか？ 答え: ${faceletList[selectedStickerNum] === face ? "Yes!" : "No!"}`)
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
                    <ErrorDisplay>{incorrectMessage}</ErrorDisplay>
                    <AnswerDisplay>{yesNoAnswer}</AnswerDisplay>
                    <Box display={"flex"} justifyContent={"center"}>
                        <StyledButton variant='contained' color='primary' width='150px'
                                      onClick={judgeSolution}>完成しました!</StyledButton>
                        <StyledButton variant='contained' color='primary' width='120px'
                                      onClick={giveUpGame}>降参する</StyledButton>
                    </Box>
                    <InputDisplay>{solutionListToStringWithNewLine(mySolutionList)}</InputDisplay>

                    <Typography>スクランブル: {scramble}</Typography>
                    <Typography>faceletList: {faceletList.join("")}</Typography>

                    <Box display={"flex"} justifyContent={"center"}>
                        <StyledButton variant='contained' color='success' width='120px'
                                      onClick={askQuestion}>質問する</StyledButton>
                        <StyledButton variant='contained' color='primary' width='120px'
                                      onClick={() => addMove("n")}>改行する</StyledButton>
                        <StyledButton variant='contained' color='error' width='120px'
                                      onClick={removeMove}>1文字削除</StyledButton>
                    </Box>
                    <NotationContent
                        tabValue={tabValue} // どうにかして子コンポーネントにstateを持たせたい
                        setTabValue={setTabValue}
                        addMove={(move) => addMove(move)}
                    />
                </StyledContainer>
            }
            {isLoading &&
                <LoadingContent/>
            }
            <StickerSelectDialog
                isOpen={isStickerSelectDialogOpen}
                onClose={handleDialogStickerClose}
                onStickerClick={handleDialogStickerClick}
            />
            <ColorSelectDialog
                isOpen={isColorSelectDialogOpen}
                onClose={handleDialogColorClose}
                onColorClick={handleDialogColorClick}
            />
            <CorrectDialog
                isOpen={isCorrectDialogOpen}
                realTime={realTime}
                questionCount={questionCount}
                scramble={scramble + " " + solutionListToString(mySolutionListWithoutNewLine(mySolutionList))}
                startGame={startGame}
            />
            <FailureDialog
                isOpen={isFailureDialogOpen}
                realTime={realTime}
                questionCount={questionCount}
                scramble={scramble + " " + solutionListToString(mySolutionListWithoutNewLine(mySolutionList))}
                startGame={startGame}
            />
        </div>
    )
}

export default Game
