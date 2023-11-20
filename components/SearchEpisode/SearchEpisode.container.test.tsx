import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SearchEpisodeContainer from './SearchEpisode.container';
import { act } from 'react-dom/test-utils';

jest.mock('node-fetch');

describe('SearchEpisodeContainer', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('renders the component with initial state', async () => {
    const fetchEpisodesMock = jest.fn(() => Promise.resolve([]));

    jest.mock('node-fetch', () => jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ Poster: 'mockedPosterUrl' }),
      })
    ));

    await act(async () => {
      render(<SearchEpisodeContainer fetchEpisodes={fetchEpisodesMock} />);
    });
    
    // Check if the initial header is rendered
    expect(screen.getByText(/Please select a film to see details, such as opening crawl and director./)).toBeTruthy();

    expect(screen.getByRole('button', {name: /Sort by.../})).toBeTruthy();

    // Wait for the fetchEpisodes to complete
    await waitFor(() => {});

    expect(screen.getByPlaceholderText('Type to search...')).toBeTruthy();
  });
});
