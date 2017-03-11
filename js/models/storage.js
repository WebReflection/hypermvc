
const name = 'todos-hyperHTML';

export default {
	get: () => JSON.parse(localStorage.getItem(name) || '[]'),
	set: value => localStorage.setItem(name, JSON.stringify(value))
};
