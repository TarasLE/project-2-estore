async function takeFormData() {
  const refreshToken = localStorage.getItem('refreshToken');
  const sid = localStorage.getItem('sid');

  // console.log(refreshToken);
  let data = {};

  data.sid = sid;

  // console.log(data);

  let config = {
    method: 'POST',
    url: 'https://callboard-backend.herokuapp.com/auth/refresh',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${refreshToken}`,
      //   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmQ3Y2VhZWMyOThhMjAwMTc5YzhjYzAiLCJzaWQiOiI1ZmQ5MmMyMmNjZWZlZTAwMTc1M2ZiNzIiLCJpYXQiOjE2MDgwNjgxMzAsImV4cCI6MTYwODA3MTczMH0.I20tV29tq6tHg_XIPcDt1JW21Xmy3Un_kn64p6rMk_w',
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log('refreshTokenSeccses', response);
      const newRefreshToken = response.data.newRefreshToken;
      const newAccessToken = response.data.newAccessToken;
      const newSid = response.data.newSid;

      localStorage.setItem('refreshToken', newRefreshToken);
      localStorage.setItem('Bearer', newAccessToken);
      localStorage.setItem('sid', newSid);
    })
    .catch(function (error) {
      console.log('refreshTokenError', error);
    });
}
const Token = localStorage.getItem('Bearer');

let intervalID;

if (Token) {
  intervalID = setInterval(takeFormData, 1200000);
} else if (Token === null) {
  clearInterval(intervalID);
} else if (Token !== undefined) {
  clearInterval(intervalID);
}
