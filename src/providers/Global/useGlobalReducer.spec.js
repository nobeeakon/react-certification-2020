import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';

import useGlobalReducer, { ACTIONS } from './useGlobalReducer';

describe('useGlobalReducer custom useReducer hook', () => {
  test('Initial state values', () => {
    const { result } = renderHook(() => useGlobalReducer());
    const [state] = result.current;

    const { isDarkMode, searchTerm } = state;

    expect(isDarkMode).toBe(false);
    expect(searchTerm).toBe('');
  });

  describe('isDarkMode', () => {
    it('should return !isDarkMode, when "ACTIONS.TOOGLE_DARK" is called', () => {
      const { result } = renderHook(() => useGlobalReducer());
      const [initialState, dispatchGlobal] = result.current;

      expect(initialState.isDarkMode).toBe(false);
      act(() => {
        dispatchGlobal({ type: ACTIONS.TOOGLE_DARK });
      });

      const [modifiedState] = result.current;
      expect(modifiedState.isDarkMode).toBe(true);
    });
  });

  describe('searchTerm ', () => {
    it('should update searchTerm, when "ACTIONS.UPDATE_SEARCH" is called', () => {
      const { result } = renderHook(() => useGlobalReducer());
      const [initialState, dispatchGlobal] = result.current;

      expect(initialState.searchTerm).toBe('');

      act(() => {
        dispatchGlobal({ type: ACTIONS.UPDATE_SEARCH, payload: 'newTerm' });
      });

      const [modifiedState] = result.current;
      expect(modifiedState.searchTerm).toBe('newTerm');
    });
  });
});
