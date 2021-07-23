export const degToDir = (_degree) => {
    _degree = parseFloat(_degree);
    if(_degree < 337.5 && _degree > 292.5){
        return "South-East";
    } else if (_degree < 292.5 && _degree > 265){
        return "South";
    } else if(_degree < 265 && _degree > 247.5){
        return "South-West";
    } else if(_degree < 247.5 && _degree > 202.5){
        return "West";
    } else if(_degree < 202.5 && _degree > 112.5){
        return "North-West";
    } else if(_degree < 112.5 && _degree > 67.5){
        return "North";
    }else if(_degree < 67.5 && _degree > 22.5){
        return "North-East"
    } else {
        return "East";
    }
}