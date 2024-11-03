<script setup lang="ts">
  import {ref} from 'vue';

  interface Message {
    id: number;
    role: string;
    content: string;
  }

  const messages = ref < Message[] > ([]);
  const input = ref('');

  const url = "http://127.0.0.1:8000/chat";

  const handleSubmit = async (event: Event) => {
    event.preventDefault();

    if (!input.value) return;

    messages.value.push({id: Date.now(), role: 'user', content: input.value});

    const userInput = input.value;
    input.value = '';
    const response = await getChatResponse(messages.value);
    console.log(response)
    if (response) {
      messages.value.push({id: Date.now(), role: 'assistant', content: response.content});
    }
  };

  const getChatResponse = async (messages: Message[]) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({messages: messages}), // Ajusta aquí si el backend espera un objeto con `messages`
      });

      return await response.json();
    } catch (error) {
      console.error("Error al obtener respuesta del chat:", error);
    }
  };
</script>

<template>
  <div class="flex flex-col w-full max-w-md py-24 mx-auto stretch">
    <div v-for="m in messages" :key="m.id" class="whitespace-pre-wrap">
      {{ m.role === 'user' ? 'User: ' : 'AI: ' }}
      {{ m.content }}
    </div>

    <form @submit="handleSubmit">
      <input class="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl" v-model="input"
        placeholder="Dime algo..." />
    </form>
  </div>
</template>
