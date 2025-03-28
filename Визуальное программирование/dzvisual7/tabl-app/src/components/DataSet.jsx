import React, { useState } from 'react';

const DataSet = ({ headers = [], data = [], renderHeader, renderRow }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);  // Храним массив выбранных ячеек

  const handleRowClick = (index, event) => {
    const isCtrlPressed = event.ctrlKey;
    const isLeftCellClicked = event.target.cellIndex === 0;  // Проверяем, была ли кликнута первая ячейка

    if (isLeftCellClicked && !isCtrlPressed) {
      // Если нажата левая ячейка без Ctrl, выделяем только эту строку
      const alreadySelected = selectedRows.includes(index);
      if (!alreadySelected) {
        setSelectedRows([index]); // Выделяем только текущую строку
      } else {
        setSelectedRows([]); // Снимаем выделение строки, если она уже была выделена
      }
      setSelectedCells([]);  // Убираем выделение ячеек
    } else {
      // Если зажат Ctrl, выделяем/снимаем выделение с ячеек
      const cellIdentifier = `${index}-${event.target.cellIndex}`;

      if (isCtrlPressed) {
        // Если Ctrl зажат, переключаем выделение ячейки
        if (selectedCells.includes(cellIdentifier)) {
          setSelectedCells(selectedCells.filter(cell => cell !== cellIdentifier));  // Снимаем выделение
        } else {
          setSelectedCells([...selectedCells, cellIdentifier]);  // Выделяем ячейку
        }
      } else {
        // Без Ctrl только одна ячейка может быть выделена
        setSelectedCells([cellIdentifier]);  // Выделяем только одну ячейку
        setSelectedRows([]);  // Убираем выделение всей строки
      }
    }
  };

  const isRowSelected = (index) => selectedRows.includes(index);
  const isCellSelected = (rowIndex, cellIndex) => selectedCells.includes(`${rowIndex}-${cellIndex}`);

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header, idx) => (
            <th key={idx}>{renderHeader ? renderHeader(header) : header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr
            key={index}
            onClick={(e) => handleRowClick(index, e)}
            style={{ backgroundColor: isRowSelected(index) ? '#cce5ff' : 'transparent' }}
          >
            {Object.values(row).map((value, i) => (
              <td
                key={i}
                style={{
                  backgroundColor: isCellSelected(index, i) ? '#b3d9ff' : 'transparent',
                }}
              >
                {renderRow ? renderRow(value) : value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataSet;
