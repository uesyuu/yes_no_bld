import {Dialog, DialogContent, DialogTitle} from "@mui/material";

const StickerSelectDialog = (props) => {

    const StickerCell = (childProps) => {
        return <td
            style={{
                width: "30px",
                height: "30px",
                border: "1px solid black",
                textAlign: "center"
            }}
            onClick={() => props.onStickerClick(childProps.num)}
        >
            {childProps.children}
        </td>
    }

    return (
        <Dialog open={props.isOpen} onClose={props.onClose}>
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
    )
}

export default StickerSelectDialog