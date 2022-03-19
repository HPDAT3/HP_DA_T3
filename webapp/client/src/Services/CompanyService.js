export default {
  getCompanyByCIK: (_id) => {
    return fetch("/company/getcompanybycik", {
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
