import { themesVillage, themesSnob, } from '../constants';

export const loadVillage = async (callback, ) => {
    themesVillage.forEach(async (theme, ) => {
        const result = await fetch(`http://localhost:3000/api/village/articles?theme=${theme}`,);
        const articles = await result.json();
        callback({ name: 'Village', articles: new Map(articles,), },);
    },);
};

export const loadSnob = async (callback, ) => {
    themesSnob.forEach(async (theme, ) => {
        const result = await fetch(`http://localhost:3000/api/snob/articles?params=${theme}`,);
        const articles = await result.json();
        callback({ name: 'Snob', articles: new Map(articles,), },);
    },);
};

export const loadKnife = async (callback, ) => {
    const result = await fetch('http://localhost:3000/api/knife/articles',);
    const articles = await result.json();
    callback({ name: 'Knife', articles: new Map(articles,), },);
};

export const loadVC = async (callback, ) => {
    const result = await fetch('http://localhost:3000/api/vc/articles',);
    const articles = await result.json();
    callback({ name: 'VC', articles: new Map(articles,), },);
};

export const loadNakedScience = async (callback, ) => {
    const result = await fetch('http://localhost:3000/api/nakedScience/articles',);
    const articles = await result.json();
    callback({ name: 'NakedScience', articles: new Map(articles,), },);
};

export const loadNewtonew = async (callback, ) => {
    const result = await fetch('http://localhost:3000/api/newtonew/articles',);
    const articles = await result.json();
    callback({ name: 'Newtonew', articles: new Map(articles,), },);
};

export const loadVice = async (callback, ) => {
    const result = await fetch('http://localhost:3000/api/vice/articles',);
    const articles = await result.json();
    callback({ name: 'Vice', articles: new Map(articles,), },);
};

export const loadNplus = async (callback, ) => {
    const result = await fetch('http://localhost:3000/api/nplus/articles',);
    const articles = await result.json();
    callback({ name: 'Nplus', articles: new Map(articles,), },);
};

export const loadForbes = async (callback, ) => {
    const result = await fetch('http://localhost:3000/api/forbes/articles',);
    const articles = await result.json();
    callback({ name: 'Forbes', articles: new Map(articles,), },);
};