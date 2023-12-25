class createBooksAndFlip{
    constructor(bookInitParams){
        this.pageNo = bookInitParams.pages;
        this.parent_default = [
            ['height', '100%'],
            ['width','100%'],
            ['position','relative'],
            ['borderRadius','inherit'],
            ['perspective','950px'],
        ]
        this.book_style = [
            ['height', `${bookInitParams.size[0]}${bookInitParams.size[2]}`],
            ['width', `${bookInitParams.size[1]*2}${bookInitParams.size[2]}`],
            ['display','flex'],
            ['justifyContent','center'],
            ['alignItems','center'],
            ['padding','15px'],
        ]
        this.cover_page_default = [
            ['perspective','none'],
            ['height', '100%'],
            ['zIndex','999'],
        ]
        this.aux_style = [
            ['height','100%'],
            ['width','100%'],
            ['position','absolute'],
            ['borderRadius', 'inherit'],
            ['zIndex','999'],
            ['cursor','grab']
        ]
        this.page_style = [
            ['height','100%'],
            ['width','100%'],
            ['display','flex'],
            ['justifyContent','flex-start'],
            ['alignItems','center'],
            ['background','rgb(18, 21, 28)'],
            ['position','absolute'],
            ['top','0'],
            ['left','0'],
            ['zIndex','100'],
            ['transition','all linear 1s'],
            ['borderLeft','1px solid #000'],
            ['transformStyle','preserve-3d'],
            ['borderTopRightRadius','10px'],
            ['borderBottomRightRadius','10px'],
            ['transformOrigin','left'],
            ['transition','none']
            
        ]
        this.child_style = [
            ['height','100%'],
            ['width','100%'],
            ['display','flex'],
            ['flexDirection','column'],
            ['justifyContent','flex-start'],
            ['alignItems','center'],
            ['backgroundPosition','center'],
            ['backgroundRepeat','no-repeat'],
            ['backgroundSize','cover'],
            ['color','#000'],
            ['padding','3px'],
            ['paddingLeft','20px'],
            ['paddingTop','10px'],
            ['borderLeft','3px ridge #000'],
            ['backfaceVisibility','hidden'],
            ['fontFamily','Segoe Print'],
            ['fontWeight','900'],
            ['overflow','scroll'],
            ['background','#fff'],
            ['boxShadow','1px 1px 5px #000']
        ]
        this.f_btn_style = [
            ['position','absolute'],
            ['top','50%'],
            ['right','0'],
            ['transform','translateY(-50%)'],
            ['height','30px'],
            ['width','30px'],
            ['borderRadius','50%'],
            ['zIndex','1000']
        ]
        this.b_btn_style = [
            ['position','absolute'],
            ['top','50%'],
            ['transform','translateY(-50%)'],
            ['height','30px'],
            ['width','30px'],
            ['borderRadius','50%'],
            ['zIndex','1000']
        ]
        this.threed_style = [
            ['boxShadow',`-1px -1px 3px #181818 inset,
            1px 1px 1px rgba(168, 181, 248, 0.4) inset,
            2px 2px 5px #000 `],
            ['background','rgba(36, 41, 54, 1)']
        ]
        this.pageNum_style = [
            ['position','absolute'],
            ['bottom','0'],
            ['right','50%'],
            ['transform','translatex(50%)'],
            ['fontFamily','Lucida Sans Unicode'],
            ['fontWeight','100'],
            ['fontSize','9px']
        ]
        this.frontStyle = [
            ['backfaceVisibility','visible'],
            ['background','rgb(24, 26, 36)'],
            ['border','none'],
            ['height','103%'],
            ['minWidth','103%'],
            ['borderRadius','5px'],
            ['display','flex'],
            ['justifyContent','center'],
            ['alignItems','center'],
            ['fontFamily','monospace'],
            ['color','#fff'],
            ['boxShadow','none']
        ]
        this.fullScreenStyle = [
            ['position','absolute'],
            ['top','5px'],
            ['right','5px'],
            ['zIndex','1000'],
            ['height','20px'],
            ['width','20px'],
            ['backgroundImage','url(imgs/page.png)'],
            ['background','green'],
            ['cursor','pointer']
        ]
        this.style_append = (parent,style_array) =>
        {
            style_array.forEach(val =>{
                parent.style[val[0]] = val[1];
            })
        }
        this.animate01 = (elem,array) =>{
            elem.style.transform = `rotateY(-${array[0]}deg)`;
        }
        this.remove_animate = (elem,array) =>{
            array.forEach((val,idx,arr) =>{
            })
            elem.style.transform = 'rotateY(-180deg)';
        
        }
        this.complete_animate = (elem) =>{
            elem.style.transform = 'rotateY(0)';
        }
        this.disable_flip_forward = (idx,array1,array2)=>{
            switch(true)
            {
                case idx === 0 && array1.length !== 0:
                    array1[array1.length-1].style.transform = 'rotateY(0deg)';
                break;
                case idx === 1 && array2.length !== 0:
                    array2[array2.length-1].style.transform = 'rotateY(-180deg)'
            }
        }
        this.animate_bool = false
        this.size = bookInitParams.size;
        this.fullScreenIcon = document.createElement('div');
        this.style_append(this.fullScreenIcon,this.fullScreenStyle)
        this.string = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt incidunt fugit voluptas ipsum iure? Ipsa eos, dicta rem totam doloremque minus? Beatae similique quod asperiores consequuntur hic fugiat odit maiores.'
        this.parent = bookInitParams.parent;
        this.forward_btn = document.createElement('span');
        this.backward_btn = document.createElement('span');
        this.page_parent = document.createElement('div');
        this.book = document.createElement('div');
        this.cover_page = document.createElement('div');
        this.coverPageUrl = bookInitParams.pageSettings.coverPageImage;
        this.pageUrl = bookInitParams.pageSettings.pageUrl;
        this.pageSettings = bookInitParams.pageSettings;
        this.bookMaxSizing = bookInitParams.bookSettings.maxSizing;
        this.disablePageSound = bookInitParams.pageSettings.disablePageSound
        this.style_append(this.cover_page,this.parent_default)
        this.style_append(this.cover_page,this.cover_page_default);
        switch(true)
        {
            case bookInitParams.bookSettings.loadDefault:
                this.style_append(this.book,this.book_style);
        }
        this.style_append(this.book,bookInitParams.bookSettings.style);
        this.style_append(this.page_parent,this.parent_default);
        this.style_append(this.forward_btn,this.f_btn_style);
        this.style_append(this.backward_btn,this.b_btn_style);
        this.style_append(this.forward_btn,this.threed_style);
        this.style_append(this.backward_btn,this.threed_style);
        this.aux1 = document.createElement('div');
        this.aux2 = document.createElement('div');
        this.page_parent.appendChild(this.aux1);
        this.cover_page.appendChild(this.aux2);
        this.style_append(this.aux1,this.aux_style);
        this.style_append(this.aux2,this.aux_style)
        this.aux2.style.height = '100%'
        this.aux_element = new Array(this.aux1,this.aux2)
        this.page_elements = new Array();
        this.prev_pages = new Array()
        this.increment = 0;
        this.bool_array = new Array(false,false);
        this.book.appendChild(this.cover_page);
        this.book.appendChild(this.page_parent);
        this.book.appendChild(this.fullScreenIcon)
        this.parent.appendChild(this.book);
        this.page_parent.appendChild(this.forward_btn);
        this.cover_page.appendChild(this.backward_btn);
        this.YglobalRotation = 0;
        this.stagnant_matrix = [0,false];
        this.animationFrame = [0,1];//[dynamic frame rate,static frame rate]
        this.currentAnimationElement = null;
        this.endForwardAnimation = false;
        this.endBackwardAnimation = false;
        this.method = 'manual'
        this.size_refine = (parent) =>{
                let width = getComputedStyle(parent).width;
                let height = getComputedStyle(parent).height
                let new_array_height = ''
                let new_array_width = ''
                height = height.split('');
                width = width.split('');
                height.forEach(val =>{
                    switch(true)
                    {
                        case !isNaN(Number(val)) || val === '.' && val !== '':
                            new_array_height += val
                    }
                });
                width.forEach(val =>{
                    switch(true)
                    {
                        case !isNaN(Number(val)) || val === '.' && val !== '':
                            new_array_width += val
                    }
                })
                return [Number(new_array_height),Number(new_array_width)]
            }
        this.size = this.size_refine(this.page_parent);
        createBooksAndFlip.run(this)
    }
    static run(params)
    {
        const {pageNo,parent,page_parent,cover_page,aux_element,bool_array,string,page_style,child_style,style_append,animate01,remove_animate,complete_animate,disable_flip_forward,forward_btn,backward_btn,shadow_style,pageNum_style,size_refine,pageSettings,bookMaxSizing,disablePageSound,animationFrame} = params;
        let {size,page_elements,prev_pages,animate_bool,YglobalRotation,stagnant_matrix,currentAnimationElement,endBackwardAnimation,endForwardAnimation,frontStyle,method} = params;

        let leftBool = false;
        let rightBool = false;
        let rff = false;
        let lff = false
        let animationStart = false
        let animationFf = false
        let animation;
        const audio = new Audio('./book_lib/flip_sound/flip.mp3');
        const setMax_size = () =>{
            page_parent.style.maxHeight = `${size[0]}px`;
            page_parent.style.maxWidth = `${size[1]}px`;
            cover_page.style.maxHeight = `${size[0]}px`;
            cover_page.style.maxWidth = `${size[1]}px`;
        }
        function animation_MainFunction(){
                animation = requestAnimationFrame(animation_MainFunction);
                currentAnimationElement.style.transform = `rotatey(-${YglobalRotation}deg)`;//INSTANCE 1;
                //INSTANCE 2;
                switch(true)
                {
                    case rightBool && YglobalRotation >= 90 && YglobalRotation <= 94:
                        currentAnimationElement.style.zIndex = `${prev_pages.length+1}`;
                    break;
                    case leftBool && YglobalRotation <= 90 && YglobalRotation >= 86:
                        currentAnimationElement.style.zIndex = `${page_elements.length+1}`
                }

                //INSTANCE 3
                switch(true)
                {
                    case rightBool && rff:
                        switch(true)
                        {
                            case method === 'manual':
                                if(YglobalRotation >= 50){
                                    customisedFunction('incre',180)
                                }
                                else if(YglobalRotation < 50){
                                    customisedFunction('decre',0)
                                }
                            break;
                            case method === 'auto':
                                customisedFunction('incre',180)
                        }
                    break;
                    case leftBool && lff:
                        switch(true)
                        {
                            case method === 'manual':
                                if(YglobalRotation >= 140){
                                    customisedFunction('incre',180)
                                }
                                else if(YglobalRotation < 140)
                                {
                                    customisedFunction('decre',0)
                                }
                            break;
                            case method === 'auto':
                                customisedFunction('decre',0)
                        }
                }
        }

        function customisedFunction(mode,limit)
        {
            switch(true)
            {
                case mode === 'incre':
                    if(YglobalRotation >= limit)
                    {
                        cancelAnimationFrame(animation);
                        rff = false;
                        lff = false
                        switch(true)
                        {
                            case rightBool && page_elements[page_elements.length-1] !== undefined:
                                let new_array = [page_elements[page_elements.length-1]];
                                page_elements = page_elements.filter((val,idx,array) =>{return idx !== array.length-1});
                                prev_pages.push(...new_array);
                        }
                        animationStart = false;
                        currentAnimationElement.style.transform = `rotatey(-${180}deg)`
                    }else if(YglobalRotation < limit)
                    {
                        YglobalRotation+=4
                    }
                break;
                case mode === 'decre':
                    if(YglobalRotation <= limit)
                    {
                        cancelAnimationFrame(animation);
                        rff = false;
                        lff = false;
                        switch(true)
                        {
                            case leftBool && prev_pages[prev_pages.length-1] !== undefined:
                                let new_array = [prev_pages[prev_pages.length-1]];
                                prev_pages = prev_pages.filter((val,idx,array) =>{return idx !== array.length-1});
                                page_elements.push(...new_array);
                        }
                        animationStart = false;
                        currentAnimationElement.style.transform = `rotatey(${0}deg)`
                    }else if(YglobalRotation > limit)
                    {
                        YglobalRotation-=4
                    }
            }
        }
        switch(true)
        {
            case bookMaxSizing:
                setMax_size()
        }

        for(let i = 0; i < pageNo; i++){
            let document_elem = document.createElement('div');
            let page_cont = document.createElement('div');
            document_elem.appendChild(page_cont)
            switch(true)
            {
                case pageSettings.loadDefault:
                    style_append(page_cont,child_style);
            }
            switch(true)
            {
                case pageSettings.loadDefaultP:
                    style_append(document_elem,page_style);
            }
            style_append(page_cont,pageSettings.style);
            style_append(document_elem,pageSettings.styleP);
            document_elem.style.zIndex = `${i}`
            page_parent.appendChild(document_elem)
            page_elements.push(document_elem);
            switch(true)
            {
                case i === pageNo-1:
                    style_append(page_cont,frontStyle);
                    page_cont.classList.add('three_d_style')
                break;
                case i === 0:
                    style_append(page_cont,frontStyle);
                break
                default:
                    let pageNumber = document.createElement('span');
                    style_append(pageNumber,pageNum_style);
                    pageNumber.innerHTML = pageNo-i-1;
                    page_cont.appendChild(pageNumber)

            }
        }
        currentAnimationElement = page_elements[page_elements.length-1];

        window.addEventListener('resize', e =>{
            size = size_refine(page_parent);
        })

        backward_btn.addEventListener('click', e =>{
                    flip_forward();
        })

        forward_btn.addEventListener('click', e =>{
                    flip_backward();
        })

        function flip_forward(){
            method = 'auto';
            touching(0);
            rff = true;
        }

        function flip_backward(){
            method = 'auto';
            touching(1);
            lff = true;
        }

       function clearBooleans(idx)
       {
            switch(true)
            {
                case idx === 0:
                    rff = true;

                break;
                case idx === 1:
                    lff = true
            }
       }
       aux_element.forEach((val,idx) =>{
            val.addEventListener('touchmove', e =>{
                e.preventDefault();
                let rect = e.target.getBoundingClientRect();
                move(e.touches[0].clientX - rect.left,idx)
            })
            val.addEventListener('touchstart',e =>{
                method = 'manual'
                touching(idx)
            })
            val.addEventListener('touchend', e =>{
                bool_array[idx] = false;
                clearBooleans(idx);
            })
       })
        aux_element.forEach((val,idx) =>{
            val.addEventListener('mousedown', e =>{
                method = 'manual'
                touching(idx)
            })
            val.addEventListener('mouseup', e =>{
                        bool_array[idx] = false;
                        clearBooleans(idx);
                
            })
            val.addEventListener('mouseout', e =>{
                        bool_array[idx] = false;
                        clearBooleans(idx);
            })
            val.addEventListener('mousemove', e =>{
                e.preventDefault();
                move(e.offsetX,idx)
                
            })
        })

        function touching(idx)
        {
            lff = false;
            rff = false;
            if(!animationStart){
                bool_array[idx] = true;
                switch(true)
                {
                    case idx === 0:
                        rightBool = true;
                        leftBool = false;
                        switch(true)
                        {
                            case Array.from(page_elements).length !== 0 && page_elements[page_elements.length-1] !== undefined:
                            YglobalRotation = 0
                            currentAnimationElement = page_elements[page_elements.length-1];
                            animationStart = true;
                            animation_MainFunction();
                        }
                    break;
                    case idx === 1:
                        leftBool = true;
                        rightBool = false
                        switch(true)
                        {
                            case Array.from(prev_pages).length !== 0 && prev_pages[prev_pages.length-1] !== undefined:
                            YglobalRotation = 180
                            currentAnimationElement = prev_pages[prev_pages.length-1];
                            animationStart = true
                            animation_MainFunction()
                        }
                }
            }
        }


        function move(x,idx)
        {
            switch(true)
            {
                case bool_array[idx]:
                    switch(true)
                    {
                        case idx === 1 && prev_pages.length !== 0:
                            YglobalRotation = 180-((x/size[1])*90) <= 95 ? 95 : 180-((x/size[1])*90);
                        break;
                        case idx === 0 && page_elements.length !== 0:
                            YglobalRotation = 90-((x/size[1])*90) >= 85 ? 85 : 90-((x/size[1])*90);
                    }
            }
        }
    }
}


