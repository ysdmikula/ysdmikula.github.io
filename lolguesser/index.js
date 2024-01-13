const requestHeader = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 OPR/105.0.0.0",
    "Accept-Language": "cs-CZ,cs;q=0.9",
    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    "Origin": "https://developer.riotgames.com",
    "X-Riot-Token": "RGAPI-ab597443-94c7-446a-a797-f473df3016d9"
};

const champs = [];
const img = document.querySelector('#splashArt');
const boxSideLength = canvasSideLength = 150;
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const body = document.querySelector("body");
const canvasImg = new Image();
const userInput = document.querySelector("#guess");
const guessBtn = document.querySelector("#guessBtn");
const error = document.querySelector("#error");
const errorMsg = "Enter a guess";
const alias = {
    wukong : "monkey king"
}
let champsAmount = 0;

let champToGuess = "";
let imgHeight;
let imgWidth;
let offsetTop;
let offsetLeft;

init()

async function init() {
    await getChamps();
    champsAmount = champs.length;
    body.addEventListener("keyup", e => {
        if (e.key == "Enter") {
            guessBtn.click()
        }
    });
    img.addEventListener("animationend", e => {
        img.classList.toggle(img.classList[0])
        random()
    })
    
    //no fking clue why I have to call it twice the first time
    setTimeout(() => {
        random()
        setTimeout(() => {
            random()

        }, 1000)
    }, 1000)


}

async function getChamps() {
    let response = await fetch("https://ddragon.leagueoflegends.com/cdn/14.1.1/data/en_US/champion.json", requestHeader);
    let data = await response.json();
    let champsData = data.data
    for (const key in champsData) {
        champs.push(key)
    }
}

async function getChamp(name) {
    let response = await fetch("https://ddragon.leagueoflegends.com/cdn/14.1.1/data/en_US/champion/" + name + ".json", requestHeader);
    let data = await response.json();
    let champ = data.data[name];
    return champ;
}

async function getSkin(name) {
    let champ = await getChamp(name);
    let skins = champ.skins;
    return skins[Math.floor(Math.random() * skins.length)].num;
}

function renderImg(champName, id) {
    img.src = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + champName + "_" + id + ".jpg";
    imgHeight = img.height
    imgWidth = img.width

    canvasImg.src = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + champName + "_" + id + ".jpg"
    canvasImg.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        offsetTop = Math.ceil(Math.random() * (imgHeight - boxSideLength)) * -1
        offsetLeft = Math.ceil(Math.random() * (imgWidth - boxSideLength))  * -1
        ctx.drawImage(canvasImg, offsetLeft,  offsetTop, imgWidth, imgHeight);
    }
}

function changeCanvasWidth() {
    canvas.width += 100;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(canvasImg, offsetLeft,  offsetTop, imgWidth, imgHeight);
}

function rescaleImg() {
    let rescale = 1.2

    let oldCanvasWidth = canvas.width
    canvas.width = canvas.width * rescale < imgWidth ? canvas.width * rescale : imgWidth
    let canvasWidthChange = canvas.width - oldCanvasWidth
    let oldCanvasHeight = canvas.height
    canvas.height = canvas.height * rescale < imgHeight ? canvas.height * rescale : imgHeight
    let canvasHeightChange = canvas.height - oldCanvasHeight

    offsetLeft = offsetLeft + canvasWidthChange < 0 ? offsetLeft + canvasWidthChange : 0
    offsetTop = offsetTop + canvasHeightChange < 0 ? offsetTop + canvasHeightChange : 0

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(canvasImg, offsetLeft, offsetTop, imgWidth, imgHeight);
}

//LOOKUP reading a blob?
// async function getSkin(name, id) {
//     let response = await fetch("https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + name + "_" + id + ".jpg", requestHeader);
//     let data = await response.blob();
//     console.log(data)
// }

function chooseRandomChamp() {
    return champs[Math.floor(Math.random() * champs.length)];
}

async function random() {
    canvas.width = canvasSideLength
    canvas.height = canvasSideLength
    errorMsg.textContent = "";

    let chosenChamp = chooseRandomChamp();
    champToGuess = chosenChamp;
    let chosenSkin = await getSkin(chosenChamp);
    renderImg(chosenChamp, chosenSkin);
}

function checkAnswer() {
    let champToGuessLowerCase = champToGuess.toLowerCase();
    let answerLowerCase = userInput.value.toLowerCase().replace(/[\.\'\s]]/i, "");
    
    let isCorrect = (answerLowerCase == champToGuessLowerCase);
    if (alias.hasOwnProperty(userInput.value)) {
        answerLowerCase = alias[userInput.value]
    }
    if (answerLowerCase != "" && champToGuess != "") {
        WinLoss(isCorrect);
        errorMsg.textContent = "";

    } else {
        //TODO error message empty input
        error.textContent = errorMsg
    }

}

function WinLoss(isCorrect) {
    if (isCorrect) {
        showFullImg()
        userInput.value = "";
        changeBoxShadow("green")
    } else {
        changeBoxShadow("red")
        rescaleImg()
    }

}

function showFullImg() {
    if (!img.classList.contains("show")) {
        img.classList.toggle("show")
    }
}

function changeBoxShadow(color) {
    canvas.style.setProperty("--clr", color);
    setTimeout(e => {
        canvas.style.setProperty("--clr", "black");
    },1000)
    
}