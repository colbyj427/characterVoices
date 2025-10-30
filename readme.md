# Instructions

The ephemeral key needs to be manually changed currently. 
To do this, run the following command in an environemnt with your api key set:

curl -s -X POST https://api.openai.com/v1/realtime/client_secrets -H "Authorization: Bearer $OPENAI_API_KEY" -H "Content-Type: application/json" -d '{"session": {"type": "realtime", "model": "gpt-realtime"}}' | jq .value

Then copy the result into the ephermeral key value in main.ts
it is api_key on line 45.

To set environment variable:

export OPENAI_API_KEY="keyhere"

start the program with:

npm run dev
