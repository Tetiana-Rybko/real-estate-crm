from pydantic import BaseModel, EmailStr
from typing import Optional


class ClientCreate (BaseModel):
    full_name: str
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    note: Optional[str] = None



class ClientOut(ClientCreate):
    id: int

    class Config:
        from_attributes = True  # важно для SQLAlchemy (Pydantic v2)

class ClientUpdate(BaseModel):
    full_name:Optional[str]=None
    phone:Optional[str]=None
    email:Optional[str]=None
    note:Optional[str]=None