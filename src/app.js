window.addEventListener('load', homePage)

function homePage() {

    let main = document.querySelector('main')

    let fragment = document.createDocumentFragment()

    let divEl = document.createElement('div')
    divEl.setAttribute('id', 'homePage')

    divEl.innerHTML = `
        <h1>Welcome to Guess the word!</h1>
        <button id="playBtn">Play</button>
        <button id="rulesBtn">Rules</button>
        <button id="language">BG</button>
    `
    fragment.appendChild(divEl)

    main.replaceChildren(fragment)

    let welcomeH1 = document.querySelector('#homePage h1')
    let playBtn = document.querySelector('#playBtn')
    let rulesBtn = document.querySelector('#rulesBtn')
    let languageBtn = document.querySelector('#language')

    if (languageBtn.textContent == 'EN') {
        welcomeH1.textContent = 'Welcome to Guess the word!'
        playBtn.textContent = 'Play'
        rulesBtn.textContent = 'Rules'
    } else {
        welcomeH1.textContent = 'Добре дошли в Познай думата!'
        playBtn.textContent = 'Играй'
        rulesBtn.textContent = 'Правила'
    }

    languageBtn.addEventListener('click', () => language(languageBtn, welcomeH1, playBtn, rulesBtn))
    playBtn.addEventListener('click', () => gamePage(main, languageBtn.textContent))
    rulesBtn.addEventListener('click', () => rulesPage(main, languageBtn.textContent))
}

function language(languageBtn, welcomeH1) {

    if (languageBtn.textContent == 'EN') {
        languageBtn.textContent = 'BG'
        welcomeH1.textContent = 'Добре дошли в познай думата!'
        playBtn.textContent = 'Играй'
        rulesBtn.textContent = 'Правила'
    } else {
        languageBtn.textContent = 'EN'
        welcomeH1.textContent = 'Welcome to Guess the word!'
        playBtn.textContent = 'Play'
        rulesBtn.textContent = 'Rules'
    }
}

function rulesPage(main, language) {
    let fragment = document.createDocumentFragment()

    let divEl = document.createElement('div')
    divEl.setAttribute('id', 'rulesPage')

    divEl.innerHTML = `
    ${language == 'EN'
    ? `<h2>Rules</h2>
    <p>The rules are... </p>
    <button id="mainMenu">Back</button>`
    : `<h2>Правила</h2>
    <p>При играта "Бесеница" или "Познай думата" може да си изберете категория и според нея,<br> ще Ви се даде произволна дума, която вие трябва да познаете. Имате право на 12 опита,<br> за да спечелите играта! При грешен опит ще се изрисува +1 елемент на човечето,<br> а при верен, ще се изпише буквата на всички места в думата.<br> Успех!</p>
    <button id="mainMenu">Назад</button>`
}
`

    fragment.appendChild(divEl)

    main.replaceChildren(fragment)

    document.querySelector('#mainMenu').addEventListener('click', () => homePage(main))
}

