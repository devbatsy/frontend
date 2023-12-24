const power_specific = (dummy_text,returns,exp_text) =>{
    return dummy_text.replace(exp_text,`${returns[0]}${exp_text.slice(1)}${returns[1]}`)
}

const fraction_specific = (dummy_text,returns,exp_text) =>{
    exp_text = exp_text.slice(0,exp_text.length-1)
    let text_array = exp_text.split('/')
    return dummy_text.replace(exp_text,
        `${returns['parent'][0]}${returns['child'][0]}${text_array[0]}${returns['child'][1]}${returns['residue']}${returns['child'][0]}${text_array[1]}${returns['child'][1]}${returns['parent'][1]}`
        )
}


const operation_1 = (text,expression,returns) =>{
    let dummy_text = text;
    let test_result = expression.exec(dummy_text);

    while(test_result)
    {
        let exp_text = test_result[0]
        dummy_text = power_specific(dummy_text,returns,exp_text)
        test_result = expression.exec(dummy_text)
    }
    return dummy_text
}

const operation_2 = (text,expression,returns) =>{
    let dummy_text = text;
    let test_result = expression.exec(dummy_text);

    while(test_result)
    {
        let exp_text = test_result[0];
        dummy_text = fraction_specific(dummy_text,returns,exp_text)
        test_result = expression.exec(dummy_text)
    }
    return dummy_text
}

const operation_3 = (text,expression,returns) =>{
    let dummy_text = text;
    let test_result = expression.test(dummy_text);
    switch(true)
    {
        case test_result:
            let text_array = dummy_text.split('|');
            dummy_text = `${returns['parent'][0]}${returns['child'][0]}${text_array[0]}${returns['child'][1]}${returns['residue']}${returns['child'][0]}${text_array[1]}${returns['child'][1]}${returns['parent'][1]}`
    }
    return dummy_text
}

const operation_4 = (text,expression,returns) =>{
    let dummy_text = text;
    let test_result = expression.exec(dummy_text);

    while(test_result){
        let exp_text = test_result[0];
        dummy_text = dummy_text.replace(exp_text,returns)
        test_result = expression.exec(dummy_text)
    }
    return dummy_text
}

const operation_5 = (text,expression,returns) =>{
    let dummy_text = text;
    let test_result = expression.exec(dummy_text);

    while(test_result){
        let exp_text = test_result[0];
        dummy_text = dummy_text.replace(exp_text.slice(0,exp_text.length-1),returns)
        test_result = expression.exec(dummy_text)
    }
    return dummy_text
}

class create_html_text{
    constructor(text,variable)
    {
        this.text = text;
        this.result = {'answer':null};
        this.reg_expresions = {
            zero_notation:{'reg':new RegExp(`${variable}\\^0`),'return':'(1)'},
            one_notation:{'reg':new RegExp(`${variable}\\^1\\D`),'return':variable},
            power_reg:{'reg':/\^\-?\+?\d{1,}\/?\d{0,}/,'return':['<sup>','</sup>']},
            fraction_reg:{'reg':/\d{1,}\/\d{1,}[a-z]/,'return':{
                'parent':['<div class="test">','</div>'],
                'child':['<span>','</span>'],
                'residue':'<hr>'
                        }},
            quotient_reg:{'reg':/\|/,
                'return':{
                'parent':['<div class="quote">','</div>'],
                'child':['<div class="qt">','</div>'],
                'residue':'<hr>',
                        }}
        }
        create_html_text.run(this)
    }
    static run(params)
    {
        let {result,text,reg_expresions} = params;
        let final_answer = text
       for(let x in reg_expresions){
            let expression = reg_expresions[x]['reg'];
            let returns = reg_expresions[x]['return'];
            switch(true)
            {
                case x === 'power_reg':
                    final_answer = operation_1(final_answer,expression,returns);
                break;
                case x === 'fraction_reg':
                    final_answer = operation_2(final_answer,expression,returns);
                break;
                case x === 'quotient_reg':
                    final_answer = operation_3(final_answer,expression,returns);
                break;
                case x === 'zero_notation':
                    final_answer = operation_4(final_answer,expression,returns);
                break;
                case x === 'one_notation':
                    final_answer = operation_5(final_answer,expression,returns);
                break
            }
        }
        result.answer = final_answer
    }
}

// console.log(new create_html_text('x^3/2+3x^2-5/3x').result.answer)
export default  create_html_text