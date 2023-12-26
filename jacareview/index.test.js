import { describe, test, assert } from 'vitest';
import { JSDOM } from 'jsdom';
import moment from 'moment';
import { renderToStaticMarkup} from "react-dom/server"
import CalculateTimeDifference from './app/globalfunctions/CalculateTimeDifference';
import priceLevelText from './app/globalfunctions/PriceLevelText';
import RandomOneRestaurant from './app/globalfunctions/RandomOneRestaurant';
import FetchBusinesses from './app/globalfunctions/FetchBusinesses';

const dom = new JSDOM();
global.document = dom.window.document;

describe('test CalculateTimeDifference Function', () => {
  test('CalculateTimeDifference function', async () => {
    const now = moment();
    const oneMinuteAgo = moment().subtract(1, 'minutes');
    const oneHourAgo = moment().subtract(1, 'hours');
    const oneDayAgo = moment().subtract(1, 'days');

    // Test for less than 60 minutes
    assert.equal(CalculateTimeDifference(oneMinuteAgo), '1 minutes ago');

    // Test for less than 24 hours
    assert.equal(CalculateTimeDifference(oneHourAgo), '1 hours ago');

    // Test for more than 24 hours
    assert.equal(CalculateTimeDifference(oneDayAgo), '1 days ago');

    // Test for the current moment (should be '0 minutes ago')
    assert.equal(CalculateTimeDifference(now), '0 minutes ago');
  });
});

describe('test PriceLevelText function', () => {
  test('priceLevelText function', async () => {
    const multiplier = 3;

    // Call your function to generate the component
    const result = priceLevelText(multiplier);

    // Convert React element to HTML string
    const htmlString = renderToStaticMarkup(result);

    // Create a container element
    const container = dom.window.document.createElement('div');
    dom.window.document.body.appendChild(container);

    // Append the generated HTML to the container
    container.innerHTML = htmlString;

    // Query the container for svg elements
    const renderedCircleDollarSigns = container.querySelectorAll('svg');

    // Verify the number of CircleDollarSign components rendered
    assert.equal(renderedCircleDollarSigns.length, multiplier);

    // Verify that each rendered element is a CircleDollarSign component
    renderedCircleDollarSigns.forEach((element, index) => {
      assert.equal(element.nodeName, 'svg');

      // Additional assertions for debugging
      assert.equal(element.getAttribute('data-testid'), 'circleDollarSign');
      assert.equal(element.getAttribute('class'), 'w-full h-full rounded-full');
    });
  });
});

describe('test RandomOneRestaurant function', () => {
  test('returns undefined for an empty array', () => {
    const result = RandomOneRestaurant([]);
    assert.equal(result, undefined);
  });

  test('returns a random element for a non-empty array', () => {
    // Mocking Math.random to always return 0.5 for predictable testing
    const originalMathRandom = Math.random;
    Math.random = () => 0.5;

    const array = [1, 2, 3, 4, 5];
    const result = RandomOneRestaurant(array);

    // Restoring Math.random to its original state
    Math.random = originalMathRandom;

    // Ensure that the result is one of the elements in the array
    assert.ok(array.includes(result));
  });

  test('returns undefined for an undefined input', () => {
    const result = RandomOneRestaurant(undefined);
    assert.equal(result, undefined);
  });

  test('returns undefined for a null input', () => {
    const result = RandomOneRestaurant(null);
    assert.equal(result, undefined);
  });
});

import { describe, test, assert } from 'vitest';
import FetchBusinesses from './app/globalfunctions/FetchBusinesses';

// Mocking the fetch function for testing
globalThis.fetch = async () => ({
  json: async () => ({ success: 'mocked data' }),
});

describe('test FetchBusinesses function', async () => {
  test('fetches data successfully and updates state', async () => {
    const mockStateFunction = (data) => {
      // Perform assertions on the data passed to the state function
      assert.equal(data, 'mocked data');
    };

    await FetchBusinesses('mocked-uid', mockStateFunction);
  });

  test('handles errors and does not update state', async () => {
    // Mocking the fetch function to simulate a network error
    globalThis.fetch = async () => {
      throw new Error('Network error');
    };

    const mockStateFunction = (data) => {
      // This function should not be called in case of an error
      assert.fail('State function should not be called on error');
    };

    // Using try/catch to check if FetchBusinesses correctly handles the error
    try {
      await FetchBusinesses('mocked-uid', mockStateFunction);
    } catch (error) {
      assert.equal(error.message, 'Network error');
    }

    // Restore the original fetch function
    globalThis.fetch = async () => ({ json: async () => ({ success: 'mocked data' }) });
  });
});