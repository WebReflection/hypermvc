
import controller from '../controllers/todo';

const selected = (hash, curr) => hash === curr ? 'selected' : '';

export default (render, todos) => {

	const all = controller.todosSize();
	const left = controller.todosLeft();
	const hash = controller.hash();

	return render`
	<footer class="footer" style="${all ? '' : 'display:none'}">
		<span class="todo-count">
			<strong> ${left} </strong> item${~-left ? 's' : ''} left
		</span>
		<ul class="filters">
			<li><a class="${selected(hash, 'all')}" href="#/">All</a></li>
			<li><a class="${selected(hash, 'active')}" href="#/active">Active</a></li>
			<li><a class="${selected(hash, 'completed')}" href="#/completed">Completed</a></li>
		</ul>
		<button
			class="clear-completed"
			onclick="${controller.clear}"
			style="${left < all ? '' : 'display:none'}"
		>Clear completed</button>
	</footer>`;
};
