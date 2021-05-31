const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)

const Socket = require("socket.io")

const firebase = require("./db")
const firestore = firebase.firestore()

const io = new Socket.Server(server)

let users = []

io.on("connection", (socket) => {
  socket.on("user_connected", (username) => {
    var data = users.find((item) => item.name === username)

    if (data) {
      console.log("bu kullanıcı zaten giriş yapmış")
    } else {
      const addedData = {
        name: username,
        id: socket.id,
      }

      users.push(addedData)
    }

    console.log(users)

    io.emit("user_connected", users)
  })

  socket.on("create_room", async ({ roomname, date }) => {
    await firestore.collection("rooms").doc().set({ name: roomname })
    await firestore.collection(roomname).doc().set({
      from: "server",
      message: "Kanal Oluşturuldu!",
      date: date,
    })
    io.emit("create_room", roomname)
  })

  socket.on("join_room", (room) => {
    socket.join(room)
  })

  socket.on("leave_room", (room) => {
    socket.leave(room)
  })

  socket.on("send_message", (data) => {
    var socketId = users.find((item) => item.name === data.to)

    if (socketId) {
      io.to(socketId.id).emit("new_message", data)
    } else {
      io.to(data.to).emit("new_message", data)
    }
  })

  socket.on("disconnect", () => {
    users = users.filter((item) => item.id !== socket.id)

    io.emit("user_connected", users)
  })
})

server.listen("3001", () => console.log("server is started"))
