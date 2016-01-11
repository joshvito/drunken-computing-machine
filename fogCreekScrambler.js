'use strict';
//run via "node fogCreekScrambler yourWord
//yourWord cannot have duplicates
var word = process.argv.splice(2,1),//save the 3rd element of array, we know that the first two will be 'node <script path>'
    charToSort = "abcdefghijklmnopqrstuvwxyz_",
    letters = word.join("").split(""),
    error = "";

//
//return message if no word
//

function countArrayOccurance(sortedArr){
    return sortedArr.reduce(function reduceFunc(countMap, word) {
        countMap[word] = ++countMap[word] || 1;
        return countMap;
    }, {});
}

function checkForDuplicates(){
    //need to check the word for duplicates, then alert user
    var letterCounts = countArrayOccurance(letters);
    for (var letter in letterCounts) {
        if (letterCounts[letter] > 1){
            error = "The word you entered has more than one occurance of the same character (" + letter + " | " + letterCounts[letter] + "). ";
            console.log(error);
            return false;
        }
    }
    return true;
}

checkForDuplicates();