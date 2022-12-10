import {Button, Dialog, DialogContent, DialogTitle} from "@mui/material";
import {styled} from "@mui/material/styles";

const ColorSelectDialog = (props) => {

    const colorConversionList = [
        ["U", "白", "white", "black"],
        ["D", "黄色", "yellow", "black"],
        ["F", "緑", "green", "white"],
        ["B", "青", "blue", "white"],
        ["R", "赤", "red", "white"],
        ["L", "オレンジ", "orange", "black"],
    ]

    const StyledColorButton = styled(Button)(() => ({
        margin: '5px 5px',
    }))

    return (
        <Dialog open={props.isOpen} onClose={props.onClose}>
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
                                onClick={() => props.onColorClick(
                                    colorConversionList[index][0],
                                    colorConversionList[index][1]
                                )}
                            >
                                <span style={{color: color[3]}}>{color[1]}</span>
                            </StyledColorButton>
                        {index === 2 ? <br/> : ""}
                        </span>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default ColorSelectDialog