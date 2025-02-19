// orderBy.test.js

const orderBy = require('./orderBy');

describe('Тестирование функции orderBy', () => {
    test('Корректная сортировка по нескольким свойствам', () => {
        const data = [
            { name: "Alice", age: 30 },
            { name: "Bob", age: 25 },
            { name: "Alice", age: 20 },
            { name: "Charlie", age: 35 }
        ];
        const properties = ["name", "age"];
        const result = orderBy(data, properties);
        expect(result).toEqual([
            { name: "Alice", age: 20 },
            { name: "Alice", age: 30 },
            { name: "Bob", age: 25 },
            { name: "Charlie", age: 35 }
        ]);
    });

    test('Исходный массив не изменяется', () => {
        const data = [
            { name: "Alice", age: 30 },
            { name: "Bob", age: 25 }
        ];
        const properties = ["name"];
        const originalData = [...data];
        orderBy(data, properties);
        expect(data).toEqual(originalData);
    });

    test('Выброс исключения при передаче не массива объектов', () => {
        const invalidData = [1, 2, 3];
        const properties = ["name"];
        expect(() => orderBy(invalidData, properties)).toThrow(TypeError);
    });

    test('Выброс исключения при отсутствии свойства в объектах', () => {
        const data = [
            { name: "Alice", age: 30 },
            { name: "Bob" } // Отсутствует свойство "age"
        ];
        const properties = ["age"];
        expect(() => orderBy(data, properties)).toThrow(Error);
    });

    test('Выброс исключения при некорректном втором аргументе', () => {
        const data = [{ name: "Alice", age: 30 }];
        const invalidProperties = "name"; // Не массив
        expect(() => orderBy(data, invalidProperties)).toThrow(TypeError);
    });
});