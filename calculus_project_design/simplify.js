const problem = '+30x^1+45x^0(x^2+3x)^2';


class simplify{
    constructor(text)
    {
        this.text = text;
        this.mapped_array = {'multiply':[],'non_multiply':[],'content':[]};
        this.open = [];
        this.close = []
        simplify.run(this)
    }
    static run(params)
    {
        let {text,mapped_array,close,open} = params;
        let dummy_text = text;
        let dummy_object = {'pair':[]}
        let reg1 = /\(/
        let reg2 = /\)/;

        check_n_map()
        function check_n_map()
        {
            let result_1 = reg1.exec(dummy_text);
            let result_2 = reg2.exec(dummy_text);
            let bool = false

            switch(true){
                case result_1 !== null:
                    let index = dummy_text.indexOf(result_1[0])
                    open.push(index);
                    dummy_text = dummy_text.replace(result_1[0],'<')
                    bool = true;
                break
            }

            switch(true)
            {
                case result_2 !== null:
                    let idx = dummy_text.indexOf(result_2[0])
                    close.push(idx);
                    dummy_text = dummy_text.replace(result_2[0],'>')
                    bool = true;
            }

            switch(true)
            {
                case bool:
                    check_n_map();
                break;
                default:
                    start_comparison()
            }
        }

        function return_smallest_index(array)
        {
            let dummy = [-10000000,0];
            array.forEach((val,idx) =>
                {
                    switch(true)
                    {
                        case val > dummy[0] && Math.sign(val) !== 1:
                            dummy[0] = val;
                            dummy[1] = idx;
                    }
                });

            return dummy
        }
        
        function start_comparison()
        {
            for(let i = 0; i < close.length; i++)
            {
                const data_array = new Array();
                open.forEach(val =>
                    {
                        data_array.push(val-close[i])
                    });
                
                const num = return_smallest_index(data_array)[1]
                dummy_object['pair'].push([open[num],close[i]]);
                open.splice(num,1);
            }
        }

        function extract_power(text,content)
        {
            let reg = /\d{0,}/;
            let first = text.split(`${content}^`)[1];
            let result = reg.exec(first);
            let temporal = null

            switch(true)
            {
                case result !== null:
                    temporal = `${result[0]}`;
                break;
                default:
                    temporal = '1'
            }
            return temporal
        }


        const match_text = () =>
        {
            let num = text.split('(')[0];
            dummy_object['pair'].forEach(val =>
                {
                    let content = text.slice(val[0],val[1]+1);
                    switch(true)
                    {
                        case text.charAt(val[1]+1) !== '^':
                            mapped_array['content'].push(content)
                            mapped_array.multiply.push(content)
                        break;
                        case text.charAt(val[1]+1) === '^':
                            mapped_array['content'].push(`${content + '^' + extract_power(text,content)}`);
                            mapped_array['non_multiply'].push(`${content + '^' + extract_power(text,content)}`)
                    }
                });
                switch(true)
                {
                    case num !== '' && !isNaN(Number(num)):
                        mapped_array['numeric'] = num;
                        mapped_array['content'][0] = num+mapped_array['content'][0]
                }
        }
        match_text()
    // return mapped_array
    }
}

export default simplify
