const config = {
    api_path: 'http://localhost:8080',
    token_name: 'pos_token',
    headers: () => {
        return {
            headers: {
                'Authorization': ' Bearer ' + localStorage.getItem('pos_token')
            }
        }
    }
}

export default config