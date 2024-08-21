import re
import json

def preprocess_transcript(transcript_text):
    # Define patterns for removing non-text elements and splitting
    music_pattern = r'\[Music\]'
    timestamp_pattern = r'\d{2}:\d{2}'
    speaker_pattern = r'(Caitlyn|Barbara|Mr\. Wonderful|Mark|Lori|Emma|Sharks):'

    # Remove non-text elements
    text = re.sub(music_pattern, '', transcript_text)
    text = re.sub(timestamp_pattern, '', text)

    # Initialize variables
    data = []
    current_prompt = ""
    current_speaker = ""

    # Split text into lines
    lines = text.split('\n')
    for line in lines:
        # Detect speaker
        match = re.match(speaker_pattern, line)
        if match:
            # Save previous prompt/response if available
            if current_prompt and current_speaker:
                data.append({
                    "prompt": current_prompt.strip(),
                    "response": line.replace(match.group(0), '').strip()
                })
            # Start new prompt
            current_speaker = match.group(0).strip(':')
            current_prompt = line.replace(match.group(0), '').strip()
        else:
            # Append line to current prompt
            if current_prompt:
                current_prompt += " " + line

    # Add the last prompt/response
    if current_prompt and current_speaker:
        data.append({
            "prompt": current_prompt.strip(),
            "response": ""
        })

    # Check if data is empty
    if not data:
        print("Warning: No data was processed. Check transcript format and patterns.")

    return data

# Read the raw transcript
with open('script.txt', 'r') as file:
    transcript_text = file.read()

# Preprocess the transcript
preprocessed_data = preprocess_transcript(transcript_text)

# Save to JSON
if preprocessed_data:
    with open('preprocessed_shark_tank_data.json', 'w') as file:
        json.dump(preprocessed_data, file, indent=4)
else:
    print("No data to save.")
