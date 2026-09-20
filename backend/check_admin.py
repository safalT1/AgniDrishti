import asyncio
from database.mongo import db

async def check():
    user = await db['users'].find_one({'email': 'admin@gmail.com'})
    print('Admin user:', user)

asyncio.run(check())
