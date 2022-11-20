const cubeJsUtil = (function () {

    const faceletConversionList = [
        ["x", [
            18, 19, 20, 21, 22, 23, 24, 25, 26, // F
            15, 12, 9, 16, 13, 10, 17, 14, 11, // R
            27, 28, 29, 30, 31, 32, 33, 34, 35, // D
            53, 52, 51, 50, 49, 48, 47, 46, 45, // B
            38, 41, 44, 37, 40, 43, 36, 39, 42, // L
            8, 7, 6, 5, 4, 3, 2, 1, 0, // U
        ]],
        ["y", [
            6, 3, 0, 7, 4, 1, 8, 5, 2, // U
            45, 46, 47, 48, 49, 50, 51, 52, 53, // B
            9, 10, 11, 12, 13, 14, 15, 16, 17, // R
            29, 32, 35, 28, 31, 34, 27, 30, 33,  // D
            18, 19, 20, 21, 22, 23, 24, 25, 26, // F
            36, 37, 38, 39, 40, 41, 42, 43, 44, // L
        ]],
        ["z", [
            42, 39, 36, 43, 40, 37, 44, 41, 38, // L
            6, 3, 0, 7, 4, 1, 8, 5, 2,  // U
            24, 21, 18, 25, 22, 19, 26, 23, 20, // F
            15, 12, 9, 16, 13, 10, 17, 14, 11, // R
            33, 30, 27, 34, 31, 28, 35, 32, 29, // D
            47, 50, 53, 46, 49, 52, 45, 48, 51, // B
        ]]
    ]

    const convertFaceletStringByRotation = (faceletList, rotationList) => {
        let newFaceletList = faceletList
        for (let i = 0; i < rotationList.length; i++) {
            if (rotationList[i] === "x") {
                newFaceletList = convertFaceletToNew(newFaceletList, 0)
            } else if (rotationList[i] === "x'") {
                newFaceletList = convertFaceletToNew(newFaceletList, 0)
                newFaceletList = convertFaceletToNew(newFaceletList, 0)
                newFaceletList = convertFaceletToNew(newFaceletList, 0)
            } else if (rotationList[i] === "x2") {
                newFaceletList = convertFaceletToNew(newFaceletList, 0)
                newFaceletList = convertFaceletToNew(newFaceletList, 0)
            } else if (rotationList[i] === "y") {
                newFaceletList = convertFaceletToNew(newFaceletList, 1)
            } else if (rotationList[i] === "y'") {
                newFaceletList = convertFaceletToNew(newFaceletList, 1)
                newFaceletList = convertFaceletToNew(newFaceletList, 1)
                newFaceletList = convertFaceletToNew(newFaceletList, 1)
            } else if (rotationList[i] === "y2") {
                newFaceletList = convertFaceletToNew(newFaceletList, 1)
                newFaceletList = convertFaceletToNew(newFaceletList, 1)
            } else if (rotationList[i] === "z") {
                newFaceletList = convertFaceletToNew(newFaceletList, 2)
            } else if (rotationList[i] === "z'") {
                newFaceletList = convertFaceletToNew(newFaceletList, 2)
                newFaceletList = convertFaceletToNew(newFaceletList, 2)
                newFaceletList = convertFaceletToNew(newFaceletList, 2)
            } else if (rotationList[i] === "z2") {
                newFaceletList = convertFaceletToNew(newFaceletList, 2)
                newFaceletList = convertFaceletToNew(newFaceletList, 2)
            }
        }
        return newFaceletList
    }

    const convertFaceletToNew = (faceletList, rotationNum) => {
        let newFaceletList = new Array(54)
        for (let j = 0; j < faceletConversionList[0][1].length; j++) {
            newFaceletList[j] = faceletList[faceletConversionList[rotationNum][1][j]]
        }
        return newFaceletList
    }

    return {
        convertFaceletStringByRotation: convertFaceletStringByRotation
    }
})();

module.exports = cubeJsUtil