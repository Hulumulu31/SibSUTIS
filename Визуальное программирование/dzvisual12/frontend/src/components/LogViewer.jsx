import React, { useEffect, useState } from 'react';

const LogViewer = () => {
    const [logs, setLogs] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        fetch('http://localhost:5185/logs')
            .then(response => response.json())
            .then(data => setLogs(data))
            .catch(error => console.error('Ошибка загрузки логов:', error));
    }, []);

    const filteredLogs = logs.filter(log =>
        log.message.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
            <input 
                type="text" 
                placeholder="Поиск по сообщению" 
                value={filter}
                onChange={(e) => setFilter(e.target.value)} 
            />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Сообщение</th>
                        <th>Уровень</th>
                        <th>Дата</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredLogs.map(log => (
                        <tr key={log.id}>
                            <td>{log.id}</td>
                            <td>{log.message}</td>
                            <td>{log.logLevel}</td>
                            <td>{log.timestamp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LogViewer;
