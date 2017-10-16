const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3003'
const headers = {
    'Accept': 'application/json'
};

export const submitOp = (op, input1, input2) => {

    return fetch(`${api}/${op}`, {
        method: 'Post',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "input1": input1,
            "input2": input2
        })
    })
        .then(function(response) {
            console.log(response);
            if(response.status === 200){
            return response.json();
            }else {
                return "error";
            }
        })
        .catch(error => {
            console.log("This is error.");
            return error;
        });
};
