// calcStatsFromAPI.test.js
const { calcStatsFromAPI } = require('./calcStatsFromAPI');
const { calcStats } = require('./calcStats');

// Мокаем модуль loadData
jest.mock('./loadData', () => ({
  loadData: jest.fn(() =>
    Promise.resolve([
      {
        breed: 'Turkish Van',
        country: 'developed in the United Kingdom (founding stock from Turkey)',
        origin: 'Natural',
        coat: 'Semi-long',
        pattern: 'Van',
      },
      {
        breed: 'York Chocolate',
        country: 'United States (New York)',
        origin: 'Natural',
        coat: 'Long',
        pattern: 'Solid',
      },
    ])
  ),
}));

test('calcStatsFromAPI works correctly with mocked loadData', async () => {
  // Вызываем функцию
  const result = await calcStatsFromAPI();

  // Проверяем результат
  expect(result).toEqual({
    'developed in the United Kingdom (founding stock from Turkey)': 1,
    'United States (New York)': 1,
  });
});

test('calcStats works correctly', () => {
  const mockData = [
    {
      breed: 'Turkish Van',
      country: 'developed in the United Kingdom (founding stock from Turkey)',
      origin: 'Natural',
      coat: 'Semi-long',
      pattern: 'Van',
    },
    {
      breed: 'York Chocolate',
      country: 'United States (New York)',
      origin: 'Natural',
      coat: 'Long',
      pattern: 'Solid',
    },
    {
      breed: 'Another Cat',
      country: 'United States (New York)',
      origin: 'Natural',
      coat: 'Short',
      pattern: 'Tabby',
    },
  ];

  const result = calcStats(mockData);

  expect(result).toEqual({
    'developed in the United Kingdom (founding stock from Turkey)': 1,
    'United States (New York)': 2,
  });
});