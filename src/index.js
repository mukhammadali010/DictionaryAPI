// const variables
const btnSearch = document.querySelector("#btnSearch");
const outputWord = document.querySelector("#outputWord");
const post = document.querySelector("#post");
const pro = document.querySelector("#pro");
const def = document.querySelector("#def");
const example = document.querySelector("#example");
const body = document.querySelector("body");
const sound = document.getElementById("sound");
let inputValue = document.querySelector("#inp-search");
const blok = document.querySelector('.blok')
const words = document.querySelector('.words');

// axios sections



const histor =[]
btnSearch.addEventListener("click", () => {

console.log(histor);
  histor.push(inputValue.value)
 
  if(inputValue.value === "") return alert('you should enter word here')

    getItem(inputValue.value);

    if(inputValue.value !== ""){
      inputValue.value = null;
    }
  });
const getItem = async (value) => {
  const res = await axios.get(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${value}`
  );
  const data = await res.data;
  console.log(data);

  const wordBox = document.querySelector("#wordBox");
  wordBox.innerHTML = `
            <div class="flex justify-between mt-8">
            <h1 class="text-5xl font-extrabold" id="outputWord">${data[0].word}</h1> 
            <i class="fa icon fa-volume-high text-violet-500 opacity-80 fa-2x mr-10 cursor-pointer"></i>
            </div>
            <div class="flex mt-8">
            <p id="post" class="text-xl" >${(()=>{for(let i = 0; i < data[0].meanings.length; i++){
              if(data[0].meanings[i].partOfSpeech === 'verb') return data[0].meanings[i].partOfSpeech;
              if(data[0].meanings[i].partOfSpeech === 'noun') return data[0].meanings[i].partOfSpeech;
              if(data[0].meanings[i].partOfSpeech === 'adjective') return data[0].meanings[i].partOfSpeech;
            }})()} </p>
            <p id="pro" class="text-xl">${data[0].phonetics[0].text}</p>
            </div>
            <p id="def" class="mt-8 text-xl">${data[0].meanings[0].definitions[0].definition} </p>
            <p id="example" class="mt-8 border-l-8 border-violet-500 px-4 text-xl">${data[0].meanings[0].definitions[0].example}</p>
            `;
            const icon = document.querySelector(".icon");
            const sound = document.createElement('audio');
            sound.classList = "sound"
            icon.addEventListener("click", () => {
                sound.setAttribute('src' , `${data[0].phonetics[0].audio}`);
                sound.setAttribute('autoplay','autoplay');
            });
            icon.appendChild(sound)
            
};

const historyBtn = document.createElement('button');
btnSearch.onclick=()=>{
  historyBtn.classList = "history , rounded";
  historyBtn.innerHTML = "HistoryOfWords"
  blok.appendChild(historyBtn);
  historyBtn.onclick=()=>{
    for(let i = 0; i < histor.length; i++){
      words.innerHTML = histor;
    }
    words.className="words";
  }
}
