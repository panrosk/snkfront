const url = "http://127.0.0.1:8000/chat";

export const getChatResponse = async (messages) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messages),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
