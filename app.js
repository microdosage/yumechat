const mysql = require('mysql');

// Configuração do banco de dados
const conexao = mysql.createConnection({
  host: 'postgres://eiboskzv:So1syRwX_NGjOi6rBl1zjSvaDXovLpm3@silly.db.elephantsql.com/eiboskzv',
  user: 'eiboskzv',
  password: 'So1syRwX_NGjOi6rBl1zjSvaDXovLpm3',
  database: 'eiboskzv',
});

// Conecta ao banco de dados
conexao.connect((erro) => {
  if (erro) {
    console.error('Erro ao conectar ao banco de dados:', erro);
    return;
  }
  console.log('Conectado ao banco de dados');
});

// Função para inserir uma nova mensagem na tabela
function inserirMensagem(usuario, texto) {
  const sql = 'INSERT INTO mensagens (usuario, texto) VALUES (?, ?)';
  const valores = [usuario, texto];

  conexao.query(sql, valores, (erro, resultado) => {
    if (erro) {
      console.error('Erro ao inserir mensagem:', erro);
      return;
    }
    console.log('Mensagem inserida com sucesso. ID:', resultado.insertId);
  });
}

// Insere mensagens a cada 30 segundos
setInterval(() => {
  const usuario = 'Usuario' + Math.floor(Math.random() * 100); // Gera um nome de usuário aleatório
  const texto = 'Texto da mensagem ' + Math.floor(Math.random() * 100); // Gera um texto aleatório
  inserirMensagem(usuario, texto);
}, 30000); // 30 segundos

// Mantenha a aplicação em execução sem encerrar a conexão
process.stdin.resume();

// Trate o encerramento do processo (CTRL+C) para encerrar a conexão de maneira controlada
process.on('SIGINT', () => {
  console.log('Encerrando aplicação');
  conexao.end((erro) => {
    if (erro) {
      console.error('Erro ao encerrar conexão:', erro);
    } else {
      console.log('Conexão encerrada');
    }
    process.exit();
  });
});
