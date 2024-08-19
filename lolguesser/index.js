const requestHeader = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 OPR/105.0.0.0",
    "Accept-Language": "cs-CZ,cs;q=0.9",
    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    "Origin": "https://developer.riotgames.com",
    "X-Riot-Token": "RGAPI-94f1441d-5aa9-4178-b4c4-22d14bf39ad9"
};

const champs = [];
const img = document.querySelector('#splashArt');
const champList = document.querySelector('#champList');
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

const logo = document.querySelector("#trademark");
const lolguesser = document.querySelector("#lolguesser");
const randomPick = document.querySelector("#randomPick");

init()

async function init() {
    await getChamps();
    console.log(champs);

    champsAmount = champs.length;
    
    champs.forEach(champ => {
        for (const key in alias) {
            let newName = alias[key];
            if (cleanString(newName) == cleanString(champ.name)) {
                champ.name = key;
            }
        }
        
    })

    body.addEventListener("keyup", e => {
        if (e.key == "Enter") {
            guessBtn.click()
        }
    });
    img.addEventListener("animationend", e => {
        img.classList.toggle(img.classList[0])
        random()
    })

    let observer = new MutationObserver((mutationList, observer) => {
        if (userInput.value == "") {
            champList.classList.remove("show")
            return
        } 
        champList.classList.add("show")
        champList.innerHTML = ""

        champs.forEach(champ => {
            if (cleanString(champ.name).includes(userInput.value)) {
                champList.insertAdjacentHTML("beforeend", 
                `            
                <div class="champ" id="${champ.name}">
                    <img src="${champ.icon}" alt="">
                    <span>${champ.name}</span>
                </div>
             `)
            }
        })

        document.querySelectorAll(".champ").forEach(row => {
            row.addEventListener("click", () => {
                userInput.value = row.id
                checkAnswer()
            })
        })

    });

    observer.observe(userInput, { attributes: true });

    userInput.addEventListener("input", e => {
        userInput.setAttribute("value", userInput.value)
    })
    // userInput.addEventListener("input", e => {
    //     console.log(cleanString(userInput.value));
    //     if (userInput.value == "") {
    //         champList.classList.remove("show")
    //         return
    //     } 
    //     champList.classList.add("show")
    //     champList.innerHTML = ""

    //     champs.forEach(champ => {
    //         let name = champ.name
    //         if (cleanString(name).includes(userInput.value)) {
    //             champList.insertAdjacentHTML("beforeend", 
    //             `            
    //             <div class="champ" id="${champ.name}">
    //                 <img src="${champ.icon}" alt="">
    //                 <span>${name}</span>
    //             </div>
    //          `)
    //         }
    //     })
    // })
    
    //no fking clue why I have to call it twice the first time
    setTimeout(() => {
        random()
        setTimeout(() => {
            random()

        }, 1000)
    }, 1000)


}

logo.addEventListener("click", e => {
    lolguesser.classList.toggle("displayNone");
    randomPick.classList.toggle("displayNone");
})


async function getChamps() {
    let response = await fetch("https://ddragon.leagueoflegends.com/cdn/14.1.1/data/en_US/champion.json", requestHeader);
    let data = await response.json();
    let champsData = data.data
    console.log(champsData);
    for (const key in champsData) {
        let obj = {}
        obj.name = key
        obj.icon = `https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/${key}.png`
        champs.push(obj)
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
    let chosenChampName = chosenChamp.name
    champToGuess = chosenChampName;
    let chosenSkin = await getSkin(chosenChampName);
    renderImg(chosenChampName, chosenSkin);
}

function checkAnswer() {
    let champToGuessLowerCase = champToGuess.toLowerCase();
    let answerLowerCase = cleanString(userInput.value);
    
    let isCorrect = (answerLowerCase == champToGuessLowerCase);
    if (answerLowerCase != "" && champToGuess != "") {
        WinLoss(isCorrect);
        errorMsg.textContent = "";
    } else {
        error.textContent = errorMsg
    }

}

function cleanString(string) {
    return string.toLowerCase().replace(/[\s'\.]/gi, "")
}

function WinLoss(isCorrect) {
    if (isCorrect) {
        champList.classList.remove("show")
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