function gamePage(main, language, saveUser, saveWinCount, saveLoseCount, savePoints, saveOption) {

    let navigation = document.querySelector('nav')

    navigation.innerHTML = `
            <div>
                <table class="tableInformation">
                    <tr>
                        <th>Player |</th>
                        <th>Win |</th>
                        <th>Lose |</th>
                        <th>Points</th>
                    </tr>
                    <tr>
                        <td><span id="username"></span></td>
                        <td><span id="winCount">0</span></td>
                        <td><span id="loseCount">0</span></td>
                        <td><span id="points">0</span></td>
                    </tr>
                </table>
            </div>
    `

    let fragment = document.createDocumentFragment()

    let divEl = document.createElement('div')
    divEl.setAttribute('id', 'gamePage')

    divEl.innerHTML = `
    ${language == 'EN'
    ? `<h2>Game settings</h2>
        <input type="text" placeholder="Username" id="usernameInput">
        <br>
        <button id="letsGo">Let's go!</button>
        <select name="theme" id="gameOptionEN" class="gameOptions">
                <option >Country</option>
                <option >Capital</option>
                <option >City</option>
                <option >Village</option>
                <option >Animals</option>
                <option >Subject</option>
                <option >Rivers</option>
                <option >Sport</option>
        </select>`
    : ` <h2>Настройки на играта</h2>
        <input type="text" placeholder="Име" id="usernameInput">
        <br>
        <button id="letsGo">Старт!</button>
        <select name="theme" id="gameOptionBG" class="gameOptions">
                <option >Държава</option>
                <option >Столица</option>
                <option >Град</option>
                <option >Село</option>
                <option >Животно</option>
                <option >Предмет</option>
                <option >Реки</option>
                <option >Спорт</option>
            </select>`
}`

    fragment.appendChild(divEl)

    main.replaceChildren(fragment)

    let letsgoBtn = document.querySelector('#letsGo')

    let usernameInput = document.querySelector('#usernameInput')
    let username = document.querySelector('#username')
    let winCount = document.querySelector('#winCount')
    let loseCount = document.querySelector('#loseCount')
    let points = document.querySelector('#points')

    let option

    if (language == 'EN') {
        option = document.querySelector('#gameOptionEN')

        if (saveOption != undefined) {
            document.querySelector('#gameOptionEN').value = saveOption
        }
    } else {
        option = document.querySelector('#gameOptionBG')

        if (saveOption != undefined) {
            document.querySelector('#gameOptionBG').value = saveOption
        }
    }

    if (saveUser != undefined) {
        username.textContent = saveUser
        usernameInput.value = saveUser
        winCount.textContent = saveWinCount
        loseCount.textContent = saveLoseCount
        points.textContent = savePoints
    }

    letsgoBtn.addEventListener('click', () => {

        if (usernameInput.value == '' || usernameInput.value.trim() == '') {
            return alert('Inputs is required!')
        } else {
            username.textContent = usernameInput.value
        }

        validateGameWord(divEl, language, option.value)
    })

}

function validateGameWord(divEl, language, option) {

    let wordInput = getInfoFor(option, language)

    let alphabetEN = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    let alphabetBG = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ь', 'Ю', 'Я']

    divEl.innerHTML = `
        ${language == 'EN'
        ? `<section class="gameStructure">
                <div>
                    <img src="./src/images/0.png" id="mainImage">
                </div>
                <div id="hElementsAndP">
                    <h4 id="gameThemeOption">Game option: ${option}</h4>
                    <h4 id="wrongLetter">Wrong Letters: 0</h4>
                    <h4 id="correctLetter">Correct Letters: 0</h4>
                    <h4>Word length: ${wordInput.length}</h4>
                    <p id="guessWord"></p>
                </div>
            </section>
            <div id="allWords">${alphabetEN.map(x => `<button>${x}</button>`).join('')}</div>
        `
        : `<section class="gameStructure">
                <div>
                    <img src="./src/images/0.png" id="mainImage">
                </div>
                <div id="hElementsAndP">
                    <h4 id="gameThemeOption">Тип дума: ${option}</h4>
                    <h4 id="wrongLetter">Грешни букви: 0</h4>
                    <h4 id="correctLetter">Верни букви: 0</h4>
                    <h4>Дължина на думата: ${wordInput.length}</h4>
                    <p id="guessWord"></p>
                </div>
            </section>
            <div id="allWords">${alphabetBG.map(x => `<button>${x}</button>`).join('')}</div>`
    }
    `

    let wordArr = []

    for (let i = 0; i <= wordInput.length; i++) {

        if (i == 0) {
            wordArr.push(wordInput[i])
        }

        if (wordInput.length - 1 == i) {
            wordArr.push(wordInput[i])
            break
        }

        if (i != 0 && wordInput.length - 1 != i) {
            if (i != 0 && wordInput[i] == ' ') {
                wordArr.push('-')
            } else {
                wordArr.push('_')
            }
        }
    }

    let pWord = document.querySelector('#guessWord')
    if (language == 'EN') {
        pWord.textContent = `Word: ${wordArr.join(' ')}`
    } else {
        pWord.textContent = `Дума: ${wordArr.join(' ')}`
    }

    let allLetters = document.querySelector('#allWords')

    allLetters.childNodes.forEach(btn => btn.addEventListener('click', (event) => checkIfIncludeLetter(event, wordInput, language, option)))
}

