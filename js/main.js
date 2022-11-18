//Открытие настроек-----------
let settingsOpened = 0;
function openSettings(){
    if(settingsOpened == 0){
        settingsOpened = 1;
        settingsExpand();
    }
    else if(settingsOpened == 1){
        settingsOpened = 0;
        settingsCollapse();
    }
}
function settingsExpand(){
    document.getElementById('settings').style.display = 'flex';
}
function settingsCollapse(){
    document.getElementById('settings').style.display = 'none';
}
//----------------------------

let passwordLength = 10;//Длина пароля. Динамическая переменная

//Эта штука меняет значение плейсхолдера
document.getElementById('settingsPasswordLength').value = passwordLength;
//

let charsBase = {
    cyrillic: "абвгдеёжзийклмнопрстуфхцчшщъыьэюя",
    latin: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*().,:;№",
    withUppercase(string){
        string += string.toUpperCase();
        return(string);
    },
    bus: '',
}
let password = ''; //тут создаётся пустая переменная password с типом string

function generateRandomString(bus, size){ //variable имеется ввиду, в какую переменную запишем результат
    let output = '';
    for(let i = 0; i <= size; i++){
        let randomNumber = Math.floor(Math.random() * bus.length);
        output  += bus.substring(randomNumber, randomNumber +1);
    }
    return(output);
}

let preview = {
    capitals: '',
    cyrillic: '',
    numbers: '',
    symbols: '',
    reloadData(){
        //Этот блок кода создаёт рандомный preview-пароль в свойствах выше по заданным условиям
        if(document.getElementById('checkCapitals').checked == true && document.getElementById('checkCyrillic').checked == true){
            this.capitals = generateRandomString(charsBase.withUppercase(charsBase.latin + charsBase.cyrillic), passwordLength);
        }
        else if(document.getElementById('checkCapitals').checked == true && document.getElementById('checkCyrillic').checked == false){
            this.capitals = generateRandomString(charsBase.withUppercase(charsBase.latin), passwordLength);
        }
        if(document.getElementById('checkCyrillic').checked == true){
            this.cyrillic = generateRandomString(charsBase.cyrillic, passwordLength);
        }else{
            this.cyrillic = '';
        }
        if(document.getElementById('checkNumbers').checked == true){
            this.numbers = generateRandomString(charsBase.numbers, passwordLength);
        }else{
            this.numbers = '';
        }
        if(document.getElementById('checkSymbols').checked == true){
            this.symbols = generateRandomString(charsBase.symbols, passwordLength);
        }else{
            this.symbols = '';
        }
        //Этот блок кода записывает эти данные уже в HTML страницу соответственно тому шо в объекте
        document.getElementById('settingExampleCapitals').innerHTML = preview.capitals;
        document.getElementById('settingExampleCyrillic').innerHTML = preview.cyrillic;
        document.getElementById('settingExampleNumbers').innerHTML = preview.numbers;
        document.getElementById('settingExampleSymbols').innerHTML = preview.symbols;
        passwordLength = +(document.getElementById('settingsPasswordLength').value);
    }
}

function generatePassword(){
    let bus = '';
    if(document.getElementById('checkCapitals').checked == true && document.getElementById('checkCyrillic').checked == true){
        bus += charsBase.withUppercase(charsBase.latin + charsBase.cyrillic);
    }
    else if(document.getElementById('checkCapitals').checked == true && document.getElementById('checkCyrillic').checked == false){
        bus += charsBase.withUppercase(charsBase.latin);
    }
    else if (document.getElementById('checkCyrillic').checked == true){
        bus += charsBase.cyrillic + charsBase.latin;
    }
    else{
        bus += charsBase.latin;
    }
    if(document.getElementById('checkNumbers').checked == true){
        bus += charsBase.numbers;
    }
    if(document.getElementById('checkSymbols').checked == true){
        bus += charsBase.symbols;
    }
    password = generateRandomString(bus, passwordLength);
    document.getElementById('passGenField').innerHTML = password;
}

function copyPassword(){
    window.navigator.clipboard.writeText(password);
}

preview.reloadData()//Это выполнится при загрузке страницы
generatePassword()//Ну и это тоже