import axios from "axios";

const fetch = async (url, route,  filter = false) => {
    try{
        let { data } = await axios.get(url)
        let result = []
        if (filter) {
            result = data.filter(el => el.id == route);
        } else {
            result = data.find(el => el.id == route);
        }
        console.log(result)
        return result
    }catch (e) {
        console.log(e)
    }
}

export default fetch;