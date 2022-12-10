import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";

const About = () => {

    const navigate = useNavigate()

    const StyledContainer = styled(Box)(() => ({
        margin: '0 auto',
        padding: '20px',
        maxWidth: '500px'
    }))

    const StyledBlock = styled(Box)(() => ({
        margin: '20px 0'
    }))

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
                    <Typography variant='h3'>遊び方</Typography>
                </Box>
                <StyledBlock display={"flex"}>
                    <Typography variant='body1'>
                        Yes/No BLDとは、キューブが見えない状態で、YesかNoかで答えられる質問の答えのみを頼りに手探りでキューブを解いていく遊びです<br/>
                        このアプリでは、「UFRのステッカーの色は白ですか？」といったステッカーの色に関するYes/No質問のみでキューブを解く必要があります<br/>
                        <br/>
                    </Typography>
                </StyledBlock>
                <StyledBlock display={"flex"} justifyContent={"center"}>
                    <Typography variant='h5'>遊び方解説</Typography>
                </StyledBlock>
                <StyledBlock display={"flex"}>
                    <Typography variant='body1'>
                        ホーム画面でスタートボタンを押すとゲームが開始します<br/>
                        ゲームは2つのフェーズに分けられます<br/>
                        <ul>
                            <li>質問フェーズ</li>
                            <li>回答フェーズ</li>
                        </ul>
                    </Typography>
                </StyledBlock>
                <StyledBlock display={"flex"}>
                    <Typography variant='h6' align='left'>質問フェーズ</Typography>
                </StyledBlock>
                <StyledBlock display={"flex"}>
                    <Typography variant='body1'>
                        質問フェーズではアプリにステッカーの色に関する質問を投げかけます<br/>
                        <br/>
                        質問するボタンを押すと、ステッカーを選ぶダイアログが表示されます<br/>
                        キューブの展開図が表示されるので、質問したいステッカーをクリックしましょう<br/>
                    </Typography>
                </StyledBlock>
                <StyledBlock display={"flex"} justifyContent={"center"}>
                    <Typography variant='body1'>
                        <img
                            src={`${process.env.PUBLIC_URL}/image/dialog_sticker.jpg`}
                            width="300px"
                            alt=""
                        />
                    </Typography>
                </StyledBlock>
                <StyledBlock display={"flex"}>
                    <Typography variant='body1'>
                        ステッカーをクリックすると、色を選ぶダイアログが表示されます<br/>
                        適当な色を選びましょう<br/>
                    </Typography>
                </StyledBlock>
                <StyledBlock display={"flex"} justifyContent={"center"}>
                    <Typography variant='body1'>
                        <img
                            src={`${process.env.PUBLIC_URL}/image/dialog_color.jpg`}
                            width="300px"
                            alt=""
                        />
                    </Typography>
                </StyledBlock>
                <StyledBlock display={"flex"}>
                    <Typography variant='body1'>
                        色を選ぶとゲーム画面に戻り、選んだステッカーが選んだ色であるかの答えがYes/Noで表示されます<br/>
                        この情報をもとにキューブを解いていきましょう<br/>
                    </Typography>
                </StyledBlock>
                <StyledBlock display={"flex"} justifyContent={"center"}>
                    <Typography variant='body1'>
                        <img
                            src={`${process.env.PUBLIC_URL}/image/yes_no_answer.jpg`}
                            width="300px"
                            alt=""
                        />
                    </Typography>
                </StyledBlock>
                <StyledBlock display={"flex"}>
                    <Typography variant='h6' align='left'>回答フェーズ</Typography>
                </StyledBlock>
                <StyledBlock display={"flex"}>
                    <Typography variant='body1'>
                        回答フェーズでは、予想するキューブの解法を入力していきます<br/>
                        <br/>
                        画面下部に回転記号ボタンがあり入力ができます<br/>
                        タブを切り替えることで、二層回し、スライス、持ち替えの記号も入力できます<br/>
                        また、改行ボタンを押すことで表示される解法を改行、1文字削除ボタンを押すことで解法の末尾を削除できます<br/>
                    </Typography>
                </StyledBlock>
                <StyledBlock display={"flex"} justifyContent={"center"}>
                    <Typography variant='body1'>
                        <img
                            src={`${process.env.PUBLIC_URL}/image/notation_button.jpg`}
                            width="300px"
                            alt=""
                        />
                    </Typography>
                </StyledBlock>
                <StyledBlock display={"flex"}>
                    <Typography variant='body1'>
                        キューブが完成したと思ったら、完成しました!ボタンを押してください<br/>
                        完成している場合、成功ダイアログが表示されます<br/>
                        完成していない場合は不正解と表示され、ゲームが続行されます<br/>
                    </Typography>
                </StyledBlock>
                <StyledBlock display={"flex"} justifyContent={"center"}>
                    <Typography variant='body1'>
                        <img
                            src={`${process.env.PUBLIC_URL}/image/finish_solve.jpg`}
                            width="300px"
                            alt=""
                        />
                    </Typography>
                </StyledBlock>
                <StyledBlock display={"flex"}>
                    <Typography variant='body1'>
                        成功ダイアログにはタイムと質問回数が表示され、結果をツイートすることもできます。<br/>
                    </Typography>
                </StyledBlock>
                <StyledBlock display={"flex"} justifyContent={"center"}>
                    <Typography variant='body1'>
                        <img
                            src={`${process.env.PUBLIC_URL}/image/dialog_success.jpg`}
                            width="300px"
                            alt=""
                        />
                    </Typography>
                </StyledBlock>
                <StyledBlock display={"flex"}>
                    <Typography variant='body1'>
                        また、ホーム画面から記録画面に移ると、成功したときのタイムのランキングと質問回数のランキングが確認できます。<br/>
                    </Typography>
                </StyledBlock>
                <StyledBlock display={"flex"} justifyContent={"center"}>
                    <Typography variant='body1'>
                        <img
                            src={`${process.env.PUBLIC_URL}/image/result_ranking.jpg`}
                            width="300px"
                            alt=""
                        />
                    </Typography>
                </StyledBlock>
                <StyledBlock display={"flex"} justifyContent={"center"}>
                    <Typography variant='h5'>用語</Typography>
                </StyledBlock>
                <StyledBlock display={"flex"}>
                    <Typography variant='h6' align='left'>回転記号</Typography>
                </StyledBlock>
                <StyledBlock display={"flex"}>
                    <Typography variant='body1'>
                        ルービックキューブの回転を記号で表したものです<br/>
                        <ul>
                            <li>U = 上面, D = 下面, R = 右面, L = 左面, F = 前面, B = 後面</li>
                            <li>Uは上面を時計回りに90度回すこと</li>
                            <li>U'は上面を反時計回りに90度回すこと</li>
                            <li>U2は上面を180度回すこと</li>
                        </ul>
                        を意味します。
                        回答はこの記号を使って答えてください。<br/>
                        参考: <a href="https://cubevoyage.net/how-to-solve/intermediate/notation/">回転記号とは？ - Cube
                        Voyage -</a>
                    </Typography>
                </StyledBlock>
            </StyledContainer>
        </div>
    )
}

export default About
