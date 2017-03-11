import hyperHTML from './lib/hyperhtml';
import controller from './controllers/todo';
import storage from './models/storage';
import updateHeader from './views/header';
import updateMain from './views/main';
import updateFooter from './views/footer';

const appRender = hyperHTML.bind(document.querySelector('.todoapp'));

const header = hyperHTML.wire();
const main = hyperHTML.wire();
const footer = hyperHTML.wire();

controller.init(storage, todos => {
	appRender`${[
		updateHeader(header, todos),
		updateMain(main, todos),
		updateFooter(footer, todos)
	]}`;
});

controller.update();
