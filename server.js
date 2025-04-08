const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const app = express();


app.use(express.json());
app.use(express.static('src'));


const usersFilePath = path.join(__dirname, 'src', 'data', 'users.json');


function readUsers() {
    try {
        const data = fs.readFileSync(usersFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}


function saveUsers(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const users = readUsers();

    
        if (users.some(user => user.email === email)) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

  
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password: hashedPassword,
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=default',
            cover: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
            bio: '',
            location: '',
            website: '',
            linkedin: '',
            followers: 0,
            following: 0,
            posts: [],
            profileConfigured: false
        };

      
        users.push(newUser);
        saveUsers(users);

        res.status(201).json({ message: 'Usuário criado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
});


app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const users = readUsers();

    
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(400).json({ error: 'Usuário não encontrado' });
        }

      
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Senha incorreta' });
        }

    
        const { password: _, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
}); 