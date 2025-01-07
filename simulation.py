import asyncio
import json
import websockets

entities = []

async def simulation_logic():
    while True:
        for entity in entities:
            if entity["type"] == "Cell":
                entity["x"] += 1  # Example behavior
            elif entity["type"] == "Predator":
                entity["y"] += 1  # Example behavior
        await asyncio.sleep(0.1)

async def handler(websocket, path):
    async for message in websocket:
        data = json.loads(message)
        if data["action"] == "add":
            entities.append({"x": data["x"], "y": data["y"], "type": data["type"]})
        await websocket.send(json.dumps(entities))

async def main():
    server = await websockets.serve(handler, "localhost", 8080)
    await asyncio.gather(server.wait_closed(), simulation_logic())

asyncio.run(main())
