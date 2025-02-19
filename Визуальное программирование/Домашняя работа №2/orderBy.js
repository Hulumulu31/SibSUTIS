// orderBy.js

/**
 * Функция для сортировки массива объектов по указанным свойствам.
 * @param {Array} array - Массив объектов для сортировки.
 * @param {Array} properties - Массив строк, представляющих свойства для сортировки.
 * @returns {Array} - Отсортированная копия исходного массива.
 */
function orderBy(array, properties) {
    // Проверка, что первый аргумент является массивом
    if (!Array.isArray(array)) {
        throw new TypeError("Первый аргумент должен быть массивом.");
    }

    if (!array.every(item => typeof item === "object" && item !== null)) {
        throw new TypeError("Все элементы массива должны быть объектами.");
    }

    if (!Array.isArray(properties) || !properties.every(prop => typeof prop === "string")) {
        throw new TypeError("Второй аргумент должен быть массивом строк.");
    }

    const sortedArray = [...array];

    sortedArray.sort((a, b) => {
        for (const prop of properties) {
            // Проверка наличия свойства в обоих объектах
            if (!(prop in a) || !(prop in b)) {
                throw new Error(`Свойство "${prop}" отсутствует в одном из объектов.`);
            }

            // Сравнение значений свойств
            if (a[prop] < b[prop]) return -1;
            if (a[prop] > b[prop]) return 1;
        }
        return 0;
    });

    return sortedArray;
}

module.exports = orderBy;