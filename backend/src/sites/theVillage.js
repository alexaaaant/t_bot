const url = 'https://www.the-village.ru';

const themes = [
    'city',
    'people',
    'business',
    'weekend',
    'children',
];

function getArticle(link,) {
    fetch(link,)
        .then((res,) => res.text(),)
        .then((html,) => {
            const doc = new DOMParser().parseFromString(html, 'text/html',);
        },)
        .catch((err,) => console.log(err,),);
}

export default {
    getArticle,
    themes,
};
