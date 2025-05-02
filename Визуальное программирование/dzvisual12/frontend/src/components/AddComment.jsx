import React from "react";
import '../assets/index.css'

const AddComment  = ({onAddComment}) => {
    const [newComment, setNewComment] = React.useState({postId: "", name: "", email: "", body: ""});
    const [showForm, setShowForm] = React.useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewComment((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = () => {
        onAddComment(newComment);
        setShowForm(false);
        setNewComment({postId: "", name: "", email: "", body: ""});
    };

    return (
        <div>
            <button onClick={() => setShowForm(!showForm)} className="add-button">Добавить</button>
            {showForm && (
                <div className="form-container">
                    <input type="text" name="postId" placeholder="Post ID" value={newComment.postId} onChange={handleChange} />
                    <input type="text" name="name" placeholder="Имя" value={newComment.name} onChange={handleChange} />
                    <input type="email" name="email" placeholder="Email" value={newComment.email} onChange={handleChange} />
                    <textarea name="body" placeholder="Комментарий" value={newComment.body} onChange={handleChange}></textarea>
                    <button onClick={handleSubmit}>Добавить</button>
                </div>
            )}
        </div>
    );
};

export default AddComment;
