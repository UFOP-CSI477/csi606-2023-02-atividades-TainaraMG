# **CSI606-2021-02 - Remoto - Proposta de Trabalho Final**

## *Aluna(o): Tainara Marina Gonçalves Morais*

--------------

<!-- Descrever um resumo sobre o trabalho. -->

### Resumo

 O trabalho final consiste em uma aplicação web voltada para a administração de uma imobiliária.
O foco do sistema é na visão para a administração da imobiliária, oferecendo informações sobre os rendimentos mensais, contratos de aluguéis próximos ao vencimento, número de imóveis alugados, vendidos e disponíveis, renda mensal gerada por cada categoria de imóvel.
O sistema também conta com uma tela de catálogo de imóveis, onde clientes da imobiliária podem ver imóveis disponíveis e as informações sobre eles.


<!-- Apresentar o tema. -->
### 1. Tema

  O trabalho final tem como tema o desenvolvimento de uma aplicação web de um sistema de gestão Imobiliária para acompanhamento de rendimentos e informações sobre imóveis.


<!-- Descrever e limitar o escopo da aplicação. -->
### 2. Escopo

  Este projeto terá as seguintes funcionalidades:
Tela para cadastro de imóveis, disponível apenas para o perfil administrador,  com informações como tipo do imóvel (casa, apartamento, lote), localização, preço de venda ou aluguel, detalhes sobre o imóvel, status do imóvel;

Tela para atualização do cadastro de um imóvel já existente;
Tela dedicada aos clientes, como um catálogo, onde eles poderão explorar as opções de imóveis disponíveis;
Tela para cadastro de contratos de locação/venda fechados fisicamente, mas que deverão constar no sistema, com informações como a data de assinatura, a validade e o dia de vencimento das parcelas.

Tela de informações gerenciais, disponível apenas ao usuário administrador, onde constam informações como quantidade de imóveis no catálogo da imobiliária, renda gerada por cada tipo de imóvel mensalmente, ou nos últimos 6 meses, contratos de aluguel próximos ao vencimento e aluguéis com parcelas atrasadas.

<!-- Apresentar restrições de funcionalidades e de escopo. -->
### 3. Restrições

  Neste trabalho não serão considerados:

Funcionalidades como cliente da imobiliária  realizar solicitações de compra ou locação na página, porque o objetivo é fazer um catálogo e não um site de compras.

Tela de cadastros de usuários, o único usuário chave do sistema, o admin, será cadastrado manualmente no sistema.


<!-- Construir alguns protótipos para a aplicação, disponibilizá-los no Github e descrever o que foi considerado. //-->
### 4. Protótipo

  Existirá uma rota chamada catalog que será a lista de imóveis disponíveis, e, essa tela não será autenticada por login. Essa tela será uma lista de cards para cada imóvel com scroll infinito. Ao clicar em cada card, uma modal aparece com todas as informações disponíveis sobre o imóvel. 

Existirá uma tela de login, sendo um formulário com email e senha. Esse formulário será validado quanto a padrão de email, quantidade de caracteres, etc. A tela utilizará o serviço de tratamento de erros, com base na resposta do backend, para mostrar uma snackbar de feedback para o estado da requisição de login. 
Existirá a tela de dashboard, com todas as informações supracitadas. Cada informação será mostrada como um card. 
O design do trabalho será baseado no design patterns do airbnb.

A modelagem atual do banco, que ainda pode sofrer alterações, está disponível em: https://dbdiagram.io/d/65aacfaeac844320ae4fdd84 


### 5. Referências

  Referências podem ser incluídas, caso necessário. Utilize o padrão ABNT.
