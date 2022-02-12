import { useState } from "react";

const Todo = ({ id, title, completed, onDelete, onUpdate, onUpdateTodo, todoEditing, onSubmitEdit }) => {
  const [editingText, setEditingText] = useState("");
  const handleDelete = () =>{
    onDelete(id);
  }
  const handleUpdate = () =>{
    onUpdate(id);
  }
  const handleSubmitEdit = () =>{
    if (!editingText) {
      onSubmitEdit(id, title, completed);
    } else{
      onSubmitEdit(id, editingText, completed);
    }
  }
  const handleChange = () =>{
    onUpdateTodo(id);
  }

    return (
        <div className={`alert row ${completed? 'alert-success': 'alert-danger' } `}   role="alert">
          <div className='col-md-8 col-lg-9'>
          <input type='text' className='form-control' onChange={(e) => setEditingText(e.target.value)} aria-label="Disabled input example" defaultValue={title}  disabled={todoEditing === id ? null: 'disabled' } />
          </div>
          <div className='col-md-4 col-lg-3'>
            <div className='row'>
              <div className='col'>
              <input
          className='form-check-input'
            type="checkbox"
            defaultChecked={completed}
            onChange={handleChange}
          />
              </div>

              <div className='col'>
              {id === todoEditing ? (
            <button className='btn btn-success' onClick={handleSubmitEdit}>edit</button>
          ) : (
            <button className='btn btn-warning' onClick={handleUpdate}>edit</button>
          )}
              </div>
              <div className='col'>
              <button className='btn btn-danger' onClick={handleDelete} >delete</button>
              </div>
            </div>  
          </div>
          
        </div>
     
    );
  };
  
  export default Todo;