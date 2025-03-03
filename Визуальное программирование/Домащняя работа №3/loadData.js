// loadData.js
async function loadData(url = "https://catfact.ninja/breeds", allData = []) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Добавляем данные текущей страницы
    allData = allData.concat(data.data);

    // Если есть следующая страница, загружаем её
    if (data.next_page_url) {
      return loadData(data.next_page_url, allData);
    }

    return allData;
  } catch (error) {
    console.error("Error loading data:", error);
    throw error;
  }
}

module.exports = { loadData };