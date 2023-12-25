let book_lib = null;
let variable = 'x'
let book_pages = null;
let refined_question = null;
let question_object = {
    'type':`solving differential equations with respect to ${variable}`,
    'number':'question 1'
}

const createText_content = (elem) =>{
    let question = document.createElement('div');
    for(let i = 0; i < Object.keys(question_object).length; i++)
    {
        let question_name = document.createElement('p');
        question_name.innerHTML = question_object[Object.keys(question_object)[i]]
        elem.appendChild(question_name)
    }
    question.classList.add('display');
    question.innerHTML = refined_question;
    elem.appendChild(question)
}


class create_frequency_mechanism{
    constructor(media)
    {
        this.audioCtx = new AudioContext();
        this.source = this.audioCtx.createMediaStreamSource(media);
        this.analyser = this.audioCtx.createAnalyser();
        this.analyser.fftSize = 32;
        this.buffer = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.buffer);
        this.time = null;
        this.limiter = 0
        this.amplitude_range_control = 150;
        this.fullScreen = false
        this.addContentToPages = (pages,question_section,solution_section) =>{
            for(let i = pages.length-1; i >= 0; i--){
                switch(true)
                {
                    case i === pages.length-2:
                        createText_content(pages[i].childNodes[0]);
                        pages[i].childNodes[0].style.color = '#000'
                    break;
                }
            }

            question_section.style.transform = 'translate(-200%,-50%)';
            solution_section.style.transform = 'translate(-50% , -50%)';
        }
        this.frequencyNodesElem = document.querySelectorAll('.speech_visual div span');
        this.create_frquency = () =>
        {
            this.limiter++;
            switch(true)
            {
                case this.limiter === 2:
                    this.analyser.getByteFrequencyData(this.dataArray);
                    this.frequencyNodesElem.forEach((val,idx) =>{
                        val.style.height = `${(Array.from(this.dataArray)[idx]/this.amplitude_range_control)*100}%`
                    })
                    this.limiter = 0;
            }
            this.time = requestAnimationFrame(this.create_frquency);
        }
        this.speech_object = {
            func:(speech) =>{
                let utterance = new SpeechSynthesisUtterance(speech);
                speechSynthesis.speak(utterance);
                utterance.onend = () =>{
                    cancelAnimationFrame(this.time)
                    this.source.disconnect(this.audioCtx.destination)
                    this.frequencyNodesElem.forEach(val =>{
                        val.style.height = '0px'
                    })
                }
                utterance.onstart = () =>{
                    this.create_frquency()
                }
            }
        }
        addEventListener('keydown', e =>{
            if(e.ctrlKey && e.key === 'd'){
                e.preventDefault();
                this.enterFullscreen('fullScreen_container')
            }
        })
        this.enterFullscreen = (togElem) =>{
            switch(true){
                case this.fullScreen:
                    if(document.webkitExitFullscreen){
                        document.webkitExitFullscreen();
                        this.fullScreen = false
                    }
                break;
                case !this.fullScreen:
                    document.querySelector(`.${togElem}`).requestFullscreen().then(() =>{
                        this.fullScreen = true;
                    }).catch(() =>{
                        console.log('enabling incomplete')
                    })
            }
        }
        create_frequency_mechanism.run(this)
    }
    static run(params)
    {
        const {speech_object,source,audioCtx,analyser,addContentToPages,enterFullscreen} = params;
        function connect_freqRender(){
            source.connect(analyser);
            source.connect(audioCtx.destination)
        }
        document.querySelector('.slv .btn').addEventListener('click', e =>{
            connect_freqRender()
            let question_section = document.querySelector('.note_section .question_page');
            let solution_section = document.querySelector('.note_section .solution_page');
            solution_section.innerHTML = '';

            const bookify = new book_lib();
            bookify.pageSettings.style = bookify.createStyleArray('fontWeight:900;fontSize:13px;');
            bookify.pageSettings.styleP = bookify.createStyleArray('borderTopRightRadius:0;borderBottomRightRadius:0;background:white;')
            bookify.pages = 10;
            bookify.parent = solution_section;
            bookify.bookSettings.maxSizing = false
            bookify.run()
            book_pages = bookify.getPage_elements;
            bookify.fullScreenIcon.addEventListener('click', e =>{
                enterFullscreen('solution_page')
            })

            try{
                addContentToPages(book_pages,question_section,solution_section);
            }catch(err){
                console.log(err)
            }

            speech_object.func(refined_question);
        })
    }
}




navigator.mediaDevices.getUserMedia({audio:true}).then(media =>{
    new create_frequency_mechanism(media)
}).catch(err =>{
    console.log(err)
})