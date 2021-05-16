const rootShapeLetterMap = new Map();
const similarLettersMap = new Map();
const arabicToEnglishMap = new Map();

const options = {
    root: true,
    similar: false,
    english: false,
    tashkeel: false,
    fasel: false
}

const tashkeelat = ['َ', 'ً', 'ُ', 'ٌ', 'ِ', 'ٍ', 'ْ', 'ّ'];
const fawasel = [' ', ',', '.', 'ـ', '~', '،'];

let finalOutputText = "";
const copyLabel = "نسخ للحافظة"; 
const doneLabel = "تم النسخ"

const inputElement = document.getElementById("in");
const outputElement = document.getElementById("out");
const copyElement = document.getElementById("copy");



function init() {
    initRootShapeLetterMap();
    initSimilarLettersMap();
    initArabicToEnglishMap();

    listenForWriting();
    listenForOptions();

    function listenForOptions() {
        const optionElements = document.getElementsByClassName("option");
        for (let i = 0; i < optionElements.length; i++) {
            optionElements[i].onchange = () => apply();
        }
    }

    function listenForWriting() {
        const inputElement = document.getElementById("in");
        inputElement.onkeyup = () => apply();
    }

    function initRootShapeLetterMap() {
        rootShapeLetterMap['أ'] = 'ا';
        rootShapeLetterMap['إ'] = 'ا';
        rootShapeLetterMap['آ'] = 'ا';

        rootShapeLetterMap['ب'] = 'ٮ';
        rootShapeLetterMap['ت'] = 'ٮ';
        rootShapeLetterMap['ث'] = 'ٮ';
        rootShapeLetterMap['ن'] = 'ٮ';

        rootShapeLetterMap['ج'] = 'ح';
        rootShapeLetterMap['خ'] = 'ح';

        rootShapeLetterMap['ذ'] = 'د';
        rootShapeLetterMap['ز'] = 'ر';
        rootShapeLetterMap['ش'] = 'س';
        rootShapeLetterMap['ض'] = 'ص';
        rootShapeLetterMap['ظ'] = 'ط';
        rootShapeLetterMap['غ'] = 'ع';

        rootShapeLetterMap['ف'] = 'ڡ';
        rootShapeLetterMap['ق'] = 'ڡ';

        rootShapeLetterMap['ة'] = 'ه';
        rootShapeLetterMap['ي'] = 'ى';

        rootShapeLetterMap['ؤ'] = 'و';
    }

    function initSimilarLettersMap() {
        similarLettersMap['ا'] = ['\uFE8D', '\uFE8E', '\uFE82', '\uFE81', '\u0622', 'آ', 'إ', 'ٲ', 'ٳ', 'ٵ', ''];
        similarLettersMap['ت'] = ['\uFE98', '\uFE97', '\uFE96', '\uFE95', 'ٺ'];
        similarLettersMap['ث'] = ['\uFE99', '\uFE9A', '\uFE9C', '\uFE9B', 'ٽ', 'ٿ', 'ڽ'];
        similarLettersMap['ج'] = ['\uFE9D', '\uFE9E', '\uFEA0', '\uFE9F', 'چ', 'ڇ', 'ڄ', 'ڃ'];
        similarLettersMap['ل'] = ['\uFEDD', '\uFEDE', '\uFEE0', '\uFEDF', 'ڵ', 'ڶ', 'ڷ', 'ڸ'];
        similarLettersMap['م'] = ['\uFEE1', '\uFEE2', '\uFEE4', '\uFEE3'];
        similarLettersMap['ن'] = ['\uFEE5', '\uFEE6', '\uFEE8', '\uFEE7', 'ڼ', 'ڹ'];
        similarLettersMap['ق'] = ['\uFED5', '\uFED6', '\uFED8', '\uFED7'];
        similarLettersMap['س'] = ['\uFEB1', '\uFEB2', '\uFEB4', '\uFEB3', 'w'];
    }

    function initArabicToEnglishMap() {
        arabicToEnglishMap['ب'] = 'b';
        arabicToEnglishMap['ت'] = 't';
        arabicToEnglishMap['ج'] = 'g';
        arabicToEnglishMap['د'] = 'd';
        arabicToEnglishMap['ر'] = 'r';
        arabicToEnglishMap['ز'] = 'z';
        arabicToEnglishMap['س'] = 's';
        arabicToEnglishMap['ف'] = 'f';
        arabicToEnglishMap['ك'] = 'k';
        // arabicToEnglishMap['ل'] = 'l';
        arabicToEnglishMap['م'] = 'm';
        arabicToEnglishMap['ن'] = 'n';
        arabicToEnglishMap['ه'] = 'h';
    }
}

