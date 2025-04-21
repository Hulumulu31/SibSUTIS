import React from "react";
import '../assets/index.css'

const EditComment = ({optimisticComments, selectedRows, setSelectedRows, onSave}) => {
    const [editedComment, setEditedComment] = React.useState(null);
    const [showForm, setShowForm] = React.useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedComment((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditClick = () => {
        if (selectedRows.length !== 1) {
            alert("Выбрете только одну строку для редактирования");
            return;
        }
        
        const selectedIndex = selectedRows[0];
        const commentToEdit = optimisticComments[selectedIndex];
        setEditedComment(commentToEdit);
        setShowForm(true);
    };
  
    const handleSubmit = () => {
        onSave(editedComment);
        setShowForm(false);
        setEditedComment(null);
    };

    return (
        <div>
            <button onClick={handleEditClick} className="edit-button">Реадктировать</button>

            {showForm && editedComment && (
                <div className="form-container">
                    <input type="text" name="postId" placeholder="Post ID" value={editedComment.postId} onChange={handleChange}/>
                    <input type="text" name="name" placeholder="Имя" value={editedComment.name} onChange={handleChange}/>
                    <input type="email" name="email" placeholder="Email" value={editedComment.email} onChange={handleChange}/>
                    <textarea name="body" placeholder="Комментарий" value={editedComment.body} onChange={handleChange}></textarea>
                    <div className="form-actions">
                        <button onClick={handleSubmit}>Сохранить</button>
                        <button onClick={() => setShowForm(false)}>Отмена</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditComment;