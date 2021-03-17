import React, { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
import { moon, sun } from "../../assets";
import { ActiveTasks } from "../ActiveTasks";
import { AllTasks } from "../AllTasks";
import { CompletedTasks } from "../CompletedTasks";
import "./Todo.css";

function Todo() {
	const [todos, setTodos] = useState([{ id: 1, text: "Try this app", done: false }]);
	const [text, setText] = useState("");
	const [done, setDone] = useState(false);
	const [toggle, setToggle] = useState({ clicked: false });
	const [onLoad, setOnLoad] = useState(false);
	const [targetOption, setTargetOption] = useState("");

	//submit function for list item
	const handleSubmit = (e) => {
		e.preventDefault();

		if (!text) {
			alert("Please add task");
			return;
		}
		addItem({ text, done });
		setText("");
		setDone(false);
	};

	//add item to todo list
	const addItem = (item) => {
		const id = Math.floor(Math.random() * 10000) + 1;
		const newTodo = { id, ...item };
		setTodos([...todos, newTodo]);
	};

	//delete item from todo list
	const handleDelete = (id) => {
		setTodos(todos.filter((item) => item.id !== id));

		console.log(todos);
	};

	const handleComplete = (id) => {
		//check done items on todo list
		setTodos(todos.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
	};

	const activeItems = todos.filter((todo) => todo.done === false);

	//to deleted completed items
	const clearCompleted = () => {
		setTodos(todos.filter((todo) => todo.done === false));
	};

	// All the togglers
	const handleToggle = () => {
		setToggle({ clicked: !toggle.clicked });
	};

	const handleView = (e) => {
		e.preventDefault();
		setTargetOption(e.target.id);
		display();
		setOnLoad(true);
	};

	const display = () => {
		switch (targetOption) {
			case "one":
				return <AllTasks todos={todos} toggle={toggle} handleDelete={handleDelete} handleComplete={handleComplete} />;

			case "two":
				return <ActiveTasks todos={todos} toggle={toggle} />;

			case "three":
				return <CompletedTasks todos={todos} toggle={toggle} />;

			default:
		}
	};

	return (
		<>
			<main className={toggle.clicked ? "main-dark" : "main-light"}>
				<section className={toggle.clicked ? "header-dark" : "header-light"}></section>

				<section className="todo-container">
					<div className="todo-header">
						<h1> TODO </h1>
						<div onClick={handleToggle}>
							{toggle.clicked ? (
								<img className="icons hover" src={sun} alt="moon icon" />
							) : (
								<img className="icons hover" src={moon} alt="moon icon" />
							)}
						</div>
					</div>

					<form className={toggle.clicked ? "input-div-dark" : "input-div-light"} onSubmit={handleSubmit}>
						<div className="circle"></div>
						<input className="input" type="text" value={text} placeholder="Add a new todo..." onChange={(e) => setText(e.target.value)} />
					</form>

					<div className={toggle.clicked ? "todo-list-dark" : "todo-list-light"}>
						{!onLoad ? <AllTasks todos={todos} toggle={toggle} handleDelete={handleDelete} handleComplete={handleComplete} /> : display(targetOption)}

						<div className="todo-list-bottom">
							<p> {activeItems.length} items left </p>
							<div className="all-active-completed-desktop">
								<p id="one" className={`hover ${targetOption === "one" ? "todo-list-bottom-clicked" : ""}`} onClick={handleView}>
									All
								</p>
								<p id="two" className={`hover ${targetOption === "two" ? "todo-list-bottom-clicked" : ""}`} onClick={handleView}>
									Active
								</p>
								<span id="three" className={`hover ${targetOption === "three" ? "todo-list-bottom-clicked" : ""}`} onClick={handleView}>
									Completed
								</span>
							</div>
							<p className="hover" onClick={clearCompleted}>
								Clear Completed
							</p>
						</div>
					</div>

					<div className={`all-active-completed-mobile ${toggle.clicked ? "dark-mode" : "light-mode"}`}>
						<p id="one" className="hover" onClick={handleView}>
							All
						</p>
						<p id="two" className="hover" onClick={handleView}>
							Active
						</p>
						<p id="three" className="hover" onClick={handleView}>
							Completed
						</p>
					</div>
				</section>
			</main>
		</>
	);
}

export { Todo };
