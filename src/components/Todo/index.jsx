import React, { useState } from "react";
import { check, cross, moon, sun } from "../../assets";
import "./Todo.css";

function Todo() {
	const [todos, setTodos] = useState([]);
	const [current, setCurrent] = useState("");
	const [active, setActive] = useState([]);
	const [completed, setCompleted] = useState([]);
	const [toggle, setToggle] = useState({ clicked: false });
	const [checked, setChecked] = useState({ check: false });

	//input function for list items
	const handleChange = (e) => {
		e.preventDefault();
		setCurrent(e.target.value);
	};

	//submit function for list item
	const handleSubmit = (e) => {
		e.preventDefault();
		setActive(todos);
		setTodos([...todos, current]);
		setActive([...active, current]);
		setCurrent("");

		console.log(todos);
	};

	//delete function for list items
	const handleDelete = (itemIndex) => {
		const items = todos.filter((c, index) => c[index] !== itemIndex);
		setTodos(items);
		setActive(items);
		console.log(todos);
	};

	//this function controls completed list items (STILL VERY SHAKY)
	const handleComplete = (itemIndex) => {
		const item = todos.filter((c, index) => c[index] == itemIndex);
		const newItem = item[0];

		const items = todos.filter((c, index) => c[index] !== itemIndex);

		setCompleted([...completed, newItem]);
		setActive(items);
		handleChecked();

		console.log(active);
		console.log(completed);
	};

	// All the togglers
	const handleToggle = () => {
		setToggle({ clicked: !toggle.clicked });
	};

	const handleChecked = () => {
		setChecked({ check: !checked.check });
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
						<input className="input" type="text" value={current} placeholder="Create a new todo..." onChange={handleChange} />
					</form>

					<div className={toggle.clicked ? "todo-list-dark" : "todo-list-light"}>
						{todos.map((todo, index) => (
							<div key={index}>
								<div className={toggle.clicked ? "todo-list-item-dark" : "todo-list-item-light"}>
									<div>
										{checked.check ? (
											<div className="circle circle-checked hover" onClick={() => handleComplete(todo[index])}>
												<img className="check-light" src={check} alt="check" />
											</div>
										) : (
											<div className="circle hover" onClick={() => handleComplete(todo[index])}></div>
										)}
										<p className={checked.check ? "line-through hover" : "hover"} onClick={() => handleComplete(todo[index])}>
											{todo}
										</p>
									</div>

									<img className="cross hover" src={cross} alt="cross" onClick={() => handleDelete(todo[index])} />
								</div>
							</div>
						))}
						<div className="todo-list-bottom">
							<p> {} items left </p>
							<div className="all-active-completed-desktop">
								<p className="hover"> All </p>
								<p className="hover"> Active </p>
								<span className="hover"> Completed </span>
							</div>
							<p className="hover"> Clear Completed </p>
						</div>
					</div>

					<div className={`all-active-completed-mobile ${toggle.clicked ? "dark-mode" : "light-mode"}`}>
						<p className="hover"> All </p>
						<p className="hover"> Active </p>
						<p className="hover"> Completed </p>
					</div>
				</section>
			</main>
		</>
	);
}

export { Todo };
