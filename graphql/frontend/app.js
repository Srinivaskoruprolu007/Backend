const fetchGraphQLData = async () => {
  const response = await fetch("http://localhost:8000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: "query{greeting}",
    }),
  });
  const { data } = await response.json();
  return data.greeting;
};

fetchGraphQLData().then((greeting) => {
    document.getElementById('data').textContent = greeting
})