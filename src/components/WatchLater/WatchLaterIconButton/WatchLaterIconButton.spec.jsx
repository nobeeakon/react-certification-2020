import React from 'react';
import { fireEvent, act } from '@testing-library/react';

import WatchLaterButton from './WatchLaterIconButton';

import { storage } from '../../../utils/storage';
import { SAVED_WATCH_LATER_VIDEOS_STORAGE_KEY } from '../../../utils/constants';

import customRenderGlobalProviders from '../../../utils/tests/customRenders/customRenderGlobalProviders';

import * as GlobalProvider from '../../../providers/Global/Global.provider';

jest.spyOn(storage, 'get');
jest.spyOn(storage, 'set');

afterEach(() => {
  jest.clearAllMocks();
});

const mockedVideoInfo = {
  videoId: 'videoId',
};

const setIsWatchLaterSelected = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

const STATE_LOGGED_IN = {
  isDarkMode: false,
  searchTerm: '',
  isAuthenticated: true,
  userInfo: {},
};

const STATE_LOGGED_OUT = {
  isDarkMode: false,
  searchTerm: '',
  isAuthenticated: false,
  userInfo: null,
};

describe('Testing WatchLater Button', () => {
  describe('Not displayed when not logged In', () => {
    it('should return empty element', () => {
      const mockDispatchGlobal = jest.fn();
      jest.spyOn(GlobalProvider, 'useGlobalContext').mockImplementation(() => ({
        dispatchGlobal: mockDispatchGlobal,
        globalState: STATE_LOGGED_OUT,
      }));

      const { container } = customRenderGlobalProviders(
        <WatchLaterButton
          videoInfo={mockedVideoInfo}
          videoId="videoId"
          setIsWatchLaterSelected={setIsWatchLaterSelected}
        />
      );
      expect(container.firstChild).toBeNull();
    });
  });

  describe('When logged In', () => {
    it('displays icon in initial render', () => {
      const mockDispatchGlobal = jest.fn();
      jest.spyOn(GlobalProvider, 'useGlobalContext').mockImplementation(() => ({
        dispatchGlobal: mockDispatchGlobal,
        globalState: STATE_LOGGED_IN,
      }));
      const { getByTestId } = customRenderGlobalProviders(
        <WatchLaterButton
          videoInfo={mockedVideoInfo}
          videoId="videoId"
          setIsWatchLaterSelected={setIsWatchLaterSelected}
        />
      );

      const watchLaterButton = getByTestId(/clock-icon-testid/i);
      expect(watchLaterButton).toBeInTheDocument();
    });

    it('Calls  storage.get() when first loaded and when clicked', () => {
      const mockDispatchGlobal = jest.fn();
      jest.spyOn(GlobalProvider, 'useGlobalContext').mockImplementation(() => ({
        dispatchGlobal: mockDispatchGlobal,
        globalState: STATE_LOGGED_IN,
      }));

      const { getByTestId } = customRenderGlobalProviders(
        <WatchLaterButton
          videoInfo={mockedVideoInfo}
          videoId="videoId"
          setIsWatchLaterSelected={setIsWatchLaterSelected}
        />
      );

      const watchLaterButton = getByTestId(/watch-later-button/i);

      expect(storage.get).toBeCalledTimes(1);
      act(() => {
        fireEvent.click(watchLaterButton);
      });
      expect(storage.get).toHaveBeenNthCalledWith(
        2,
        SAVED_WATCH_LATER_VIDEOS_STORAGE_KEY
      );
    });

    it('Adds an element, when not present in the storage', () => {
      const mockDispatchGlobal = jest.fn();
      jest.spyOn(GlobalProvider, 'useGlobalContext').mockImplementation(() => ({
        dispatchGlobal: mockDispatchGlobal,
        globalState: STATE_LOGGED_IN,
      }));

      const { getByTestId } = customRenderGlobalProviders(
        <WatchLaterButton
          videoInfo={mockedVideoInfo}
          videoId="videoId"
          setIsWatchLaterSelected={setIsWatchLaterSelected}
        />
      );

      const watchLaterButton = getByTestId(/watch-later-button/i);
      storage.get.mockReturnValue(null);

      expect(storage.get).toBeCalledTimes(1);
      act(() => {
        fireEvent.click(watchLaterButton);
      });
      expect(storage.get).toHaveBeenNthCalledWith(
        2,
        SAVED_WATCH_LATER_VIDEOS_STORAGE_KEY
      );
      expect(storage.set).toHaveBeenNthCalledWith(
        1,
        SAVED_WATCH_LATER_VIDEOS_STORAGE_KEY,
        {
          videoId: mockedVideoInfo,
        }
      );
    });

    it('Removes an element, when present in the storage', () => {
      const mockDispatchGlobal = jest.fn();
      jest.spyOn(GlobalProvider, 'useGlobalContext').mockImplementation(() => ({
        dispatchGlobal: mockDispatchGlobal,
        globalState: STATE_LOGGED_IN,
      }));

      const { getByTestId } = customRenderGlobalProviders(
        <WatchLaterButton
          videoInfo={mockedVideoInfo}
          videoId="videoId"
          setIsWatchLaterSelected={setIsWatchLaterSelected}
        />
      );

      const watchLaterButton = getByTestId(/watch-later-button/i);
      storage.get.mockReturnValue({ videoId: mockedVideoInfo });

      expect(storage.get).toBeCalledTimes(1);

      act(() => {
        fireEvent.click(watchLaterButton);
      });
      expect(storage.get).toHaveBeenNthCalledWith(
        2,
        SAVED_WATCH_LATER_VIDEOS_STORAGE_KEY
      );
      expect(storage.set).toHaveBeenNthCalledWith(
        1,
        SAVED_WATCH_LATER_VIDEOS_STORAGE_KEY,
        {}
      );
    });
  });
});
