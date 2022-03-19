export default {
    getFormByID: (_id) => {
      return fetch("/form/getformbyid", {
        method: "post",
        body: JSON.stringify({ _id: _id }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        return response.json().then((data) => data);
      });
    },
  };
  