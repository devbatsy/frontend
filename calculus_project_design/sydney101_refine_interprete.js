const remove_duplicate = (array) =>{
    let new_array = new Array();
    array.forEach(val =>{
        switch(true)
        {
            case !new_array.includes(val):
                new_array.push(val)
        }
    })
    return new_array
}

class refine{
    constructor(bracket,sort,text){
        this.non = new bracket(text).mapped_array.non_multiply;//(3/5x^6)cos(3/2)
        this.aux1 = remove_duplicate([...new bracket(text).mapped_array.multiply]).concat(this.non);
        this.aux_obj = {'aux2':new Array(),'aux3':new Array(),'aux4':new Array()}
        this.final_answer = {'answer':null}
        this.text = text;
        this.reg = /\(/;
        this.reg2 = /\)/;
        this.sort = sort
        refine.run(this)
    }
    static run(params)
    {
        let {aux1,text,reg,reg2,aux_obj,final_answer,sort} = params;
        let final_text = text;

        aux1.forEach(val =>{
            switch(true)
            {
                case val.includes('/'):
                    aux_obj['aux2'].push(val);
            }
        })

        aux_obj['aux2'].forEach(val =>{
            let text = val;
            let resolve_1 = reg.exec(text)[0]
            text = text.replace(resolve_1,`<div class="bracket"></div>`);
            let reverse = text.split('').reverse().join('');
            let resolve_2 = reg2.exec(reverse)[0]
            reverse = reverse.replace(resolve_2,`<div class="bracket_2"></div>`.split('').reverse().join(''));
            aux_obj['aux3'].push(reverse.split('').reverse().join(''))
        })

        aux_obj['aux4'] = new sort(aux_obj['aux2'],[aux_obj['aux2'],aux_obj['aux3']]).object.holdUpdatedAuxArray

        aux_obj['aux4'][0].forEach((val,idx) =>{
            let loop_limiter = 0
            while(final_text.includes(val) && loop_limiter < 5){
                loop_limiter++;
                final_text = final_text.replace(val,aux_obj['aux4'][1][idx])
            }
        })

        

        final_answer.answer = final_text
    }
}

export default refine