// code under test
import { getNowTimestamp, isExpired } from '../dateUtils';

describe('dateUtils', () => {
    describe('getNowTimestamp', () => {
        it('should get timestamp', () => {
            const result = getNowTimestamp();
            const date = new Date(result);
            expect(result).toEqual(date.toISOString());
        });
    });
    describe('isExpired', () => {
        const addHours = (timestamp: Date, hours: number) => {
            timestamp.setTime(timestamp.getTime() + hours * 60 * 60 * 1000);
        };
        const subtractHours = (timestamp: Date, hours: number) => {
            timestamp.setTime(timestamp.getTime() - hours * 60 * 60 * 1000);
        };
        let date: Date;
        beforeEach(() => {
            date = new Date();
        });
        it('should handle a valid Date', () => {
            addHours(date, 1);
            const result = isExpired(date);
            expect(result).toBe(false);
        });
        it('should handle a valid string timestamp', () => {
            addHours(date, 1);
            const result = isExpired(date.toISOString());
            expect(result).toBe(false);
        });
        it('should handle an expired Date', () => {
            subtractHours(date, 1);
            const result = isExpired(date);
            expect(result).toBe(true);
        });
        it('should handle an expired string timestamp', () => {
            subtractHours(date, 1);
            const result = isExpired(date.toISOString());
            expect(result).toBe(true);
        });
        it('should handle a falsy timestamp', () => {
            date = null as any;
            const result = isExpired(date);
            expect(result).toBe(false);
        });
    });
});
