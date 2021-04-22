import React from 'react';
import { fireEvent } from '@testing-library/react';

import WatchLaterButton from './WatchLaterButton';

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
        <WatchLaterButton videoInfo={mockedVideoInfo} videoId="videoId" />
      );
      expect(container.firstChild).toBeNull();
    });
  });

  describe('When logged In', () => {
    it('displays "Watch Later" message in initial render', () => {
      const mockDispatchGlobal = jest.fn();
      jest.spyOn(GlobalProvider, 'useGlobalContext').mockImplementation(() => ({
        dispatchGlobal: mockDispatchGlobal,
        globalState: STATE_LOGGED_IN,
      }));
      const { getByText } = customRenderGlobalProviders(
        <WatchLaterButton videoInfo={mockedVideoInfo} videoId="videoId" />
      );

      const watchLaterButtonMessage = getByText(/Watch Later/i);
      expect(watchLaterButtonMessage).toBeInTheDocument();
    });

    it('changes icon when clicked', () => {
      const mockDispatchGlobal = jest.fn();
      jest.spyOn(GlobalProvider, 'useGlobalContext').mockImplementation(() => ({
        dispatchGlobal: mockDispatchGlobal,
        globalState: STATE_LOGGED_IN,
      }));

      const { getByTestId, queryByTestId } = customRenderGlobalProviders(
        <WatchLaterButton videoInfo={mockedVideoInfo} videoId="videoId" />
      );

      expect(queryByTestId(/checked-icon-testid/i)).not.toBeInTheDocument();

      const watchLaterButton = getByTestId(/watch-later-button/i);
      fireEvent.click(watchLaterButton);

      expect(queryByTestId(/checked-icon-testid/i)).toBeInTheDocument();
    });

    it('Calls  storage.get() when first loaded and when clicked', () => {
      const mockDispatchGlobal = jest.fn();
      jest.spyOn(GlobalProvider, 'useGlobalContext').mockImplementation(() => ({
        dispatchGlobal: mockDispatchGlobal,
        globalState: STATE_LOGGED_IN,
      }));

      const { getByTestId } = customRenderGlobalProviders(
        <WatchLaterButton videoInfo={mockedVideoInfo} videoId="videoId" />
      );

      const watchLaterButton = getByTestId(/watch-later-button/i);

      expect(storage.get).toBeCalledTimes(1);
      fireEvent.click(watchLaterButton);

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
        <WatchLaterButton videoInfo={mockedVideoInfo} videoId="videoId" />
      );

      const watchLaterButton = getByTestId(/watch-later-button/i);
      storage.get.mockReturnValue(null);

      expect(storage.get).toBeCalledTimes(1);

      fireEvent.click(watchLaterButton);

      expect(storage.get).toHaveBeenNthCalledWith(
        2,
        SAVED_WATCH_LATER_VIDEOS_STORAGE_KEY
      );

      expect(storage.set).toHaveBeenNthCalledWith(
        1,
        SAVED_WATCH_LATER_VIDEOS_STORAGE_KEY,
        { videoId: { ...mockedVideoInfo, id: { videoId: 'videoId' } } }
      );
    });

    it('Removes an element, when present in the storage', () => {
      const mockDispatchGlobal = jest.fn();
      jest.spyOn(GlobalProvider, 'useGlobalContext').mockImplementation(() => ({
        dispatchGlobal: mockDispatchGlobal,
        globalState: STATE_LOGGED_IN,
      }));

      const { getByTestId } = customRenderGlobalProviders(
        <WatchLaterButton videoInfo={mockedVideoInfo} videoId="videoId" />
      );

      const watchLaterButton = getByTestId(/watch-later-button/i);
      storage.get.mockReturnValue({ videoId: mockedVideoInfo });

      expect(storage.get).toBeCalledTimes(1);

      fireEvent.click(watchLaterButton);

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
