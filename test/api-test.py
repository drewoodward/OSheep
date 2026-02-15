import requests
import json

base_url = "https://mochi.tail0212b6.ts.net"

# Test 1: List available models (try correct Ollama endpoint)
print("=== Testing /api/tags (list models) ===")
response = requests.get(f"{base_url}/api/tags")
print(f"Status: {response.status_code}")

if response.status_code == 200:
    try:
        models = response.json()
        print(f"Available models: {json.dumps(models, indent=2)}")
        if models.get('models'):
            model_name = models['models'][0]['name']
            print(f"\nUsing model: {model_name}")
        else:
            model_name = "llama3.2"  # fallback
    except Exception as e:
        print(f"Error parsing models: {e}")
        model_name = "llama3.2"
else:
    print(f"Error: {response.text}")
    model_name = "llama3.2"

print("\n" + "="*50)

# Test 2: Generate with stream=False
print("=== Testing /api/generate (stream=False) ===")
data = {
    "model": model_name,
    "prompt": "Explain recursion like I'm five.",
    "stream": False
}
response = requests.post(f"{base_url}/api/generate", json=data)
print(f"Status: {response.status_code}")

if response.status_code == 200:
    try:
        result = response.json()
        print(f"\nResponse text:\n{result.get('response', 'No response field found')}")
        print(f"\nFull result: {json.dumps(result, indent=2)}")
    except Exception as e:
        print(f"JSON parse error: {e}")
        print(f"Raw text: {response.text[:1000]}")
else:
    print(f"Error: {response.text}")