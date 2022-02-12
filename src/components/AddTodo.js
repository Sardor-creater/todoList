const AddTodo = ({hAdd}) => {
    const handleOnSubmit = (e) => {
        e.preventDefault();
        hAdd(e.target.title.value);
        e.target.title.value = '';
    }

    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <input placeholder="title" name='title' />
                <button className='btn btn-success' onSubmit={handleOnSubmit}>Add todo</button>
            </form>
addtodo
        </div>
       
    );
  };
  
  export default AddTodo;