class bookInit{
    constructor()
    {
        this.parentSettings = {
            loadDefault:true,
            style:new Array()
        }
        this.pages = undefined;
        this.size = [100,50,'%'];
        this.parent = undefined
        this.bookSettings = {
            loadDefault:true,
            style:new Array(),
            maxSizing:true
        }
        this.pageSettings = {
            loadDefault:true,
            loadDefaultP:true,
            coverPageImage:'cover_page.png',
            disablePageSound:false,
            pageUrl:'page.png',
            style:new Array(),
            styleP:new Array()
        }
        this.createStyleArray = (text) =>{
            let string = text.split(';');
            let style_array = new Array()
            string.forEach(val =>{
                switch(true)
                {
                   case val !== '':
                    let miniArray = new Array()
                    val.split(':').forEach(value =>{
                        miniArray.push(value)
                    })
                    style_array.push(miniArray)
                }
            })
            return style_array
        }
        this.fullScreenIcon = null
        this.getPage_elements = null
        this.run = () =>{
            switch(true)
            {
                case this.pages !== undefined && this.parent !== undefined:
                    this.pageSettings.coverPageImage = `./book_lib/imgs/${this.pageSettings.coverPageImage}`;
                    this.pageSettings.pageUrl = `./book_lib/imgs/${this.pageSettings.pageUrl}`
                    let bookMain = new createBooksAndFlip(this);
                    this.getPage_elements = bookMain.page_elements;
                    this.fullScreenIcon = bookMain.fullScreenIcon
                break;
                default:
                    alert('please set a valid parent element')
            }
        }
    }
}

// const container = document.querySelector('.container');
// new createBooksAndFlip(10,[500,300,'px'],container);
export default bookInit