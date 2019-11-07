const express = require('express')

const { View, Landing, Register, Login, Search } = require('./components')
const { bodyParser, cookieParser } = require('./utils/middlewares')
const querystring = require('querystring')
const { registerUser, authenticateUser, retrieveUser, searchDucks } = require('./logic')


const { argv: [, , port = 8080] } = process

const sessions = {}

const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send(View({ body: Landing({register: '/register', login: '/login'}) }))
} )


app.get('/register', (req, res) => {
    res.send(View({ body: Register( { path: '/register' }) }))
})

app.post('/register', bodyParser, (req, res) => {
        const { body: {name, surname, email, password} } = req
        try {
            registerUser(name, surname, email, password)
                
        } catch(error) {
            // TODO handling
        }
}) 

app.get('/login', (req, res) => {
    res.send(View({ body: Login({ path: '/login' }) }))
})


app.post('/login', (req, res) => {
    let content = ''

    req.on('data', chunk => content += chunk)

    req.on('end', () => {
        const { email, password } = querystring.parse(content)
        try{
            authenticateUser(email, password, (error, credentials) => {
                if(error) return res.send('esto esta fatal')
                else {
                    const { id, token } = credentials 

                    sessions[id] = token

                    res.setHeader('set-cookie', `id=${id}`)

                    res.redirect('/search')
                }
            })

        }catch(error){
            //TODO
        }
    })
})

app.get('/search', (req, res) => {
    try{
        const { headers: {cookie } } = req

        if(!cookie) return res.redirect('/login')

        const [, id] = cookie.split('id=')

        const token = sessions[id]

        if (!token) return res.redirect('/login')

        retrieveUser(id, token, (error, user) => {
            if(error) return res.send('retrieveuser to mal')

            const { name } = user
            const { query: { q: query} } = req

            if(!query) res.send(View( {body: Search({path: '/search', name, logout: '/logout'} )} ))
            else{
                try{
                    searchDucks(id, token, query, (error, ducks) => {
                        if(error) return res.send('error searchducks')

                        console.log(ducks)

                        res.send(View( {body: `${Search( { path: '/search', query, name, logout: '/logout'} )}`} ))// TODO ${Results({items: ducks})}
                    })
                }catch(error){

                }
            }
        })

    }catch(error){

    }
})

app.post('/logout', (req, res) => {
    res.setHeader('set-cookie', 'id=""; expires=Thu, 01 Jan 1970 00:00:00 GMT')

    res.redirect('/')
})

app.listen(port, () => console.log(`server running on port ${port}`))

