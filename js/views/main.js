import hyperHTML from '../lib/hyperhtml';
import controller from '../controllers/todo';

export default (render, todos) => render`
	<section class="main" style="${todos.length ? '' : 'display:none'}">
		<input
			class="toggle-all"
			type="checkbox"
			onclick="${controller.toggleAll}"
			checked="${todos.every(todo => todo.completed)}">
		<label for="toggle-all">Mark all as complete</label>
		<ul class="todo-list">${todos.map((todo, i) => hyperHTML.wire(todo)`
			<li
				data-index="${i}"
				class="${todo.completed ? 'completed' : ''}"
			>
				<div class="view">
					<input
						class="toggle"
						type="checkbox"
						checked="${todo.completed}"
						onclick="${controller.complete}">
					<label ondblclick="${dblclick2Edit}">
						${todo.title}
					</label>
					<button class="destroy" onclick="${controller.destroy}"></button>
				</div>
				<input
					class="edit"
					value="${todo.title}"
					onblur="${blur2Save}"
					onkeypress="${controller.edit}"
					onkeydown="${function escape2Reset(event) {
						if (event.keyCode === controller.ESC_KEY) {
							this.value = todo.title;
							this.blur();
						}
					}}">
			</li>
	`)}</ul>
	</section>`;

function dblclick2Edit() {
	const li = this.closest('li');
	li.classList.add('editing');
	li.querySelector('.edit').focus();
}

function blur2Save(event) {
	this.closest('li').classList.remove('edit');
	controller.edit(event);
}
