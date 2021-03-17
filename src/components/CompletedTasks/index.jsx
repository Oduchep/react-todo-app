import React from "react";
import { check, cross } from "../../assets";

function CompletedTasks({ todos, toggle }) {
	const completedTodos = todos.filter((todo) => todo.done === true);
	return (
		<>
			{completedTodos.map((todo) => (
				<div key={todo.id}>
					<div className={toggle.clicked ? "todo-list-item-dark" : "todo-list-item-light"}>
						<div>
							{todo.done ? (
								<div className="circle circle-checked">
									<img className="check-light" src={check} alt="check" />
								</div>
							) : (
								<div className="circle"></div>
							)}
							<p className={todo.done ? "line-through hover" : "hover"}>{todo.text}</p>
						</div>

						<img className="cross hover" src={cross} alt="cross" />
					</div>
				</div>
			))}
		</>
	);
}

export { CompletedTasks };
