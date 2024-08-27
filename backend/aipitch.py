from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from fastapi.middleware.cors import CORSMiddleware

# FastAPI setup
app = FastAPI()

# Define the origins that should be allowed to make requests
origins = [
    "http://localhost:5173",  # React frontend
    "http://localhost:3000",  # Another common React port
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Load your pre-trained model and tokenizer
tokenizer = AutoTokenizer.from_pretrained('distilbert-base-uncased')
model = AutoModelForSequenceClassification.from_pretrained('distilbert-base-uncased', num_labels=2)

# Define data models
class Pitch(BaseModel):
    description: str
    revenue: float = None
    market_size: float = None
    ask: float = None
    equity: float = None

# Function to generate a dynamic response from the AI model
def generate_ai_response(text: str) -> str:
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    outputs = model(**inputs)
    prediction = torch.argmax(outputs.logits, dim=-1).item()
    if prediction == 1:
        return "I'm interested in hearing more. Please provide additional details like your revenue and market size."
    else:
        return "This doesn't seem like a good fit for me. Best of luck!"

# Stage 1: Initial Pitch
@app.post("/start_pitch/")
def start_pitch(pitch: Pitch):
    response = generate_ai_response(pitch.description)
    return {"message": response}

# Stage 2: Follow-up Questions
@app.post("/follow_up/")
def follow_up(pitch: Pitch):
    if pitch.revenue is None or pitch.market_size is None:
        raise HTTPException(status_code=400, detail="Please provide your revenue and market size.")

    # Generate a dynamic follow-up response based on AI model output
    additional_input = f"Revenue: {pitch.revenue}, Market Size: {pitch.market_size}"
    response = generate_ai_response(additional_input)
    return {"message": response}

# Stage 3: ROI Calculation
def calculate_roi(revenue, market_size, equity):
    # Simple ROI calculation (placeholder)
    potential_market_share = (revenue / market_size) * 100
    potential_roi = (potential_market_share / equity) * 100
    return potential_roi

# Stage 4: Valuation and Negotiation
@app.post("/evaluate/")
def evaluate_pitch(pitch: Pitch):
    if pitch.ask is None or pitch.equity is None:
        raise HTTPException(status_code=400, detail="Please provide the amount you are asking for and the equity you are offering.")

    roi = calculate_roi(pitch.revenue, pitch.market_size, pitch.equity)
    
    # Placeholder valuation logic
    valuation = pitch.revenue * (roi / 100)
    negotiation_message = "Based on my analysis, I would value your company at around ${:,.2f}. I'm willing to offer ${:,.2f} for {}% equity.".format(
        valuation, pitch.ask, pitch.equity)

    # Generate a dynamic response based on the valuation and user's ask
    if pitch.ask <= valuation:
        response = negotiation_message + " I think this is a fair deal."
    else:
        counter_offer = valuation * 0.8  # Example of a counter-offer
        response = negotiation_message + " However, I think your ask is a bit high. I'd like to offer ${:,.2f} for {}% equity. Let's negotiate.".format(
            counter_offer, pitch.equity)

    return {"message": response}

# Example endpoint to test conversation flow
@app.get("/")
def read_root():
    return {"message": "Welcome to the Shark Tank Simulator! Start by submitting your pitch."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
