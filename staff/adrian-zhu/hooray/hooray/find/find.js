describe('Hooray.prototype.find', function () {
    
    it('should find the first element that accomplish the condition of function', function (){

        var hooray, expected, result;

        hooray = new Hooray(1, 2, 3, 4);
    
        result = hooray.find(function (value){return value > 1}); 
    
        expected = 2;
    
        expect(result).toEqual(expected);
    });
    it('should break on undefined function', function () {

        var hooray = [1, 2, 3, 4];

        expect(function () { hooray.find(undefined); }).toThrowError(TypeError, 'undefined is not a function');

        expect(function() { hooray.find(true); }).toThrowError('true is not a function');
        
        expect(function() { hooray.find(1); }).toThrowError('1 is not a function');
    });
    
});