const fs = require('fs');

exports.getValidQuotes = () => {
    // Read data from quotes.json
    let rawdata = fs.readFileSync('quotes.json');
    let quotes = JSON.parse(rawdata);

    // Declare current valid brands and companies
    const validBrands = [
        'Chevrolet',
        'Dodge',
        'Ford',
        'GMC',
        'Honda'
    ];

    const validCompanies = [
        'Seguros Atlas',
        'Qualitas',
        'MAPFRE'
    ];

    // Filter the given data to allows only the current valid brands and companies
    const validQuotes = quotes.filter(quote => {
        return validCompanies.includes(quote.company) && validBrands.includes(quote.brand)
    });

    return validQuotes;
}