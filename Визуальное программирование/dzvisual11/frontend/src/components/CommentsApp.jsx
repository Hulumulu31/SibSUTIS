import React from "react";
import DataSet from "./DataSet";
import AddComment from "./AddComment";
import DeleteComment from "./DeleteComment";
import EditComment from "./EditComment";

const url = "http://localhost:5185/comments";

const CommentsApp = () => {
    const [comments, setComments] = React.useState([]);
    const [selectedRows, setSelectedRow] = React.useState([]);
    const [optimisticComments, addOptimisticComments] = React.useOptimistic(
        comments, 
        (currentState, newItem) => [newItem, ...currentState] 
    );
    
    const headers = [
        { key: "postId", title: "Post ID" },
        { key: "id", title: "ID" },
        { key: "name", title: "Name" },
        { key: "email", title: "Email" },
        { key: "body", title: "Body" },
      ];

    
    const HandleRowClick = (index, e) => {
        if (e.target.className === "empty-column") {
            if (e.ctrlKey) {
                setSelectedRow((prev) => 
                    prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
                );
            } else {
                setSelectedRow((prev) => (prev.includes(index) ? [] : [index]));
            }
        }
    };


    React.useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => setComments(data))
            .catch((error) => console.error("ошибка загрузки данных: ", error));
    }, []);


    const handleAddComment = async (newComment) => {
        const maxId = Math.max(0, ...comments.map((comment) => comment.id));
        const newId = maxId + 1;

        const optimisticComment = {...newComment, id: newId};
        addOptimisticComments(optimisticComment);
        setComments((prev) => [...prev, optimisticComment]);

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(optimisticComment),
            });

            if (!response.ok) {
                throw new Error("ошибка добавления комментария");
            }
        } catch(error) {
            console.error(error.message);

            setComments((prev) => prev.filter((c) => c.id !== newId));
        }
    };


    const handleDeleteComments = async () => {
        const selectedIds = selectedRows.map((index) => optimisticComments[index].id);
        //исключаем те индексы которые находятся в массиве selectedRows
        const updatedComments = optimisticComments.filter((_, index) => !selectedRows.includes(index));

        addOptimisticComments(updatedComments);

        try {
            for (const id of selectedIds) {
                const response = await fetch(`${url}/${id}`, {
                    method: "DELETE",
                });

                if (!response.ok) {
                    throw new Error("ошибка удаления комментариев");
                }
            }
            setComments((prev) => prev.filter((_, index) => !selectedRows.includes(index)));
        } catch(error) {
            console.error(error.message);
            setComments((prev) => optimisticComments);
        } finally {
            setSelectedRow([]);
        }
    };


    const handleSaveEdit = async (updatedComment) => {
        const optimisticUpdate = optimisticComments.map((comment) => 
            comment.id === updatedComment.id ? updatedComment : comment    
        );
        addOptimisticComments(optimisticUpdate);

        try {
            const response = await fetch(`${url}/${updatedComment.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedComment),
            });
            
            if (!response.ok) {
                throw new Error("ошибка обновления комментария при редактировании");
            }

            setComments((prev) => 
                prev.map((comment) => (comment.id === updatedComment.id ? updatedComment : comment))
            );
        } catch(error) {
            console.log(error.message);
            setComments((prev) => optimisticComments);
        }
    };


    return (
        <div className="comments-app">
            <AddComment onAddComment={handleAddComment}/>
            <EditComment
                optimisticComments={optimisticComments}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRow}
                onSave={handleSaveEdit}
            />
            <DeleteComment onDeleteComment={handleDeleteComments}/>
            <DataSet 
                headers={headers} 
                data={optimisticComments}
                selectedRows={selectedRows}
                onRowClick={HandleRowClick}
            />
        </div>
    );
};

export default CommentsApp;