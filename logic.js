decimal_box = document.getElementById("decimal");
binary_box = document.getElementById("binary");
u1_box = document.getElementById("u1");
u2_box = document.getElementById("u2");
oct_box = document.getElementById("oct");
hex_box = document.getElementById("hex");
float_box = document.getElementById("float32");

var input;

binary_box.addEventListener("input", function() {
    input = binary_box.value;
    if (input.length > 0) {
        input = binaryToDecimal(input);
        binary = input.toString(2);

        console.log(input);
        decimal_box.value = input;
        u1_box.value = toU1(binary, 8);
        u2_box.value = toU2(binary, 8);
        oct_box.value = input.toString(8);
        hex_box.value = input.toString(16);
        float_box.value = floatToBinary(input);
    } else {
        clear();
    }
});

decimal_box.addEventListener("input", function() {
    input = decimal_box.value;
    if (input.length > 0) {
        input = parseFloat(input);
        binary = input.toString(2);
        binary_box.value = input.toString(2);
        u1_box.value = toU1(binary, 8);
        u2_box.value = toU2(binary, 8);
        oct_box.value = input.toString(8);
        hex_box.value = input.toString(16);
        float_box.value = floatToBinary(input);
    } else {
        clear();
    }
});

float_box.addEventListener("input", function() {
    input = float_box.value;
    if (input.length > 0) {
        input = binaryFloatToDecimal(input);
        binary = input.toString(2);
        decimal_box.value = input;
        binary_box.value = input.toString(2);
        u1_box.value = toU1(binary, 8);
        u2_box.value = toU2(binary, 8);
        oct_box.value = input.toString(8);
        hex_box.value = input.toString(16);
    } else {
        clear();
    }
});

oct_box.addEventListener("input", function() { 
    input = oct_box.value;
    if (input.length > 0) {
        input = parseInt(input, 8);
        binary = input.toString(2);
        decimal_box.value = input;
        binary_box.value = input.toString(2);
        u1_box.value = toU1(binary, 8);
        u2_box.value = toU2(binary, 8);
        hex_box.value = input.toString(16);
        float_box.value = floatToBinary(input);
    } else {
        clear();
    }
});

hex_box.addEventListener("input", function() {
    input = hex_box.value;
    if (input.length > 0) {
        input = parseInt(input, 16);
        binary = input.toString(2);
        decimal_box.value = input;
        binary_box.value = input.toString(2);
        u1_box.value = toU1(binary, 8);
        u2_box.value = toU2(binary, 8);
        oct_box.value = input.toString(8);
        float_box.value = floatToBinary(input);
    } else {
        clear();
    }
});

function clear(){
    decimal.value = "";
    binary_box.value = "";
    u1_box.value = "";
    u2_box.value = "";
    oct_box.value = "";
    hex_box.value = "";
    float_box.value = "";
}


function floatToBinary(floatValue) {
    var floatArray = new Float32Array(1);
    floatArray[0] = floatValue;

    var binaryRepresentation = new Uint32Array(floatArray.buffer);

    var binaryString = binaryRepresentation[0].toString(2).padStart(32, '0');

    return binaryString;
}

function binaryFloatToDecimal(binaryStr) {
    // Assuming 32-bit floating-point format (IEEE 754 single-precision)
    var sign = parseInt(binaryStr[0], 2);
    var exponent = parseInt(binaryStr.substr(1, 8), 2) - 127;
    var fraction = 1 + parseInt(binaryStr.substr(9), 2) / Math.pow(2, 23);

    // Applying the formula
    var value = Math.pow(-1, sign) * fraction * Math.pow(2, exponent);

    return value;
}

function binaryToDecimal(binaryNumber) {
    // Split the binary number into integer and fractional parts
    var [integerPart, fractionalPart] = binaryNumber.split('.');
  
    // Convert the integer part to decimal using parseInt with a radix of 2
    var decimalInteger = parseInt(integerPart, 2);
  
    // Convert the fractional part to decimal
    var decimalFraction = 0;
    if (fractionalPart) {
      for (var i = 0; i < fractionalPart.length; i++) {
        decimalFraction += parseInt(fractionalPart[i], 2) / Math.pow(2, i + 1);
      }
    }
  
    // Combine the integer and fractional parts to get the final decimal number
    var decimalNumber = decimalInteger + decimalFraction;
  
    return decimalNumber;
}

function toU2(binary, numBits) {
    // Convert signed binary to U2 representation
    const value = parseInt(binary, 2);
    const maxValue = Math.pow(2, numBits);
    const u2Value = (value + maxValue) % maxValue;
    
    // Convert U2 value to binary with leading zeros
    const u2Binary = u2Value.toString(2).padStart(numBits, '0');

    return u2Binary;
}

function toU1(binaryValue, numberOfBits) {
    // Check if the number is negative
    const isNegative = binaryValue.charAt(0) === '-';

    // Remove the negative sign if present
    if (isNegative) {
        binaryValue = binaryValue.slice(1);
    }

    // Convert the binary value to an array of bits
    let bits = binaryValue.split('');
    // Ensure the result has the specified number of bits
    while (bits.length < numberOfBits) {
        bits.unshift('0');
    }

    // If the number is negative, find the one's complement
    if (isNegative) {
        bits = bits.map(bit => (bit === '0' ? '1' : '0'));
    }

    // Convert the array of bits back to a string
    return bits.join('');
}
