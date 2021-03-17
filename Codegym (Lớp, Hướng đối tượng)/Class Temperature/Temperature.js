class Temperature {
    constructor (celcius) {
    this.celcius = celcius;
    }
    getFahrenheit () {
        return 1.8*this.celcius+32;
    }
    getKevin () {
        return this.celcius+273;
    }
}

let temperature = new Temperature(30);
let fahrenheit = temperature.getFahrenheit();
let kevin = temperature.getKevin();
alert(fahrenheit);
alert(fahrenheit);
