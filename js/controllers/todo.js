
import Todo from '../models/todo';

const controller = {

	ENTER_KEY: 13,
	ESC_KEY: 27,

	init(storage, update) {

		this.items = storage.get();

		this.update = () => {
			const hash = controller.hash();
			let todos = this.items;
			if (hash !== 'all') {
				todos = todos.filter(
					hash === 'active' ?
						todo => !todo.completed :
						todo => todo.completed
					);
			}
			update(todos);
			storage.set(this.items);
		};

		window.onhashchange = this.update;
	},

	// controller actions invoked through the DOM

	clear: () => {
		controller.items = controller.items.filter(todo => !todo.completed);
		controller.update();
	},

	complete: event => {
		const index = event.target.closest('li').dataset.index;
		const todo = controller.items[index];
		todo.completed = !todo.completed;
		controller.update();
	},

	create: event => {
		const target = event.target;
		const value = target.value.trim();
		if (event.keyCode === controller.ENTER_KEY && value.length) {
			controller.items.push(Todo(value));
			target.value = '';
			controller.update();
		}
	},

	destroy: event => {
		const index = event.target.closest('li').dataset.index;
		controller.items.splice(index, 1);
		controller.update();
	},

	edit: event => {
		if (event.type === 'blur' || event.keyCode === controller.ENTER_KEY) {
			const value = event.target.value.trim();
			if (value.length) {
				const index = event.target.closest('li').dataset.index;
				controller.items[index].title = value;
				controller.update();
			} else {
				if (event.type === 'blur') {
					controller.destroy(event);
				} else {
					event.target.blur();
				}
			}
		}
	},

	hash: () => {
		const str = location.hash.slice(2);
		return str !== 'completed' && str !== 'active' ? 'all' : str;
	},

	todosLeft: () => controller.items.filter(todo => !todo.completed).length,

	todosSize: () => controller.items.length,

	toggleAll: (event) => {
		controller.items.forEach(todo => {
			todo.completed = event.target.checked;
		});
		controller.update();
	}
};

export default controller;
