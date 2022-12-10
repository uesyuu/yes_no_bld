import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography} from "@mui/material";
import timeLib from "../lib/time";
import CubePlayer from "./CubePlayer";
import {TwitterShareButton} from "react-share";
import {useNavigate} from "react-router-dom";

const CorrectDialog = (props) => {
    const navigate = useNavigate()

    return (
        <Dialog open={props.isOpen}>
            <DialogTitle>完成!</DialogTitle>
            <DialogContent>
                <DialogContentText align={"center"}>
                    お見事!<br/>
                    かかった時間: {timeLib.format(props.realTime)}<br/>
                    質問回数: {props.questionCount}回<br/>
                    <CubePlayer
                        scramble={props.scramble}
                    /><br/>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' color='primary'>
                    <TwitterShareButton
                        url={"Yes/No BLDを成功させました！\n"
                            + `タイム: ${timeLib.format(props.realTime)}\n`
                            + `質問回数: ${props.questionCount}回\n`
                            + 'https://uesyuu.github.io/yes_no_bld #YesNoBLD'}>
                        <Typography variant='body2'>Twitterでシェア</Typography>
                    </TwitterShareButton>
                </Button>
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

export default CorrectDialog