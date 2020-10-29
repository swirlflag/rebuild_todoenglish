export const targetPathDetect = (path,target) => {

    let result = false;
    for(let i = 0, l = path.length; i < l; ++i){
        if(target === path[i]){
            result = true;
            break;
        }
    }

}

export const detectTouchdevice = () => {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
};
