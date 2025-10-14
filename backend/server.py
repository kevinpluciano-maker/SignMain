from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import Response
from fastapi.middleware.gzip import GZipMiddleware
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Dict, Any, Optional
import uuid
from datetime import datetime
from email_service import email_service


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class ContentSection(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    section_id: str
    content: str
    font_size: str
    font_family: str
    plain_text: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class ContentSectionCreate(BaseModel):
    section_id: str
    content: str
    font_size: str
    font_family: str
    plain_text: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

@api_router.post("/content/{section_id}", response_model=ContentSection)
async def save_content_section(section_id: str, input: ContentSectionCreate):
    # Check if section already exists
    existing = await db.content_sections.find_one({"section_id": section_id})
    
    content_dict = input.dict()
    content_dict["section_id"] = section_id
    content_obj = ContentSection(**content_dict)
    
    if existing:
        # Update existing section
        await db.content_sections.update_one(
            {"section_id": section_id},
            {"$set": content_obj.dict()}
        )
    else:
        # Insert new section
        await db.content_sections.insert_one(content_obj.dict())
    
    return content_obj

@api_router.get("/content/{section_id}", response_model=ContentSection)
async def get_content_section(section_id: str):
    content = await db.content_sections.find_one({"section_id": section_id})
    if content:
        return ContentSection(**content)
    return None

@api_router.get("/content", response_model=List[ContentSection])
async def get_all_content():
    contents = await db.content_sections.find().to_list(1000)
    return [ContentSection(**content) for content in contents]

# Include the router in the main app
app.include_router(api_router)

# Add GZip compression middleware
app.add_middleware(GZipMiddleware, minimum_size=1000)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add caching headers for static assets
@app.middleware("http")
async def add_cache_headers(request, call_next):
    response = await call_next(request)
    
    # Cache static assets for 1 year
    if request.url.path.startswith('/assets/'):
        response.headers['Cache-Control'] = 'public, max-age=31536000, immutable'
    # Cache images for 30 days
    elif any(ext in request.url.path for ext in ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.ico']):
        response.headers['Cache-Control'] = 'public, max-age=2592000'
    # Cache other static files for 1 week
    elif any(ext in request.url.path for ext in ['.css', '.js', '.woff', '.woff2', '.ttf', '.eot']):
        response.headers['Cache-Control'] = 'public, max-age=604800'
    # Don't cache API responses
    elif request.url.path.startswith('/api/'):
        response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
        response.headers['Pragma'] = 'no-cache'
        response.headers['Expires'] = '0'
    
    return response

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
