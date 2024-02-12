from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles # 정적파일(html, css, js)


app = FastAPI()

answer = 'WATER'
@app.get("/answer")
def get_answer():
    return answer

app.mount("/", StaticFiles(directory="static",html=True), name="static")

