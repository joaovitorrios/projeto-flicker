const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const app = express();

// Middleware para processar JSON
app.use(express.json());
app.use(express.static('src'));

// Caminho para o arquivo de usuários
const usersFilePath = path.join(__dirname, 'src', 'data', 'users.json');

// Função para ler usuários
function readUsers() {
    try {
        const data = fs.readFileSync(usersFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Função para salvar usuários
function saveUsers(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

// Rota para cadastro
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const users = readUsers();

        // Verificar se o email já existe
        if (users.some(user => user.email === email)) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }

        // Criar hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Criar novo usuário
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
            posts: []
        };

        // Adicionar usuário e salvar
        users.push(newUser);
        saveUsers(users);

        res.status(201).json({ message: 'Usuário criado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
});

// Rota para login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const users = readUsers();

        // Encontrar usuário
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(400).json({ error: 'Usuário não encontrado' });
        }

        // Verificar senha
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Senha incorreta' });
        }

        // Remover senha antes de enviar
        const { password: _, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
}); 