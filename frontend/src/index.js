import ArticlesContainer from './containers/articles';
import MessagesContainer from './containers/messages';
import CreateButton from './components/createButton';
import FormComponent from './components/form/form';
import ChangeForm from './components/form/changeForm';
import Store from './store';
import './webSocket';

export const themesVillage = [
    'city',
    'people',
    'business',
    'weekend',
    'children',
];

const themesSnob = [
    'theme/257/',
    'theme/161/',
    'theme/904/',
    'tag/52837/',
    'tag/1768/',
    'theme/545/',
    'theme/214/',
    'theme/154/',
    'theme/164/',
];

const store = Store.getInstance();

const renderForm = (message, ) => {
    const Form = new FormComponent(message,);
    document.body.appendChild(Form.render(0, 0,),);
};

const renderChangeForm = (message, ) => {
    const Form = new ChangeForm(message,);
    document.body.appendChild(Form.render(0, 0,),);
};

const getAllMessages = async () => {
    const res = await fetch('http://localhost:3000/api/messages/all',);
    const messages = await res.json();
    const todoMessages = messages.filter((message, ) => message.status === '0',);
    const doneMessages = messages.filter((message, ) => message.status === '1',);

    const Messages = new MessagesContainer();
    const todoColumn = Messages.createColumn('To do', todoMessages, (message, ) => renderChangeForm(message,),);
    const doneColumn = Messages.createColumn('Done', doneMessages,);

    const Articles = new ArticlesContainer();
    const articleColumn = Articles.createColumn('Village', (message, ) => renderForm(message,),);
    const articleColumnKnife = Articles.createColumn('Knife', (message, ) => renderForm(message,),);
    const articleColumnVC = Articles.createColumn('VC', (message, ) => renderForm(message,),);
    const articleColumnSnob = Articles.createColumn('Snob', (message, ) => renderForm(message,),);
    const articleColumnNakedScience = Articles.createColumn('NakedScience', (message, ) => renderForm(message,),);

    const Button = new CreateButton();
    Button.setHandlerClick(() => renderForm({},),);
    Button.render();

    Messages.render();
    store.addColumn('0', todoColumn,);
    store.addColumn('1', doneColumn,);
    Messages.addColumn(todoColumn,);
    Messages.addColumn(doneColumn,);
    Messages.addColumn(articleColumn,);
    Messages.addColumn(articleColumnKnife,);
    Messages.addColumn(articleColumnVC,);
    Messages.addColumn(articleColumnSnob,);
    Messages.addColumn(articleColumnNakedScience,);

    loadVillage(Articles,);
    loadKnife(Articles,);
    loadVC(Articles,);
    loadSnob(Articles,);
    loadNakedScience(Articles,);
};

const loadVillage = (articlesContainer, ) => {
    themesVillage.forEach(async (theme, ) => {
        const result = await fetch(`http://localhost:3000/api/village/articles?theme=${theme}`,);
        const articles = await result.json();
        articlesContainer.render(new Map(articles,), 'Village',);
    },);
};

const loadSnob = (articlesContainer, ) => {
    themesSnob.forEach(async (theme, ) => {
        const result = await fetch(`http://localhost:3000/api/snob/articles?params=${theme}`,);
        const articles = await result.json();
        articlesContainer.render(new Map(articles,), 'Snob',);
    },);
};

const loadKnife = async (articlesContainer, ) => {
    const result = await fetch('http://localhost:3000/api/knife/articles',);
    const articles = await result.json();
    articlesContainer.render(new Map(articles,), 'Knife',);
};

const loadVC = async (articlesContainer, ) => {
    const result = await fetch('http://localhost:3000/api/vc/articles',);
    const articles = await result.json();
    articlesContainer.render(new Map(articles,), 'VC',);
};

const loadNakedScience = async (articlesContainer, ) => {
    const result = await fetch('http://localhost:3000/api/nakedScience/articles',);
    const articles = await result.json();
    articlesContainer.render(new Map(articles,), 'NakedScience',);
};
getAllMessages();
