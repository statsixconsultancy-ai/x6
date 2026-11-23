import asyncio, base64, subprocess
from playwright.async_api import async_playwright
async def main():
    srv = subprocess.Popen(["python3","-m","http.server","8765"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    await asyncio.sleep(1)
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox","--use-angle=swiftshader","--enable-unsafe-swiftshader","--ignore-gpu-blocklist"])
        pg = await b.new_page(viewport={"width":1000,"height":1000})
        pg.on("pageerror", lambda e: print("ERR", e))
        await pg.goto("http://localhost:8765/render.html")
        await pg.wait_for_function("window.ready === true", timeout=90000)
        for name, tilt in [("coin-hero",[0.25,-0.55,0.12]),("coin-front",[0.08,-0.22,0.0]),("coin-edge",[0.9,-1.15,0.35])]:
            d = await pg.evaluate(f"renderCoin({tilt})")
            open(f"{name}.png","wb").write(base64.b64decode(d.split(",")[1]))
            print(name)
        await b.close()
    srv.terminate()
asyncio.run(main())
