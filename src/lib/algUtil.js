const algUtil = (function() {
    let faceList = ["U", "R", "F", "D", "L", "B"]
    const rotateX = [2, 1, 3, 5, 4, 0]
    const rotateXPrime = [5, 1, 0, 2, 4, 3]
    const rotateX2 = [3, 1, 5, 0, 4, 2]
    const rotateY = [0, 5, 1, 3, 2, 4]
    const rotateYPrime = [0, 2, 4, 3, 5, 1]
    const rotateY2 = [0, 4, 5, 3, 1, 2]
    const rotateZ = [4, 0, 2, 1, 3, 5]
    const rotateZPrime = [1, 3, 2, 4, 0, 5]
    const rotateZ2 = [3, 4, 2, 0, 1, 5]

    const rotate = (faceList, rotateList) => {
        const resultFaceList = [0, 1, 2, 3, 4, 5]
        for (let i = 0; i < 6; i++) {
            resultFaceList[i] = faceList[rotateList[i]]
        }
        return resultFaceList
    }

    const notationToIndex = (notation) => {
        let index
        switch (notation) {
            case "U": {
                index = 0
                break
            }
            case "R": {
                index = 1
                break
            }
            case "F": {
                index = 2
                break
            }
            case "D": {
                index = 3
                break
            }
            case "L": {
                index = 4
                break
            }
            case "B": {
                index = 5
                break
            }
            default: {
                index = 0
                break
            }
        }
        return index
    }

    const makeRotationLessAlg = (notationList) => {
        let currentFaceList = [0, 1, 2, 3, 4, 5]
        const scrambleList = convertAlgToDefaultNotationAndRotation(notationList)
        const resultScrambleList = []
        const resultRotationList = []
        for (let i = 0; i < scrambleList.length; i++) {
            if (scrambleList[i] === "x") {
                currentFaceList = rotate(currentFaceList, rotateX)
                resultRotationList.push(scrambleList[i])
            } else if (scrambleList[i] === "x'") {
                currentFaceList = rotate(currentFaceList, rotateXPrime)
                resultRotationList.push(scrambleList[i])
            } else if (scrambleList[i] === "x2") {
                currentFaceList = rotate(currentFaceList, rotateX2)
                resultRotationList.push(scrambleList[i])
            } else if (scrambleList[i] === "y") {
                currentFaceList = rotate(currentFaceList, rotateY)
                resultRotationList.push(scrambleList[i])
            } else if (scrambleList[i] === "y'") {
                currentFaceList = rotate(currentFaceList, rotateYPrime)
                resultRotationList.push(scrambleList[i])
            } else if (scrambleList[i] === "y2") {
                currentFaceList = rotate(currentFaceList, rotateY2)
                resultRotationList.push(scrambleList[i])
            } else if (scrambleList[i] === "z") {
                currentFaceList = rotate(currentFaceList, rotateZ)
                resultRotationList.push(scrambleList[i])
            } else if (scrambleList[i] === "z'") {
                currentFaceList = rotate(currentFaceList, rotateZPrime)
                resultRotationList.push(scrambleList[i])
            } else if (scrambleList[i] === "z2") {
                currentFaceList = rotate(currentFaceList, rotateZ2)
                resultRotationList.push(scrambleList[i])
            } else {
                const currentNotation = scrambleList[i].split("")
                let resultNotation = ""
                if (currentNotation.length === 1) {
                    resultNotation = faceList[currentFaceList[notationToIndex(currentNotation[0])]]
                } else if (currentNotation.length === 2) {
                    resultNotation = faceList[currentFaceList[notationToIndex(currentNotation[0])]] + currentNotation[1]
                }
                resultScrambleList.push(resultNotation)
            }
        }
        return [resultScrambleList, resultRotationList]
    }

    const notationConversionList = [
        ["M", "R L' x'"],
        ["M'", "R' L x"],
        ["M2", "R2 L2 x2"],
        ["S", "F' B z"],
        ["S'", "F B' z'"],
        ["S2", "F2 B2 z2"],
        ["E", "U D' y'"],
        ["E'", "U' D y"],
        ["E2", "U2 D2 y2"],
        ["Uw", "D y"],
        ["Uw'", "D' y'"],
        ["Uw2", "D2 y2"],
        ["Dw", "U y'"],
        ["Dw'", "U' y"],
        ["Dw2", "U2 y2"],
        ["Rw", "L x"],
        ["Rw'", "L' x'"],
        ["Rw2", "L2 x2"],
        ["Lw", "R x'"],
        ["Lw'", "R' x"],
        ["Lw2", "R2 x2"],
        ["Fw", "B z"],
        ["Fw'", "B' z'"],
        ["Fw2", "B2 z2"],
        ["Bw", "F z'"],
        ["Bw'", "F' z"],
        ["Bw2", "F2 z2"],
    ]

    const convertAlgToDefaultNotationAndRotation = (notationList) => {
        const resultNotationList = []
        for (let i = 0; i < notationList.length; i++) {
            let flag = true
            for (let j = 0; j < notationConversionList.length; j++) {
                if (notationList[i] === notationConversionList[j][0]) {
                    resultNotationList.push(notationConversionList[j][1])
                    flag = false
                    break
                }
            }
            if (flag) {
                resultNotationList.push(notationList[i])
            }
        }
        return resultNotationList.join(" ").split(" ")
    }

    return {
        makeRotationLessAlg: makeRotationLessAlg
    }
})();

module.exports = algUtil