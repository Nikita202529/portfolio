import axios from "axios";

const getNews = () => {

        const options = {
            method: 'GET',
            url: 'https://free-news.p.rapidapi.com/v1/search',
            params: {q: 'Elon Musk', lang: 'en'},
            headers: {
                'x-rapidapi-host': 'free-news.p.rapidapi.com',
                'x-rapidapi-key': '0d22ec942bmsh23b5996586ab7e0p1605c3jsndc284a9d624b'
            }
        };

        return axios.request(options);
}

export default getNews;