'use strict';
////#!/usr/bin/env node
//run via "node scramble yourword"
//yourWord cannot have duplicates
var fs = require("fs");
var word = process.argv.splice(2,1),//save the 3rd element of array, we know that the first two will be 'node <script path>'
    writeFileName ="./" + word.toString() + ".txt",
    //writer = fs.createWriteStream(writeFileName),
    chars = "abcdefghijklmnopqrstuvwxyz_",
    charToSort = shuffle(chars.split("")),
    letters = word.join("").split(""),//convert word argument to an array
    lettersCount = letters.push("_"),//add the _ separator
    error = "";

console.log(word);
console.log( typeof word);

if(!word[0]){
    //return message if no word
    console.log("The script " + process.argv.splice(1,1) + " requires a passed in parameter(string);" );
} else if (checkForDuplicates()){
    tryRemoveFile(writeFileName);
    var scramble = createScramble().join("");
    //console.log(scramble);//debug
    fs.writeFile(writeFileName, scramble, function writeFileCb(err){
        if(err){console.log(err);}
        console.log("Scramble created: " + writeFileName);
    });
}

function tryRemoveFile(path){
// Remove the file, ignoring any errors
    try {
        fs.unlinkSync(path);
    }
    catch (ex) {
    }
}

function countArrayOccurance(sortedArr){
    return sortedArr.reduce(function reduceFunc(countMap, word) {
        countMap[word] = ++countMap[word] || 1;
        return countMap;
    }, {});
}

function shuffle(array) {
    //Fisher-Yates (aka Knuth) Shuffle, pulled from SO
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function checkForDuplicates(){
    //need to check the word for duplicates, then alert user
    var letterCounts = countArrayOccurance(letters);
    for (var letter in letterCounts) {
        if (letterCounts[letter] > 1 && letterCounts.hasOwnProperty(letter)){
            error = "The word you entered has more than one occurance of the same character ('" + letter + "' occurs " + letterCounts[letter] + " times). ";
            console.log(error);
            return false;
        }
    }
    return true;
}

function removeLetterFromArray(arr, ltr){
    var letterIndex = arr.findIndex(function findFun(element, index, array){
        //find the letter in the array
        if(element == ltr){
            return true;
        } else {
            return false;
        }
    });
    arr.splice(letterIndex, 1);//remove the letter from array
}

function createLettersObj(){
    var obj = {};
    var num = 100;
    for (var i = 0; i < lettersCount; i += 1){
        //create char count for passed in word
        obj[letters[i]] = num;
        num = num - 1;
        removeLetterFromArray(charToSort, letters[i]);//remove the word letters from the charToSort array
    }
    for (var j = 0; j < charToSort.length; j += 1){
        //create char count for other letters in word
        obj[charToSort[j]] = num;
        num = num - 1;
    }
    return obj;
}

function createRepetativeArray(string, number){
    var arr = [];
    for (var i = 0; i < number; i += 1){
        arr.push(string);
    }
    return arr;
}

function createScramble(){
    var scrambled = [],
        letterCounts = createLettersObj();

    for (var ltr in letterCounts){
        if(letterCounts.hasOwnProperty(ltr)) {
            scrambled = scrambled.concat(createRepetativeArray(ltr, letterCounts[ltr]));
        }
    }
    return shuffle(scrambled);
}






