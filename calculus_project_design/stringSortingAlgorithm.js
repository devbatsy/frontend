// let init_array = ['boy','children','it','biscuit','dfjkgfdgkfdgd'];
// let init2 = ['-boy-','-children-','-it-','-biscuit-','-dfjkgfdgkfdgd-'] TEST STRINGS


class convertToPair{
    constructor(array){
        this.array = array;
        this.result = new Array()
        convertToPair.run(this)
    }
    static run(params)
    {
        const {result,array} = params;
        array.forEach((val,idx) =>{
            result.push([val.length,idx])
        })
    }
}


class sort{
    constructor(init_array,auxillary_array){
        this.init_array = init_array;
        this.auxillary_array = auxillary_array
        this.object = new Object()
        sort.run(this)
    }
    static run(params)
    {
        let {init_array,object,auxillary_array} = params;
        object['arr1'] = new convertToPair(init_array).result;
        object['arr2'] = new Array()
        
        while(object['arr1'].length > 0){
            let current = [0,0];
            let matchedIdx = 0;
            object['arr1'].forEach((val,idx) =>{
                switch(true)
                {
                    case val[0] >= current[0]:
                        current = val;
                        matchedIdx = idx
                }
            })
            object['arr2'].push(current)
            object['arr1'] = object['arr1'].filter((val,idx) =>{return idx !== matchedIdx})
        }
        
        const remap = () =>{
                object['holdUpdatedAuxArray'] = new Array()
                for(let i = 0; i < auxillary_array.length; i++){
                    object['holdUpdatedAuxArray'].push([])
                    for(let j = 0; j < object['arr2'].length; j++){
                        for(let k = 0; k < auxillary_array[i].length; k++){
                                switch(true)
                                {
                                    case k === object['arr2'][j][1]:
                                        object['holdUpdatedAuxArray'][i].push(auxillary_array[i][k])
                                }
                        }
                    }
                }
                // console.log(object.holdUpdatedAuxArray)
        }

        remap()
    }
}

// new sort(init_array,[init_array,init2])
export default sort
