export const unixToTime = (_time) =>{
    let a = new Date(_time*1000);
    let date = a.getDate();
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let month = months[a.getMonth()];
    let year = a.getFullYear();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let parseMin = (min<10) ? `0${min}` : min;
    let parseSec = (sec<10) ? `0${sec}` : sec;
    let time = `${date}/${month}/${year} at ${hour}:${parseMin}:${parseSec}`;
    return time;
}