const decimalToRomanNumerals = (num: number): string => {
    const mappingRomanNumerals = [
        { value: 6, numeral: 'VI' },
        { value: 5, numeral: 'V' },
        { value: 4, numeral: 'IV' },
        { value: 3, numeral: 'III' },
        { value: 2, numeral: 'II' },
        { value: 1, numeral: 'I' }
    ];
    
    function convertToRoman() {
        const romanNumeral = '';
        if (isNaN(num)) {
            return romanNumeral;
        }
        const decimalNumeral = mappingRomanNumerals.filter((item) => num === item.value);
        if (decimalNumeral && decimalNumeral.length) {
            return decimalNumeral[0].numeral;
        } else {
            return romanNumeral;
        }
    }

    return convertToRoman();
}

export default decimalToRomanNumerals;
