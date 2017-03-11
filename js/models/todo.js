
let counter = 0;

export default title => ({
	title,
	id: counter++,
	completed: false
});
