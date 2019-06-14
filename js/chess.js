$(function () {
    let box = $('.box');
    let flag = true;
    let back = $('.back');
    let newOne = $('.new');
    let id;
    let black = {} , white = {};
    let blank = {};
    let ai = true;
    let pos;
    for(let i = 0;i<15;i++){
        for (let j = 0 ;j<15;j++){
            $('<div>').addClass('chess')
                .appendTo(box)
                .attr('id',i + '_' + j);
            blank[i +'_' + j ] = true;
        }
    }

    box.on('click','.chess',function () {
        if($(this).hasClass('black')||$(this).hasClass('white')){
            return;
        }
        let coords = $(this).attr('id');
            if (flag){
                black[coords] = true;
                delete blank[coords];
                $(this).addClass('black');
                if(isSuccess(black,coords) >= 5){
                    console.log("恭喜黑");
                    box.off("click");
                }
                if(ai){
                    pos = aifn();
                    white[pos] = true;
                    delete blank[pos];
                    $('#'+pos).addClass('white');
                    if(isSuccess(white,pos) == 5){
                        console.log("恭喜白");
                        box.off("click");
                    }
                    flag = !flag;
                }
            } else {
                white[coords] = true;
                delete blank[coords];
                $(this).addClass('white');
                if(isSuccess(white,coords) >= 5){
                    console.log("恭喜白");
                    box.off("click");
                }
                // if(ai){
                //     let pos = aifn();
                //     black[pos] = true;
                //     delete blank[pos];
                //     $('#'+pos).addClass('black');
                //     if(isSuccess(black,coords) >= 5){
                //         console.log("恭喜黑");
                //         box.off("click");
                //     }
                //     flag = !flag;
                // }
            }
        flag = !flag;
    })

    function aifn() {
        let blankScore1 = 0;
        let blankScore2 = 0;
        let pos1 = '';
        let pos2 = '';
        for(let i in blank){
            let score = isSuccess(black,i);
            if(score >= blankScore1) {
                blankScore1 = score;
                pos1 = i;
            }
        }
        for(let i in blank){
            let score = isSuccess(white,i);
            if(score >= blankScore2) {
                blankScore2 = score;
                pos2 = i;
            }
        }
        return blankScore2 >= blankScore1 ? pos2 : pos1;
    }

    function isSuccess(obj,coords){
        let sp = 1, cz = 1, yx = 1, zx = 1;
        let [x , y ] = coords.split('_');
        let i = x * 1, j = y * 1;

        //sp
        while(obj[i +'_'+ (++j)]){
            sp++;
        }
        j = y * 1;
        while(obj[i +'_'+ (--j)]){
            sp++;
        }
    //    cz
        j = y * 1;
        while(obj[(++i) +'_'+ j]){
            cz++;
        }
        i = x * 1;
        while(obj[(--i) +'_'+ j]){
            cz++;
        }
    //    yx
        i = x * 1;
        while(obj[(--i) +'_'+ (++j)]){
            yx++;
        }
        i = x * 1;
        j = y * 1;
        while(obj[(++i) +'_'+ (--j)]){
            yx++;
        }
    //    zx
        i = x * 1;
        j = y * 1;
        while(obj[(--i) +'_'+ (--j)]){
            zx++;
        }
        i = x * 1;
        j = y * 1;
        while(obj[(++i) +'_'+ (++j)]){
            zx++;
        }

        let max = Math.max(sp,cz,yx,zx);
        return max;
    }

    // back.on('click',function () {
    //     if($('#'+pos).hasClass('black')){
    //         $('#'+pos).removeClass('black')
    //     }else {
    //         $('#'+pos).removeClass('white')
    //     }
    //     flag = !flag;
    // })

    newOne.on('click',function () {
        location.reload();
    })
})