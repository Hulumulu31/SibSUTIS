import React from 'react';
import '../assets/index.css';

const DataSet = ({ headers, data, selectedRows, onRowClick }) => {
    const tableHeaders = headers || (data.length > 0 ? Object.keys(data[0]).map(key => ({ key, title: key })) : []);

    if (!Array.isArray(data)) {
        return <div>Ошибка: Данные не загружены.</div>;
    }

    return (
        <table className="dataset-table">
            <thead>
                <tr>
                    <th className="empty-column"></th>
                    {tableHeaders.map((header) => (
                        <th key={header.key}>
                            {header.title}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item, rowIndex) => (
                    <tr
                        key={rowIndex}
                        onClick={(e) => onRowClick(rowIndex, e)}
                        className={selectedRows.includes(rowIndex) ? "selected-row" : ""}
                    >
                        <td className="empty-column"></td>
                        {tableHeaders.map((header) => (
                            <td key={header.key}>
                                {item[header.key]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DataSet;