function checkIfIncludeLetter(event, word, language, option) {
    let letter = event.currentTarget.textContent

    let allLetters = document.querySelector('#allWords')
    let guessWord = document.querySelector('#guessWord')
    let wrongLetter = document.querySelector('#wrongLetter')
    let correctLetter = document.querySelector('#correctLetter')
    let mainImage = document.querySelector('#mainImage')

    let correctCount = correctLetter.textContent.split(': ')[1]
    let wrongCount = wrongLetter.textContent.split(': ')[1]

    let wordArr = []

    Array.from(guessWord.textContent.split(': ')[1]).forEach(x => {
        if (x != ' ') {
            wordArr.push(x)
        } else if (x == '_') {
            wordArr.push('_')
        } else if (x == '-') {
            wordArr.push('-')
        }
    })

    
    let everyLetter = Array.from(word)

    if (word.includes(letter.toLowerCase())) {
        for (let i = 0; i < word.length; i++) {
            if (letter.toLowerCase() == everyLetter[i].toLowerCase()) {
                wordArr[i] = letter.toLowerCase()
            }
        }

        if (language == 'EN') {
            correctLetter.textContent = `Correct Letters: ${Number(correctCount) + 1}`
            guessWord.textContent = `Word: ${wordArr.join(' ')}`
        } else {
            correctLetter.textContent = `Верни букви: ${Number(correctCount) + 1}`
            guessWord.textContent = `Дума: ${wordArr.join(' ')}`
        }
    } else if (word.includes(letter.toUpperCase())) {
        for (let i = 0; i < word.length; i++) {
            if (letter.toUpperCase() == everyLetter[i].toUpperCase()) {
                wordArr[i] = letter.toUpperCase()
            }
        }

        if (language == 'EN') {
            correctLetter.textContent = `Correct Letters: ${Number(correctCount) + 1}`
            guessWord.textContent = `Word: ${wordArr.join(' ')}`
        } else {
            correctLetter.textContent = `Верни букви: ${Number(correctCount) + 1}`
            guessWord.textContent = `Дума: ${wordArr.join(' ')}`
        }
    } else {
        if (language == 'EN') {
            wrongLetter.textContent = `Wrong Letters: ${Number(wrongCount) + 1}`
        } else {
            wrongLetter.textContent = `Грешни букви: ${Number(wrongCount) + 1}`
        }

        mainImage.src = `/src/images/${Number(wrongCount) + 1}.png`
    }
    event.currentTarget.disabled = true
    event.currentTarget.style.backgroundColor = 'red'

    if (!wordArr.some(x => x == '_')) {
        winPage(wrongCount, language, word, option)
    } else if (Number(wrongCount) >= 11) {
        allLetters.childNodes.forEach(x => x.disabled = true)

        setTimeout(() => {
            losePage(language, word, option)
        }, 2000);
    }
}

function winPage(wrongCount, language, word, option) {

    let username = document.querySelector('#username')
    let winCount = document.querySelector('#winCount')
    let loseCount = document.querySelector('#loseCount')
    let points = document.querySelector('#points')

    winCount.textContent = Number(winCount.textContent) + 1
    let winPoints = 0

    if(wrongCount == 0) {
        points.textContent = Number(points.textContent) + 100
        winPoints = 100
    } else if(wrongCount > 0 && wrongCount <= 3) {
        points.textContent = Number(points.textContent) + 75
        winPoints = 75
    } else if(wrongCount > 3 && wrongCount <= 5) {
        points.textContent = Number(points.textContent) + 50
        winPoints = 50
    } else if(wrongCount > 5 && wrongCount <= 7) {
        points.textContent = Number(points.textContent) + 25
        winPoints = 25
    } else if(wrongCount > 7 && wrongCount <= 10) {
        points.textContent = Number(points.textContent) + 15
        winPoints = 15
    }

    let main = document.querySelector('main')

    let fragment = document.createDocumentFragment()

    let divEl = document.createElement('div')
    divEl.setAttribute('id', 'winPage')

    divEl.innerHTML = `
    ${language == 'EN'
    ? `
    <h2>Congratulations!</h2>
    <h4>Word: ${word}</h4>
    <h4>Wrong Letters: ${wrongCount}</h4>
    <button id="newGameBtn">New Game</button>
    `
    : `
    <h2>Поздравление!</h2>
    <h4>Дума: ${word}</h4>
    <h4>Точки: +${winPoints}</h4>
    <h4>Грешни букви: ${wrongCount}</h4>
    <button id="newGameBtn">Нова Игра</button>
    `}`

    fragment.appendChild(divEl)

    main.replaceChildren(fragment)

    

    document.querySelector('#newGameBtn').addEventListener('click', () => gamePage(main, language, username.textContent, winCount.textContent, loseCount.textContent, points.textContent, option))
}

