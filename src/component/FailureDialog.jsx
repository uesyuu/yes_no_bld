import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography} from "@mui/material";
import timeLib from "../lib/time";
import CubePlayer from "./CubePlayer";
import {useNavigate} from "react-router-dom";

const FailureDialog = (props) => {
    const navigate = useNavigate()

    return (
        <Dialog open={props.isOpen}>
            <DialogTitle>失敗…</DialogTitle>
            <DialogContent>
                <DialogContentText align={"center"}>
                    残念…<br/>
                    かかった時間: {timeLib.format(props.realTime)}<br/>
                    質問回数: {props.questionCount}回<br/>
                    <CubePlayer
                        scramble={props.scramble}
                    /><br/>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' color='primary' onClick={props.startGame}>
                    <Typography variant='body2'>もう一度</Typography>
                </Button>
                <Button variant='contained' color='primary' onClick={() => navigate('/')}>
                    <Typography variant='body2'>ホームに戻る</Typography>
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default FailureDialog