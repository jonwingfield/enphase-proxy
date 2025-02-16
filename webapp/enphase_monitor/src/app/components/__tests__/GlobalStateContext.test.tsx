import '@testing-library/jest-dom';
import { describe, it, expect } from '@jest/globals';
import { GlobalState, getBillingRate } from '../GlobalStateContext';

describe('getBillingRate', () => {
    const mockGlobalState: GlobalState = {
        ratePerKWHUnder1000: 14.859,
        ratePerKWHOver1000: 17.098,
        autoRefresh: true,
        weather: null,
        energyState: "idle",
        source: "home",
        batt_percent: 0,
        teslaState: 'unplugged',
        billingCycleDates: [
            "2024-01-31",
            "2024-02-28", 
            "2024-03-31",
            "2024-04-30"
        ].sort(),
        billingRates: {
            "2024-01-31": {
                ratePerKWHUnder1000: 13.275,
                ratePerKWHOver1000: 17.098,
            },
            "2024-03-31": {
                ratePerKWHUnder1000: 14.859,
                ratePerKWHOver1000: 17.098,
            }
        },
    };

    it('should return rates for exact billing cycle date', () => {
        const date = new Date('2024-03-31 12:00:00');
        const rates = getBillingRate(mockGlobalState, date);
        expect(rates).toEqual({
            ratePerKWHUnder1000: 14.859,
            ratePerKWHOver1000: 17.098,
        });
    });

    it('should return rates from previous billing cycle when date is between cycles', () => {
        const date = new Date('2024-02-15');
        const rates = getBillingRate(mockGlobalState, date);
        expect(rates).toEqual({
            ratePerKWHUnder1000: 13.275,
            ratePerKWHOver1000: 17.098,
        });
    });

    it('should return first available rate when date is before any billing cycle', () => {
        const date = new Date('2023-12-15');
        const rates = getBillingRate(mockGlobalState, date);
        expect(rates).toEqual({
            ratePerKWHUnder1000: 13.275,
            ratePerKWHOver1000: 17.098,
        });
    });

    it('should return latest available rate when date is after all billing cycles', () => {
        const date = new Date('2024-05-15');
        const rates = getBillingRate(mockGlobalState, date);
        expect(rates).toEqual({
            ratePerKWHUnder1000: 14.859,
            ratePerKWHOver1000: 17.098,
        });
    });
}); 