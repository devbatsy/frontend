//sydneyC01CreateSoundOscillation.js


const createFrequencyBars = (declareObject) =>{
    let {fPanel,panel_line,Pstyle,Cstyle} = declareObject
    for(let x in Pstyle){
        panel_line.style[x] = Pstyle[x]
    }
    fPanel.appendChild(panel_line);

    for(let i = 0; i < 16;i++)
    {
        let elem = document.createElement('span');        
        for(let x in Cstyle){
            elem.style[x] = Cstyle[x]
        }
        panel_line.appendChild(elem)
    }
}

createFrequencyBars({
    'fPanel':document.querySelector('.speech_visual'),
    'panel_line':document.createElement('div'),
    'Pstyle':{
        height:'50%',
        width:'100%',
        display:'flex',
        alignItems:'flex-end',
        justifyContent:'center',
        columnGap:'2px'
    },
    'Cstyle':{
        width:'1px',
        // borderTop:'1px solid cyan',
        // borderBottom:'1px solid cyan',
        transform:'translateY(50%)',
        background:'rgb(0, 255, 255,.5)',
        transition:'all linear .1s'
    }
});

const render_frequency = (array,nodes) =>{
    nodes.forEach((val,idx) =>{
            val.style.height = `${array[idx]}%`
    })
}

// setInterval(() =>{
//     let array = new Array();
//     let frequencyNodes = document.querySelectorAll('.speech_visual div span');
//     for(let i = 0; i < frequencyNodes.length; i++)
//     {
//         array.push(Math.floor(Math.random()*(80-20)+20))
//     }
//     render_frequency(array,frequencyNodes)
// },200)