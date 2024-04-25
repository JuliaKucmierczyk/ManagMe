const StoriesView = () => {
  return (
    <div className="stories-container">
      <h1>Stories</h1>
      <div className="kanban-board">
        <div className="kanban-column">
          <h2>Todo</h2>
          <ul></ul>
        </div>
        <div className="kanban-column">
          <h2>Doing</h2>
          <ul></ul>
        </div>
        <div className="kanban-column">
          <h2>Done</h2>
          <ul></ul>
        </div>
      </div>
    </div>
  );
};

export default StoriesView;
