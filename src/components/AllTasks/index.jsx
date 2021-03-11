import React from "react";
import { check, cross } from "../../assets";

function AllTasks({ todos, toggle, handleComplete, handleDelete }) {
	return (
		<>
			{todos.map((todo) => (
				<div key={todo.id}>
					<div className={toggle.clicked ? "todo-list-item-dark" : "todo-list-item-light"}>
						<div>
							{todo.done ? (
								<div className="circle circle-checked hover" onClick={() => handleComplete(todo.id)}>
									<img className="check-light" src={check} alt="check" />
								</div>
							) : (
								<div className="circle hover" onClick={() => handleComplete(todo.id)}></div>
							)}
							<p className={todo.done ? "line-through hover" : "hover"} onClick={() => handleComplete(todo.id)}>
								{todo.text}
							</p>
						</div>

						<img className="cross hover" src={cross} alt="cross" onClick={() => handleDelete(todo.id)} />
					</div>
				</div>
			))}
		</>
	);
}

export { AllTasks };
