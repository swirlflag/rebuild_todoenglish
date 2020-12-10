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

})();