function readOptions() {
    options.similar = document.getElementById('option-similar').checked;
    options.root = document.getElementById('option-nodots').checked;
    options.english = document.getElementById('option-english').checked;
    options.tashkeel = document.getElementById('option-tashkeel').checked;
    options.fasel = document.getElementById('option-fasel').checked;
}

function apply() {
    readOptions();
    const inputValue = inputElement.value;
    finalOutputText = scrambleText(inputValue);
    outputElement.value = finalOutputText;
    // change title of copy button 
    changeButtonLabel(copyElement, copyLabel);
}

function scrambleText(original) {
    const words = original.split(" ");
    let output = "";
    for (let i = 0; i < words.length; i++) {
        const wordOut = scrambleWord(words[i])
        output += wordOut;
        if (i < words.length - 1) {
            output += " ";
        }
    }
    return output;
}

function scrambleWord(original) {
    if (original.charAt(0) === '#') {
        return original;
    }
    let output = "";
    const wordContext = {
        skipNextShapeChange: false,
        skipNextLetterAppend: false,
        skipallShapeChanges: false,
        englishCharacterReplaced: false,
        canChangeShape: () => !this.skipNextShapeChange && !this.skipallShapeChanges
    };

    if (original.length < 4) {
        wordContext.skipShapeChange
    }

    for (let i = 0; i < original.length; i++) {
        const out = switchChar(original.charAt(i), wordContext);
        if (original.charAt(i) === 'ه') {
            wordContext.skipShapeChange = true;
            wordContext.skipNextLetterAppend = true;
        }
        output += out;
    }
    return output;
}

function switchChar(c, wordContext) {

    let out = c;

    if (wordContext.canChangeShape() && options.english && !wordContext.englishCharacterReplaced && arabicToEnglishMap[c] && probabilityOf(2)) {
        out = arabicToEnglishMap[c];
        wordContext.englishCharacterReplaced = true;
    } else if (options.root && rootShapeLetterMap[c]) {
        out = rootShapeLetterMap[c];
    } else if (wordContext.canChangeShape() && options.similar && similarLettersMap[c] && probabilityOf(2)) {
        out = similarLettersMap[c][random(similarLettersMap[c].length)];
    }

    if (options.tashkeel && probabilityOf(2)) {
        out += randomFrom(tashkeelat);
    }

    if (!wordContext.skipNextLetterAppend && options.fasel && probabilityOf(4)) {
        out += randomFrom(fawasel);
    }

    if (wordContext.skipNextShapeChange) {
        wordContext.skipNextShapeChange = false;
    }
    if (wordContext.skipNextLetterAppend) {
        wordContext.skipNextLetterAppend = false;
    }

    return out;
}

function copyToClipBoard() {
    if (!navigator.clipboard) {
        return;
    }
    console.log('Async: Copying to clipboard was successful!');
    navigator.clipboard.writeText(finalOutputText).then(function () {
        changeButtonLabel(copyElement, doneLabel);
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
    });
}

function changeButtonLabel(element, text){
        element.innerText = text;
}


function probabilityOf(lessThan) {
    return Math.floor(Math.random() * lessThan) == 0;
}

function randomFrom(arr) {
    return arr[random(arr.length)];
}

function random(lessThan) {
    return Math.floor(Math.random() * lessThan);
}

