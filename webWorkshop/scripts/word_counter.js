var body = document.body

var wordCounterForm = document.querySelector("#word-counter-form")
var wordCounterTextArea = document.querySelector("#word-counter-input")
var wordCounterOutput = document.querySelector("#word-counter-output")

function countWords(text){

    var words = text.split(" ");
    
    wordCounterOutput.innerText =  words.length;
}

wordCounterForm.addEventListener("submit", function(event){
    event.preventDefault()
    countWords(wordCounterTextArea.value);
})


