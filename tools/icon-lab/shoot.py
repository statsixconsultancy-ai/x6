import asyncio, base64, subprocess, sys, os
from playwright.async_api import async_playwright
async def main():
    srv = subprocess.Popen(["python3","-m","http.server","8765"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    await asyncio.sleep(1)
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox","--use-angle=swiftshader","--enable-unsafe-swiftshader","--ignore-gpu-blocklist"])
        pg = await b.new_page(viewport={"width":700,"height":700})
        pg.on("console", lambda m: print("console:", m.text) if m.type in ("error","warning") else None)
        pg.on("pageerror", lambda e: print("ERR", e))
        await pg.goto("http://localhost:8765/render.html")
        await pg.wait_for_function("window.ready === true", timeout=60000)
        for n in ["community","ai","value","web"]:
            d = await pg.evaluate(f"renderIcon('{n}')")
            open(f"{n}.png","wb").write(base64.b64decode(d.split(",")[1]))
            print(n, os.path.getsize(f"{n}.png"))
        await b.close()
    srv.terminate()
asyncio.run(main())
