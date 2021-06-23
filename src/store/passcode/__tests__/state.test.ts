// code under test
import state from '../state';

describe('state', () => {
    it('should define default state', () => {
        expect(state).toEqual({});
    });
});
