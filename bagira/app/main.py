import os
from app.core.logging import setup_logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api.routers.auth import router as auth_router
from app.api.routers.clients import router as clients_router
from app.api.routers.properties import router as properties_router
from app.api.routers.property_images import router as property_images_router
import logging
from app.api.routers import deals,activity,users,tasks,dashboard,search


app = FastAPI(
    title="Bagira SRM API",
    root_path="/api",
)
setup_logging()


os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="/app/uploads"), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(clients_router)
app.include_router(deals.router)
app.include_router(properties_router)
app.include_router(activity.router)
app.include_router(users.router)
app.include_router(tasks.router)
app.include_router(dashboard.router)
app.include_router(search.router)
app.include_router(property_images_router)

@app.get("/health")
def health():
    return {"status": "ok"}

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)
