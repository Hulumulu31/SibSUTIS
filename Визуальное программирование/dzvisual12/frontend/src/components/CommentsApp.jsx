import React from "react";
import DataSet from "./DataSet";
import AddComment from "./AddComment";
import DeleteComment from "./DeleteComment";
import EditComment from "./EditComment";

const url = "http://localhost:5185/comments";

const CommentsApp = () => {
    const [comments, setComments] = React.useState([]);
    const [selectedRows, setSelectedRow] = React.useState([]);

    const headers = [
        { key: "postId", title: "Post ID" },
        { key: "id", title: "ID" },
        { key: "name", title: "Name" },
        { key: "email", title: "Email" },
        { key: "body", title: "Body" },
    ];

    const handleRowClick = (index, e) => {
        if (e.ctrlKey) {
            setSelectedRow((prevSelected) =>
                prevSelected.includes(index)
                    ? prevSelected.filter((i) => i !== index)
                    : [...prevSelected, index]
            );
        } else {
            setSelectedRow([index]);
        }
    };

    const handleDeleteComments = async () => {
        const selectedIds = selectedRows.map((index) => comments[index].id);
        const updatedComments = comments.filter((_, index) => !selectedRows.includes(index));

        setComments(updatedComments);

        try {
            for (const id of selectedIds) {
                const response = await fetch(`${url}/${id}`, {
                    method: "DELETE",
                });

                if (!response.ok) {
                    throw new Error("ошибка удаления комментариев");
                }
            }
        } catch (error) {
            console.error(error.message);
            setComments(comments); // Восстанавливаем данные, если ошибка
        } finally {
            setSelectedRow([]);
        }
    };

    React.useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => setComments(Array.isArray(data) ? data : []))
            .catch((error) => console.error("ошибка загрузки данных: ", error));
    }, []);

    const handleAddComment = async (newComment) => {
        const maxId = Math.max(0, ...comments.map((comment) => comment.id));
        const newId = maxId + 1;

        const optimisticComment = { ...newComment, id: newId };
        setComments((prev) => {
            return Array.isArray(prev) ? [...prev, optimisticComment] : [optimisticComment];
        });

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(optimisticComment),
            });

            if (!response.ok) {
                throw new Error("ошибка добавления комментария");
            }

            const updatedComments = await response.json();
            setComments(Array.isArray(updatedComments) ? updatedComments : []);
        } catch (error) {
            console.error(error.message);
            setComments((prev) => prev.filter((c) => c.id !== newId));
        }
    };

    return (
        <div className="comments-app">
            <AddComment onAddComment={handleAddComment} />
            <EditComment />
            <DeleteComment onDeleteComment={handleDeleteComments} />
            <DataSet
                headers={headers}
                data={comments}
                selectedRows={selectedRows}
                onRowClick={handleRowClick}
            />
        </div>
    );
};

export default CommentsApp;
