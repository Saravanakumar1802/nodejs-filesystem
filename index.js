import express from "express";
import fs from "fs";

const PORT = 4002;

const app = express();
app.use(express.json());

app.post('/time', (req, res) => {

    const currentDate = (Date) => {
        const date = Date.getDate();
        const month = Date.getMonth();
        const year = Date.getFullYear();
        const hours = Date.getHours() % 12;
        const minutes = Date.getMinutes();
        const seconds = Date.getSeconds();
        console.log(`${date}-${month}-${year}_${hours}:${minutes}:${seconds}`);
        return `${date}-${month}-${year}_${hours}:${minutes}:${seconds}`
    }
    const date = currentDate(new Date());

    const filename = new Date().getTime();
    fs.writeFile(`./files/${filename}.txt`, date, (err, data) => {
        if (err) console.log(err);
        res.status(200).send("File created successfully");
    });
})

app.get("/", (req, res) => {
    fs.readdir("./files", (err, data) => {
        if (err) {
            console.log(err);
            res.status(404).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}🎉🎉`));