const express = require("express");
const axios = require("axios");
const https = require("https");
const fs = require("fs");

const app = express();

app.use(express.json());

app.get("/session/minecraft/profile/:uuid", (req, res) => {
	axios({
		method: "GET",
		url: `https://sessionserver.mojang.com/session/minecraft/profile/${req.params.uuid}`
	})
		.then((resp) => {
			let respj = resp.data;
			let texturesp = respj.properties.find((property) => property.name === "textures");
			
			if (!texturesp) {
				return res.sendStatus(500);
			}

			let texturess = texturesp.value;
			let buff = new Buffer(texturess, "base64");
			let textures = JSON.parse(buff.toString("ascii"));

			if (textures.textures.CAPE) {
				textures.textures.CAPE.url = "http://textures.minecraft.net/texture/b76f0c40760878df064d242676aadb9774674eee49da292fd2f1d1181dc2cd4b";
			}

			let buff2 = new Buffer(JSON.stringify(textures));
			texturess = buff2.toString("base64");
			texturesp.value = texturess;

			res.send(respj);
		})
		.catch((err) => {
			res.sendStatus(500);
		});
});

app.all("*", (req, res) => {
	axios({
		method: req.method,
		url: `https://sessionserver.mojang.com${req.originalUrl}`,
		data: req.method.toLowerCase() === "get" ? undefined : req.data
	})
		.then((resp) => {
			res.send(resp.data);
		})
		.catch((err) => {
			res.sendStatus(500);
		});
});

if (!process.env.USE_HTTP) {
	https
		.createServer({
		key: fs.readFileSync("dev/key.pem"),
		cert: fs.readFileSync("dev/cert.pem")
	}, app)
		.listen(443, () => {
			console.log("App is listening with HTTPS!");
		});
} else {
	app.listen(8080, () => {
		console.log("App is listening with HTTP!");
	});
}