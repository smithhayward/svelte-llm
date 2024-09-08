<script>
  let userInput = '';
  let chatResponse = '';
  let loading = false;

  // Function to send message to our API route
  async function sendMessage() {
    if (userInput.trim() === '') return;  // Don't sent empty messages to the API.

    loading = true;                       // Record _state_ that the app is LOADING...
    chatResponse = '';                      // Clear any previous chat responses...

    try {
      const res = await fetch('/api/chat', {  // Chat-GPT did not give me correct information for this. It said to name the file chat.json.ts in the /routes/api folder, but the right answer is to make a +server.ts file in the /routes/api/chat folder
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),       // userInput is the field we're binding to in the form on the page
      });

      const data = await res.json();                        // I think we're using await here just because it's inside an async function.

      if (res.ok) {                                                     // successful reply from Chat-GPT
        // Display the response from the API
        chatResponse = data.choices[0].message.content;             // assign the reponse from chatGPT to the response variable
      } else {
        chatResponse = 'Error: ' + data.error;
      }
    } catch (error) {
        chatResponse = 'Error communicating with the server.';
    } finally {
        loading = false;
    }
  }
</script>

<main>
  <h1>Chat with GPT-4</h1>

  <!-- Input Form -->
  <form on:submit|preventDefault={sendMessage}>
    <input
      type="text"
      placeholder="Ask a question..."
      bind:value={userInput}
      required
    />
    <button type="submit" disabled={loading}>Send</button>
  </form>

  <!-- Loader -->
  {#if loading}
    <p>Loading...</p>
  {/if}

  <!-- Display the response -->
  {#if chatResponse}
    <p><strong>Response:</strong> {chatResponse}</p>
  {/if}
</main>

<style>
  main {
    font-family: Arial, sans-serif;
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
  }

  input {
    width: 80%;
    padding: 10px;
    margin-right: 10px;
  }

  button {
    padding: 10px;
  }

  p {
    margin-top: 20px;
    white-space: pre-line;
  }
</style>
