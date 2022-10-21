import app from './config/app'

/// server Listenning
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
console.log(PORT, "run")
}) 