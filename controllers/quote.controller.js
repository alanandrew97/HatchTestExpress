var quotesService = require('../services/quotes.service');

exports.quoteCar = (req, res) => {
    const brand = req.query.brand;
    const year = req.query.year;
    const hasAC = req.query.hasAC;

    if (!brand || !year || hasAC == undefined) {
        return {error: "Brand, year and hasAC are required params."};
    }

    // Get all valid quotes.
    const allBrandsQuotes = quotesService.getValidQuotes();

    // Filter quotes by car brand
    const quotes = allBrandsQuotes.filter(quote => quote.brand === brand);

    // Filter quotes which year range cover the requested year.
    const quotesInYear = quotes.filter(quote => {
        const initialYear = quote.yearRange[0];
        const endYear = quote.yearRange[1];

        return initialYear <= year && endYear >= year;
    });

    // Create the result array which contains the best quotes found for each coverage type
    const bestQuotes = this.findBestQuotes(quotesInYear, hasAC);

    return bestQuotes;
}

exports.bestOptionsPerYear = (req, res) => {
    const year = req.query.year;

    if (!year) {
        return null;
    }

    // Get all valid quotes.
    const quotes = quotesService.getValidQuotes();

    // Filter quotes which year range cover the requested year.
    const quotesInYear = quotes.filter(quote => {
        const initialYear = quote.yearRange[0];
        const endYear = quote.yearRange[1];

        return initialYear <= year && endYear >= year;
    });

    // Create the result array which contains the best quotes found for each coverage type
    const bestQuotes = this.findBestQuotes(quotesInYear, false);

    return bestQuotes;
}

exports.findBestQuotes = (quotes, hasAC) => {
    let bestRCQuote;
    let bestLowQuote;
    let bestMidQuote;
    let bestHighQuote;

    // Find best quotes per coverage, the best is the one with the lowest price
    quotes.forEach(quote => {
        const price = +quote.price.replace(',', '');
        const extraPrice = hasAC ? +quote.extraCoveragePrice.replace(',', '') : 0;

        if (quote.coverageType === this.coverageTypes.RC) { // Checks coverage type
            if (!bestRCQuote) { // If there's no bestRCQuote, asign this quote
                bestRCQuote = quote;
                // If there's a best quote, reasign to this quote if it has lower price
                // Considers the extraCoveragePrice property if hasAC
            } else {
                const bestPrice = +bestRCQuote.price.replace(',', '');
                const bestExtraPrice = hasAC ? +bestRCQuote.extraCoveragePrice.replace(',', '') : 0;

                if ((bestPrice + bestExtraPrice) > (price + extraPrice)) {
                    bestRCQuote = quote;
                }
            }
        } else if (quote.coverageType === this.coverageTypes.LOW) {
            if (!bestLowQuote) {
                bestLowQuote = quote;
            } else {
                const bestPrice = +bestLowQuote.price.replace(',', '');
                const bestExtraPrice = hasAC ? +bestLowQuote.extraCoveragePrice.replace(',', '') : 0;

                if ((bestPrice + bestExtraPrice) > (price + extraPrice)) {
                    bestLowQuote = quote;
                }
            }
        } else if (quote.coverageType === this.coverageTypes.MID) {
            if (!bestMidQuote) {
                bestMidQuote = quote;
            } else {
                const bestPrice = +bestMidQuote.price.replace(',', '');
                const bestExtraPrice = hasAC ? +bestMidQuote.extraCoveragePrice.replace(',', '') : 0;

                if ((bestPrice + bestExtraPrice) > (price + extraPrice)) {
                    bestMidQuote = quote;
                }
            }
        } else if (quote.coverageType === this.coverageTypes.HIGH) {
            if (!bestHighQuote) {
                bestHighQuote = quote;
            } else {
                const bestPrice = +bestHighQuote.price.replace(',', '');
                const bestExtraPrice = hasAC ? +bestHighQuote.extraCoveragePrice.replace(',', '') : 0;

                if ((bestPrice + bestExtraPrice) > (price + extraPrice)) {
                    bestHighQuote = quote;
                }
            }
        }
    });

    // Create the result array which contains the best quotes found for each coverage type
    const bestQuotes = [];
    if (bestRCQuote) bestQuotes.push(bestRCQuote);
    if (bestLowQuote) bestQuotes.push(bestLowQuote);
    if (bestMidQuote) bestQuotes.push(bestMidQuote);
    if (bestHighQuote) bestQuotes.push(bestHighQuote);

    return bestQuotes;
}

exports.coverageTypes = {
    RC: 'RC',
    LOW: 'Low',
    MID: 'Mid',
    HIGH: 'High'
};