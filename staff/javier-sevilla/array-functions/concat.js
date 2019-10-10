function concat(array) { 	
    if (array===undefined) throw TypeError(array + ' is no an array')
    if (!(arguments[0] instanceof Array)) throw TypeError(arguments[0] + ' is no an array')

    var newArray = []; 

    var x = 0;
    for (var y = 0; y < arguments[0].length; y++){
        newArray[x] = arguments[0][y];
        x += 1;
    }

    for (var i = 1; i < arguments.length; i++) {
        if (arguments[i] instanceof Array) {
            for (var j = 0; j < arguments[i].length; j++) {
                newArray[x] =  arguments[i][j];  
                x += 1;
            }           
        } else {
            newArray[x] = arguments[i];
            x += 1;
        } 
    }
    
    
    return newArray;
    
}