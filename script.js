
const paraArray = ["authors often misinterpret the lettuce as a folklore rabbi, when in actuality it feels more like an uncursed bacon. Pursued distances show us how mother-in-laws can be charleses. Authors often misinterpret the lion as a cormous science, when in actuality it feels more like a leprous lasagna. Recent controversy aside, their band was, in this moment, a racemed suit. The clutch of a joke becomes a togaed chair. The first pickled chess is.In modern",
"times the first scrawny kitten is, in its own way, an input. An ostrich is the beginner of a roast. An appressed exhaust is a gun of the mind. A recorder is a grade from the right perspective. A hygienic is the cowbell of a skin. Few can name a dun brazil that isn't a highbrow playroom. The unwished beast comes from a thorny oxygen. An insured advantage's respect comes with it the thought that the lucid specialist is a fix.", 
"i say empty your mind, be formless, shapeless like water, you put water into a cup it becomes the cup, you pour water into a bottle it becomes the bottle, you pour water into a tea pot, it becomes tea pot water can flow or it can crash , be water my friend.",
"navigate a spaceship through an endless intergalactic highway, avoiding asteroids, collecting power-ups, and battling rogue AI ships. The game features classic pixel art, neon visuals, and an upbeat synth soundtrack reminiscent of the 80s arcade era.",
"travel through various time periods as a team of unlikely heroes who must save history from being rewritten by an evil time-traveling villain. Each era presents unique challenges, enemies, and pixel-art aesthetics inspired by different decades of gaming.",
"defend Earth from an alien invasion in this retro-style space shooter. Players control a customizable spaceship and face waves of progressively challenging extraterrestrial foes. The game pays homage to classic shoot 'em ups with vibrant pixel art, power-ups, and a fast-paced arcade experience.",
"in ancient times the legs could be said to resemble stroppy vegetables. We can assume that any instance of a centimeter can be construed as an enate paste. One cannot separate pairs from astute managers. Those americas are nothing more than fish. If this was somewhat unclear, authors often misinterpret the gosling as an unfelt banjo, when in actuality it feels more like a professed galley. A bow of the squirrel is assumed.", "What we don't know for sure is whether or not a pig of the coast is assumed to be a hardback pilot. The literature would have us believe that a dusky clave is not but an objective. Few can name a limbate leo that isn't a sunlit silver. The bow is a mitten. However, the drawer is a bay. If this was somewhat unclear, few can name a paunchy blue that isn't a conoid bow. The undrunk railway reveals itself as a downstage bamboo to those who look.",
"determining what exactly defines a short story has been recurrently problematic. A classic definition of a short story is that one should be able to read it in one sitting, a point most notably made in Edgar Allan Poes essay The Philosophy of Composition Wells described the purpose of the short story as The jolly art, of making something very bright and moving; it may be horrible or pathetic or funny or profoundly illuminating, having only this essential, that it should",
"a short story is a piece of prose fiction that can typically be read in a single sitting and focuses on a self-contained incident or series of linked incidents with the intent of evoking a single effect or mood. The short story is one of the oldest types of literature and has existed in the form of legends mythic tales folk tales fairy tales tall tales fables and anecdotes in various ancient communities around the world. The modern short story developed in the early 19th century.", 
"set in a dystopian cyberpunk future, you play as a lone cyber-enhanced ninja on a mission to bring down a corrupt mega-corporation. With side-scrolling gameplay, intense platforming, and dynamic sword-fighting mechanics, the game captures the gritty aesthetic of 16-bit action games with a futuristic twist.",
"some authors have argued that a short story must have a strict form. Somerset Maugham thought that the short story must have a definite design, which includes a point of departure, a climax and a point of test in other words, it must have a plot. Hugh Walpole had a similar view. A story should be a story; a record of things happening full of incidents, swift movements, unexpected development, leading through suspense to a climax and a satisfying denouement.",
"short stories have no set length. In terms of word count, there is no official demarcation between an anecdote, a short story, and a novel. Rather, the forms parameters are given by the rhetorical and practical context in which a given story is produced and considered so that what constitutes a short story may differ between genres, countries, eras, and commentators. Like the novel, the short storys predominant shape reflects the demands of the avail", 
"a baby is a shingle from the right perspective. Before defenses, collars were only operations. Bails are gleesome relatives. An alloy is a streetcar's debt. A fighter of the scarecrow is assumed to be a leisured laundry. A stamp can hardly be considered a peddling payment without also being a crocodile. A skill is a meteorology's fan. Their scent was, in this moment, a hidden feeling. The competitor of a bacon becomes a boxlike cougar."
];
const textBox = document.querySelector(".text-box p");
const inputBox = document.querySelector(".box .input-box");
const errorTag = document.querySelector(".error span")
const timerTag = document.querySelector(".timer span")
const wpmTag = document.querySelector(".wpm span")
const correctTag = document.querySelector(".correct span")
const cpmTag = document.querySelector(".cpm span")
const restartBtn = document.querySelector(".restart")

let time = maxTime = 60
timeLeft = maxTime
let charIndex = errors = isTyping = corrects = 0

function handleParagraph(){
    const randomPara = Math.floor(Math.random() * paraArray.length);
    textBox.innerHTML = ""
    paraArray[randomPara].split("").forEach(elem => {
        let span = `<span>${elem}</span>`
        textBox.innerHTML += span; 
    } );
    textBox.querySelectorAll("span")[0].classList.add("active");
    textBox.addEventListener("click", () => inputBox.focus());
    document.addEventListener("keydown", () => inputBox.focus());


}

function startTyping(){
    const characters = textBox.querySelectorAll("span")
    let typedChar = inputBox.value.split("")[charIndex]
    if(charIndex < characters.length && timeLeft > 0){
        if(!isTyping){
            time = setInterval(startTimer, 1000)
            isTyping = true
        }
        if(typedChar == null){
            charIndex--
            if(characters[charIndex].classList.contains("incorrect")){
                errors--
            }
            characters[charIndex].classList.remove("correct","incorrect")
        } else{
            if(characters[charIndex].innerText === typedChar){
                corrects++
                characters[charIndex].classList.add("correct")
            }else {
                errors++
                characters[charIndex].classList.add("incorrect")
            }
            charIndex++
        
        }
        characters.forEach(span => span.classList.remove("active"))
        characters[charIndex].classList.add("active")
        errorTag.innerText = errors
        correctTag.innerText = corrects
        let wpm = Math.round((((charIndex - errors) / 5) / (maxTime - timeLeft)) * 60 )
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm
        wpmTag.innerText = wpm
        cpmTag.innerText = charIndex - errors
    }else{
        inputBox.value = ""
        clearInterval(time)
    }
}

function startTimer(){
    if(timeLeft > 0){
        timeLeft--
        timerTag.innerText = timeLeft
    }else{
        clearInterval(time)
    }
}
function resetGame(){
    startTyping()
    inputBox.value = ""
    clearInterval(time)
    timeLeft = maxTime
    charIndex = errors = isTyping = corrects = 0
    wpmTag.innerText = 0
    cpmTag.innerText = 0
    errorTag.innerText = errors
    correctTag.innerText = corrects

}

handleParagraph()
inputBox.addEventListener("input", startTyping);
restartBtn.addEventListener("click", resetGame);