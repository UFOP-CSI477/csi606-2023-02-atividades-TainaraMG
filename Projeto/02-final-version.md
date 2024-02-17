# **CSI606-2021-02 - Remoto - Trabalho Final - Resultados**

## *Aluna(o): Tainara Marina Gonçalves Morais*

--------------

<!-- Este documento tem como objetivo apresentar o projeto desenvolvido, considerando o que foi definido na proposta e o produto final. -->

### Resumo

  O trabalho consiste em uma aplicação para gerenciamento de sistemas imobiliários. O principal objetivo do sistema é fornecer uma visualização para a administração da imobiliária, oferecendo dados cruciais relacionados aos contratos de aluguéis prestes a vencer, o total de imóveis alugados, vendidos e disponíveis, além do número total de imóveis cadastrados na base de dados.


### 1. Funcionalidades implementadas
Como só o backend foi implementado, as funcionalidades implementadas foram as seguintes:

*Contratos:*
-Buscar Todos os Contratos: Permite obter uma lista de todos os contratos registrados no sistema.
-Buscar Contrato por ID: Permite buscar um contrato específico com base no seu ID.
-Criar Novo Contrato: Possibilita criar um novo contrato no sistema.
-Atualizar Contrato Existente: Permite atualizar as informações de um contrato já existente.
-Excluir Contrato Existente: Permite excluir um contrato do sistema.
-Buscar Contratos de Aluguel Próximos ao Vencimento: Retorna os contratos de aluguel que estão próximos do vencimento.

*Imóveis:*
-Buscar Todos os Imóveis: Permite obter uma lista de todos os imóveis cadastrados no sistema.
-Buscar Imóvel por ID: Permite buscar informações de um imóvel específico com base no seu ID.
-Criar Novo Imóvel: Permite adicionar um novo imóvel ao catálogo da imobiliária.
-Atualizar Imóvel Existente: Permite atualizar as informações de um imóvel já cadastrado.
-Excluir Imóvel Existente: Permite excluir um imóvel do catálogo da imobiliária.
-Quantidade de Imóveis Alugados: Retorna o número de imóveis alugados.
-Quantidade de Imóveis Vendidos: Retorna o número de imóveis vendidos.
-Quantidade de Imóveis Disponíveis: Retorna o número de imóveis disponíveis para aluguel ou venda.
-Quantidade Total de Imóveis: Retorna o número total de imóveis cadastrados no catálogo da imobiliária.

*Usuários:*
-Buscar Todos os Usuários: Permite obter uma lista de todos os usuários cadastrados no sistema.
-Buscar Usuário por ID: Permite buscar informações de um usuário específico com base no seu ID.
-Criar Novo Usuário: Permite adicionar um novo usuário ao sistema.
-Atualizar Usuário Existente: Permite atualizar as informações de um usuário já cadastrado.
-Excluir Usuário Existente: Permite excluir um usuário do sistema.
-Login do Usuário: Permite que um usuário faça login no sistema.


### 2. Funcionalidades previstas e não implementadas
No contexto do backend, todas as funcionalidades previstas foram implementadas, exceto a obtenção do retorno da renda mensal gerada por cada categoria de imóvel. Essa funcionalidade não foi implementada porque não consegui fazer com que funcionasse.

Devido à ausência de frontend, as seguintes funcionalidades relacionadas à interface do usuário não foram implementadas:
-Tela de Catálogo de Imóveis: Esta tela permitiria que os clientes da imobiliária visualizassem os imóveis disponíveis juntamente com as informações relevantes sobre eles, facilitando a busca e seleção de propriedades.
-Tela de Dashboard para o Administrador: Essa tela seria destinada ao administrador da imobiliária, fornecendo uma visão geral das métricas importantes, como número de contratos ativos, renda mensal, número de imóveis disponíveis, entre outras informações relevantes para a gestão do negócio.


### 3. Outras funcionalidades implementadas
<!-- Descrever as funcionalidades implementas além daquelas que foram previstas, caso se aplique.  -->

### 4. Principais desafios e dificuldades
Durante o desenvolvimento do trabalho, um dos principais desafios encontrados foi a minha incapacidade de desenvolver o frontend a tempo. Esta dificuldade impactou significativamente a apresentação de uma interface de usuário completa e funcional para a aplicação de gerenciamento imobiliário.

### 5. Instruções para instalação e execução

*Instalação do Docker:*

- Certifique-se de ter o Docker instalado no seu sistema. Você pode encontrar instruções de instalação adequadas para o seu sistema operacional no site oficial do Docker.

*Configuração do Banco de Dados PostgreSQL:*
- Após a conclusão da instalação do Docker, abra um terminal fora do projeto e execute o seguinte comando para iniciar um contêiner Docker com o PostgreSQL:

          docker run -d --name postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=12345678 -p 5432:5432 postgres:latest

Isso iniciará uma instância do PostgreSQL com um usuário padrão ("postgres") e senha ("12345678").

*Execução do Backend:*
- Com o PostgreSQL em execução, abra o projeto na pasta do backend e execute o seguinte comando no terminal:

            npm start

Este comando iniciará o servidor backend, permitindo que a aplicação seja acessada e utilize o banco de dados PostgreSQL para suas operações.


### 6. Referências
<!-- Referências podem ser incluídas, caso necessário. Utilize o padrão ABNT. -->