function losePage(language, word, option) {
    let main = document.querySelector('main')

    let fragment = document.createDocumentFragment()

    let divEl = document.createElement('div')
    divEl.setAttribute('id', 'losePage')

    divEl.innerHTML = `
    ${language == 'EN'
    ? `
    <h2>Game Over!</h2>
    <h4>The word was: ${word}</h4>
    <button id="newGameBtn">New Game</button>
    `
    : `
    <h2>Ти загуби!</h2>
    <h4>Думата беше: ${word}</h4>
    <h4>Точки: -250</h4>
    <button id="newGameBtn">Нова Игра</button>
    `
}
`

    fragment.appendChild(divEl)

    main.replaceChildren(fragment)

    let username = document.querySelector('#username')
    let winCount = document.querySelector('#winCount')
    let loseCount = document.querySelector('#loseCount')
    let points = document.querySelector('#points')

    if(Number(points.textContent) >= 250) {
        points.textContent = Number(points.textContent) - 250
    } else { 
        points.textContent = 0
    }

    loseCount.textContent = Number(loseCount.textContent) + 1

    document.querySelector('#newGameBtn').addEventListener('click', () => gamePage(main, language, username.textContent, winCount.textContent, loseCount.textContent, points.textContent, option))

}

function getInfoFor(option, language) {

    if (language == 'EN') {
        let en = {
            Country: [],
            Capital: [],
            City: [],
            Village: [],
            Animals: [],
            Subject: [],
            Rivers: [],
            Sport: []
        }

        let randomWord = Math.floor(Math.random() * 25)

        return en[option][randomWord]
    } else {
        let bg = {
            Държава: ["Австралия", "Австрия", "Азербайджан", "Албания", "Алжир", "Ангола", "Андора", "Антигуа и Барбуда", "Аржентина", "Армения", "Афганистан", "Бангладеш", "Барбадос", "Бахамски острови", "Бахрейн", "Беларус", "Белгия", "Белиз", "Бенин", "Боливия", "Босна и Херцеговина", "Ботсвана", "Бразилия", "Бруней", "Буркина Фасо", "Бурунди", "Бутан", "България", "Вануату", "Ватикан", "Великобритания", "Венецуела", "Виетнам", "Габон", "Гамбия", "Гана", "Гватемала", "Гвиана", "Гвинея", "Гвинея Бисау", "Германия", "Гренада", "Грузия", "Гърция", "Дания", "Демократична република Конго", "Джибути", "Доминика", "Доминиканска република", "Египет", "Еквадор", "Екваториална Гвинея", "Еритрея", "Есватини", "Естония", "Етиопия", "Замбия", "Зимбабве", "Израел", "Източен Тимор", "Индия", "Индонезия", "Ирак", "Иран", "Ирландия", "Исландия", "Испания", "Италия", "Йемен", "Йордания", "Кабо Верде", "Казахстан", "Камбоджа", "Камерун", "Канада", "Катар", "Кения", "Кипър", "Киргизстан", "Кирибати", "Китай", "Колумбия", "Коморски острови", "Република Конго", "Коста Рика", "Куба", "Кувейт", "Лаос", "Латвия", "Лесото", "Либерия", "Либия", "Ливан", "Литва", "Лихтенщайн", "Люксембург", "Мавритания", "Мавриций", "Мадагаскар", "Малави", "Малайзия", "Малдиви", "Мали", "Малта", "Мароко", "Маршалови острови", "Мексико", "Мианмар", "Мозамбик", "Молдова", "Монако", "Монголия", "Намибия", "Науру", "Непал", "Нигер", "Нигерия", "Нидерландия", "Никарагуа", "Нова Зеландия", "Норвегия", "Обединени арабски емирства", "Оман", "Пакистан", "Палау", "Панама", "Папуа Нова Гвинея", "Парагвай", "Перу", "Полша", "Португалия", "Руанда", "Румъния", "Русия", "Самоа", "Сан Марино", "Сао Томе и Принсипи", "Саудитска Арабия", "Сейнт Лусия", "Северна Корея", "Северна Македония", "Сейшелски острови", "Сенегал", "Сейнт Китс и Невис", "Сиера Леоне", "Сингапур", "Сирия", "Словакия", "Словения", "Сейнт Винсент и Гренадини", "Соломонови острови", "Сомалия", "Судан", "Суринам", "САЩ", "Сърбия", "Таджикистан", "Тайланд", "Танзания", "Того", "Тонга", "Тринидад и Тобаго", "Тувалу", "Тунис", "Туркменистан", "Турция", "Уганда", "Узбекистан", "Украйна", "Унгария", "Уругвай", "Фиджи", "Филипини", "Финландия", "Франция", "Хаити", "Хондурас", "Хърватия", "Централноафриканска република", "Чад", "Чехия", "Черна гора", "Чили", "Швейцария", "Швеция", "Шри Ланка", "Република Южна Африка", "Южна Корея", "Южен Судан", "Ямайка", "Япония", "Ниуе", "Шотландия"],
            Столица: ["Амстердам", "Андора ла Веля", "Атина", "Белград", "Берлин", "Берн", "Братислава", "Брюксел", "Будапеща", "Букурещ", "Вадуц", "Валета", "Варшава", "Ватикан", "Виена", "Вилнюс", "Дъблин", "Загреб", "Киев", "Кишинев", "Копенхаген", "Лисабон", "Лондон", "Любляна", "Люксембург", "Мадрид", "Минск", "Монако", "Москва", "Осло", "Парик", "Подгорица", "Прага", "Рейкявик", "Рига", "Рим", "Сан Марино", "Сараево", "Скопие", "София", "Стокхолм", "Талин", "Тирана", "Хелзинки", "Донецк", "Луганск", "Прищина", "Тираспол", "Абу Даби", "Аман", "Анкара", "Ашхабад", "Багдад", "Баку", "Бангкок", "Бандар Сери Бегаван", "Бейрут", "Бишкек", "Виентян", "Дака", "Дамаск", "Дели", "Джакарта", "Дили", "Доха", "Душанбе", "Ереван", "Йерусалим", "Исламабад", "Кабул", "Катманду", "Куала Лумпур", "Мале", "Манама", "Манила", "Маскат", "Найпидо", "Никозия", "Нур Султан", "Пекин", "Пном Пен", "Пхенян", "Сана", "Сеул", "Сингапур", "Ташкент", "Тбилиси", "Техеран", "Токио", "Тхимпху", "Улан Батор", "Ханой", "Шри Джаявaрдaнaпура Коте", "Кувейт", "Рияд", "Никозия", "Рамала", "Степанакерт", "Сухуми", "Тайпе", "Цхинвали", "Абуджа", "Адис Абеба", "Акра", "Алжир", "Антананариву", "Асмара", "Бамако", "Банги", "Банджул", "Бисау", "Брaзaвил", "Виктория", "Виндхук", "Габороне", "Гитега", "Дакар", "Джибути", "Джуба", "Додома", "Кайро", "Кампала", "Кигали", "Киншаса", "Конакри", "Либревил", "Лилонгве", "Ломе", "Луанда", "Лусака", "Малабо", "Мапуто", "Macepy", "Мбабане", "Могадишу", "Монровия", "Морони", "Найроби", "Hджамена", "Ниамей", "Нуакшот", "Порт Луи", "Порто Ново", "Прая", "Претория", "Рабат", "Сао Томе", "Триполи", "Тунис", "Уагадугу", "Фрийтаун", "Хараре", "Хартум", "Ямусукро", "Яунде", "Харгейса", "Аюн", "Асунсион", "Бастер", "Белмопан", "Богота", "Бразилия", "Бриджтаун", "Буенос Айрес", "Вашингтон", "Хавана", "Гватемала", "Джорджтаун", "Каракас", "Кастрийс", "Кингстаун", "Кингстън", "Кито", "Лима", "Манагуа", "Мексико", "Монтевидео", "Hacay", "Отава", "Панама", "Парамарибо", "Порт о Пренс", "Порт ъф Спейн", "Poзо", "Сан Салвадор", "Сан Хосе", "Санто Доминго", "Сантяго", "Сейнт Джонс", "Сейнт Джорджис", "Сукре", "Тегусигалпа", "Апия", "Уелингтън", "Канбера", "Маджуро", "Нгерулмуд", "Нукуалофа", "Паликир", "Порт Вила", "Порт Морсби", "Сува", "Фунафути", "Хониара", "Южна Tapaya"],
            Град: ['Криводол', 'Враца', 'Вадуц', 'Валенсия', 'Валета', 'Ванкувър', 'Варна', 'Варшава', 'Вашингтон', 'Велики Преслав', 'Велико Търново', 'Велинград', 'Венеция', 'Веракрус', 'Верона', 'Версай', 'Ветово', 'Видин', 'Виена', 'Вилнюс', 'Виндхук', 'Владивосток', 'Волфсбург', 'Враца', 'Вроцлав', 'Вълчедръм', 'Вълчи Дол', 'Вършец', "Айтос", "Асеновград", "Ахтопол", "Балчик", "Банкя", "Банско", "Батак", "Белене", "Белица", "Берковица", "Битоля", "Благоевград", "Ботевград", "Брацигово", "Брезник", "Бургас", "Бяла", "Варна", "Велес", "Велики Преслав", "Велико Търново", "Велинград", "Видин", "Враца", "Вършец", "Габрово", "Гевгели", "Горна Оряховица", "Гоце Делчев", "Димитровград", "Добрич", "Долна Баня", "Долна Оряховица", "Долни Дъбник", "Дупница", "Елена", "Каварна", "Казанлък", "Калофер", "Карлово", "Карнобат", "Китен", "Козлодуй", "Копривщица", "Костенец", "Кърджали", "Кюстендил", "Ловеч", "Лом", "Мадан", "Мелник", "Монтана", "Несебър", "Нова Загора", "Обзор", "Одрин", "Оряхово", "Охрид", "Павликени", "Пазарджик", "Панагюрище", "Перник", "Перущица", "Петрич", "Пещера", "Пирдоп", "Плевен", "Пловдив", "Поморие", "Попово", "Правец", "Приморско", "Първомай", "Радомир", "Разград", "Разлог", "Русе", "Самоков", "Сандански", "Свиленград", "Свищов", "Своге", "Севлиево", "Силистра", "Симеоновград", "Скопие", "Сливен", "Смолян", "Созопол", "София", "Стара Загора", "Струмица", "Тополовград", "Троян", "Трън", "Търговище", "Харманли", "Хасково", "Хисар", "Цариград", "Чепеларе", "Червен бряг", "Чирпан", "Шумен", "Ямбол", , "Айтос", "Асеновград", "Ахтопол", "Балчик", "Банкя", "Банско", "Батак", "Белене", "Белица", "Берковица", "Битоля", "Благоевград", "Ботевград", "Брацигово", "Брезник", "Бургас", "Бяла", "Варна", "Велес", "Велики Преслав", "Велико Търново", "Велинград", "Видин", "Враца", "Вършец", "Габрово", "Гевгели", "Горна Оряховица", "Гоце Делчев", "Димитровград", "Добрич", "Долна Баня", "Долна Оряховица", "Долни Дъбник", "Дупница", "Елена", "Каварна", "Казанлък", "Калофер", "Карлово", "Карнобат", "Китен", "Козлодуй", "Копривщица", "Костенец", "Кърджали", "Кюстендил", "Ловеч", "Лом", "Мадан", "Мелник", "Монтана", "Несебър", "Нова Загора", "Обзор", "Одрин", "Оряхово", "Охрид", "Павликени", "Пазарджик", "Панагюрище", "Перник", "Перущица", "Петрич", "Пещера", "Пирдоп", "Плевен", "Пловдив", "Поморие", "Попово", "Правец", "Приморско", "Първомай", "Радомир", "Разград", "Разлог", "Русе", "Самоков", "Сандански", "Свиленград", "Свищов", "Своге", "Севлиево", "Силистра", "Симеоновград", "Скопие", "Сливен", "Смолян", "Созопол", "София", "Стара Загора", "Струмица", "Тополовград", "Троян", "Трън", "Търговище", "Харманли", "Хасково", "Хисар", "Цариград", "Чепеларе", "Червен бряг", "Чирпан", "Шумен", "Ямбол"],
            Село: ["Айдемир", "Лозен", "Казичене", "Драгиново", "Бистрица", "Розино", "Градец", "Калипетрово", "Буковлък", "Мало", "Конаре", "Белозем", "Труд", "Цалапица", "Костенец", "Селановци", "Голямо Бабино", "Пудрия", "Краводер", "Ботуня", "Главаци", "Галатин", "Осен", "Градешница", "Громшин", "Ракево", "Добруша", "Липен", "Лиляче", "Владая", "Брезница", "Първенец", "Врачеш", "Първомай", "Брестовица", "Стряма", "Ябланово", "Тополчане", "Трудовец", "Алеко Константиново", "Ивайло", "Рогош", "Тополи", "Бутан", "Дянково", "Баня", "Ягодово", "Николово", "Гложене", "Каменар", "Брестовене", "Маноле", "Йоаким", "Груево", "Дорково", "Кочан", "Панчарево", "Старо Оряхово", "Копринка", "Равда", "Ягода", "Крумово", "Болярци", "Смирненски", "Абланица", "Арчар", "Тополово", "Първомайци", "Руен", "Ясеновец", "Драганово", "Калояново", "Калековец", "Щръклево", "Нови хан", "Галата", "Сотиря", "Ясен", "Браниполе", "Ковачево", "Куртово", "Конаре", "Черник", "Огняново", "Ново село", "Борован", "Рибново", "Герман", "Волуяк", "Раковски", "Чепинци", "Тодор Икономово", "Краище", "Гроздьово", "Търнава", "Борино", "Главиница", "Енина", "Вълкосел", "Микрево", "Скутаре", "Марково", "Оброчище", "Цонево", "Устина", "Катуница", "Желю войвода", "Дебрен", "Черно море", "Градина", "Бенковски", "Самуилово", "Старцево", "Мосомище", "Ясенково", "Бузовград", "Дерманци", "Садовец", "Крушаре", "Обнова", "Братаница", "Световрачене", "Крупник", "Крушовица", "Нова махала", "Острово", "Хърлец", "Тетово", "Черногорово", "Дебелт", "Петърч", "Исперихово", "Варвара", "Царацово", "Семчиново", "Брест"],
            Животно: ['хамстер','котка','куче','прасе','кон','тигър','лешояд','риба','кит','бухал','щъркел','гепард','крокодил','кокошка','петел','овца','крава','коза','мишка','плъх','маймуна','лисица','чакал','врабче','сокол','мечка','вълк','коала','панда','змия','жаба','папагал','слон','жираф','гълъб','бобър','пантера','зебра','костенурка','паяк','карерица','таралеж','акула','заек','хипопотам','лъв','ленивец','паун','лама','кенгуру'],
            Предмет: ['маса','стол','диван','легло','чаша','клавиатура','мишка','тетрадка','книга','портмоне','телевизор','колони','гардероб','сушилня','радиатор','прозорец','мрежа','картина','ваза','саксия','вентилатор','камък','сандък','чадър','къща','химикалка','чайник','ключ','лъжица','вилица','трион','ножица','топка','закачалка','фенер','четка','огледало','барабан','тарамбука','очила','аквариум','табела','раница','чук','отвертка','пирон','тениска','блуза','дънки','метла','лопата','кирка','казма','конус','дистанционно','чиния','хладилник','шкаф','пистолет','пушка','кола','балон','шапка','колело','самолет','кораб','автобус','влак'],
            Реки: ["Ботуня", "Дунав", "Искър", "Тунджа", "Осъм", "Янтра", "Марица", "Камчия", "Арда", "Струма", "Русенски Лом", "Бели Лом", "Вит", "река Арчар", "река Батова", "Бистрица", "Дяволска река", "Доспат", "Ерма", "Палакария", "Крумовица", "Лебница", "Луда река", "Бяла река", "Луда Яна", "Места", "Огоста", "Осъм", "Река Провадия", "Резово", "Ропотамо", "Сазлийка", "Цибрица", "Тунджа", "Въча", "Върбица", "Велека", "Росица", "Айтоска река", "Чукарска река", "Китенска река", "Резовска река", "Изворска река", "Река Ахелой", "Река Двойница", "Войнишка река", "Река Арчар", "Река Скомля", "Река Видбол", "Река Тополовска", "Топчийска река", "Река Сенковец", "Шабленска река", "Нишава", "Стряма", "Тимок", "Скът", "Черни Лом", "Суха река", "Царацар", "Струмешница", "Стара река", "Факийска река", "Малки Искър", "Мочурица", "Чепеларска река", "Чепинска река", "Голяма река", "Овчарица", "Пясъчник", "Поповска река", "Височица", "Веселина", "Драговищица", "Господаревска река", "Добричка река", "Средецка река", "Лесновска река", "Стара река", "Соколница", "Видима", "Русокастренска река", "Мътивир", "Карамандере"],
            Спорт: ["стрелба с лък", "асоциация", "крокет", "бадминтон", "бодибилдинг", "боулинг", "игра на кегли", "бокс", "крокет", "бягане", "дартс", "тенис на палуба", "гмуркане", "голф", "гимнастика", "балансираща греда", "художествена гимнастика", "хандбал", "айкидо", "капоейра", "Хапкидо", "джудо", "джиу джицу", "карате", "кендо", "кунг фу", "тай чи чиуан", "таекуондо", "тенис", "стрелба", "каране на кънки", "фигурно пързаляне", "скоростно пързаляне", "каране на ски", "водни ски", "сноуборд", "плуване", "тенис на маса", "хвърляне на чук", "Седмобой", "висок скок", "дълъг скок", "овчарския скок", "тичане", "бадминтон", "баскетбол", "футбол", "ръгби", "хокей на лед", "дърпане на въже", "волейбол", "драг състезания", "изкачване на хълм", "картинг", "офроуд състезания", "състезания с автомобили", "бънджи скок", "бой между петли", "Колоездене", "лов на риба", "дресиране", "конни надбягвания", "езда на бикове", "скачане с парашут", "пързаляне с шейна", "сърф"]
        }
        let randomWord

        if (option == 'Град') {
            randomWord = Math.floor(Math.random() * 239)
        } else if (option == 'Държава') {
            randomWord = Math.floor(Math.random() * 193)
        } else if (option == 'Столица') {
            randomWord = Math.floor(Math.random() * 205)
        } else if(option == 'Село') {
            randomWord = Math.floor(Math.random() * 136)
        } else if(option == 'Реки') {
            randomWord = Math.floor(Math.random() * 84)
        } else if(option == 'Спорт') {
            randomWord = Math.floor(Math.random() * 66)
        } else if(option == 'Животно') {
            randomWord = Math.floor(Math.random() * 50)
        } else if(option == 'Предмет') {
            randomWord = Math.floor(Math.random() * 68)
        }

        // let currentWord = bg[option][randomWord]
        // bg[option] = bg[option].filter(x => x != bg[option][randomWord])

        return bg[option][randomWord]
    }
}