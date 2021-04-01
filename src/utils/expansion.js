(() => {

    const isDev = process.env.NODE_ENV === "development";

    console.dev = (log) => {
        if(isDev){
            console.log(`%c ${log}`, 'background: #111; color: rgb(0, 204, 255);font-weight: 700');
        }else {
            console.clear();
            return null;
        }
    }

    console.component = (log) => {
        if(isDev){
            console.log(`%c ${log}`, 'background: rgb(30, 143, 255); color: rgb(255,255, 255);font-weight: 400; font-size: 13px');
        }else {
            console.clear();
            return null;
        }
    }

})();

