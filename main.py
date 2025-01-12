from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import webbrowser as wb
import datetime
import time
import threading
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI() 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or specify a list of origins, e.g., ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Define the request model with the required fields
class MessageRequest(BaseModel):
    to: str  # Recipient's phone number (e.g., +911234567890)
    message: str  # Message to be sent
    hour: int  # Hour to send the message (0-23)
    minute: int  # Minute to send the message (0-59)
    second: int  # Second to send the message (0-59)

# Function to open the WhatsApp Web URL
def open_whatsapp_url(to, message):
    """Open WhatsApp Web URL to send a message."""
    url = f"https://web.whatsapp.com/send?phone={to}&text={message}"
    wb.open_new_tab(url)

# Function to calculate the time difference from the current time
def get_time_difference(send_hour, send_minute, send_second):
    """Calculate the time difference (in seconds) from the current time to the scheduled time."""
    now = datetime.datetime.now()
    send_time = datetime.datetime(
        now.year, now.month, now.day, send_hour, send_minute, send_second
    )
    if send_time < now:
        send_time += datetime.timedelta(days=1)  # If the time is past, schedule for the next day
    return int((send_time - now).total_seconds())

# Function to schedule the message
def schedule_message(to, message, send_hour, send_minute, send_second):
    """Schedule a message to be sent at a specified time."""
    wait_time = get_time_difference(send_hour, send_minute, send_second)
    time.sleep(wait_time)  # Wait until the scheduled time
    open_whatsapp_url(to, message)  # Open WhatsApp Web and send the message

# API endpoint to schedule the WhatsApp message
@app.post("/send-message/")
def send_message(request: MessageRequest):
    """API endpoint to schedule a WhatsApp message."""
    try:
        # Start a new thread to handle the message scheduling without blocking the server
        threading.Thread(
            target=schedule_message,
                args=(request.to, request.message, request.hour, request.minute, request.second),
            ).start()
        return {"message": "Message scheduled successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))