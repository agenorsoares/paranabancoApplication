**1.1 Dado esse cenário, como você iniciaria uma estratégia de teste?**

Nesta fase é importante incluir o QA para que o escopo seja compreendido, deixando claro as entradas e saídas do sistema, arquitetura do código e infraestrutura do serviço. Dessa forma, é possível definir quais serão os requisitos testáveis e os critérios de aceitação do projeto. Em sequência, pode ser levantado um plano de testes baseados na criticidade de cada entrega, bem como de calendário de planejamento.

**1.2 Quais abordagens de teste você consideraria?**

Podem ser considerados vários testes a depender de cada etapa do projeto/componente a ser validado. Os **testes funcionais** (manuais e automatizados) são essenciais para validar os critérios de aceite do projeto. Geralmente são considerados o MVP para um release inicial de testes em pequena escala/internos. Juntamente aos testes funcionais, podem ser realizados os **testes exploratórios**, afim de descobrir os comportamentos inesperados em relação ao caminho feliz. Quando uma parte do sistema estiver devidamente integrada (sem utilização de mocks) os microsserviços podem ser testados por meio de um **teste de integração**, onde as comunicações entre serviços, APIs, banco de dados e front-end pode ser validada em conjunto, validando entradas e saídas esperadas. Outro tipo de abordagem a ser considerada seriam **testes de carga/performance**, aplicando corretamente a quantidade de envios x tempo determinado para cada finalidade, afim de obter métricas mensuráveis que podem ser utilizadas para validar se o sistema é responsivo o suficiente e se pode lidar com a carga esperada com certa folga. Outras abordagens podem incluir a participação de outros membros da equipe, como acompanhamento de resultados de **testes de segurança** realizados pela equipe de cibersegurança, por tratar-se de uma solução com finalidade comercial.

**1.3 Como você trabalharia com diferentes tipos/níveis de teste?**

Inicialmente é esperado que os desenvolvedores entreguem uma certa cobertura de testes de unidade em seu código. a ser definida pela gestão de TI. Enquanto as entregas forem sendo realizadas (geralmente mockups inicialmente), estes componentes podem ser testados individualmente, validando os seus fluxos de operação. Quando devidamente integrados, os testes entre os microsserviços e APIs/banco podem ser efetuados, utilizando-se de ferramentas como Postman (API), DBeaver (database) entre outros. Em sequência, automações podem ser criadas com diferentes frameworks, sendo o fator de importância, validar o fluxo end-to-end do projeto, como por exemplo: simulação → proposta → aprovação → assinatura de contrato.

**1.4 Quais ferramentas você consideraria usar?**

Em relação aos testes unitários, estes dependem de qual linguagem os desenvolvedores utilizarão. Já os testes de integração via API podem ser validados pelo Postman, enquanto que o banco de dados precisa de um cliente que interaja com o tipo de banco de dados adequadamente, mas ferramentas como DBeaver, SQL SMS e outras costumam ter uma ampla compatibilidade com diferentes arquiteturas. Para o teste de carga, consideraria utilizar a biblioteca Artillery, que é uma solução simples, com um bom sumário de informações pós runs, linguagem acessível (yaml) e performática. No entanto, existem outras opções como o k6 e o JMeter. Em relação a automação, por questão de preferência e familiaridade, utilizaria o Cypress na linguagem javascript, sendo uma ferramenta poderosa para automatizar fluxos de front-end, back-end, interação e validação de arquivos bem como consultas no banco de dados. Este, por sua vez, pode ser integrado ao CI/CD do projeto por meio de um trigger na execução da pipeline, funcionando como um controle caso algum versionamento não esteja de acordo com os resultados esperados na automação. Caso o ambiente possua, o SonarQube também costuma ser um excelente framework de validações de qualidade do código, sendo altamente configurável e completo, traznedo uma quantidade bem alta de métricas de qualidade configuráveis.

**1.5 Como você se imagina atuando nessa equipe?**

De acordo com minhas experiências na área, a participação do Analista de Qualidade de Software deve ser ampla, sendo um agente ativo desde a concepção à entrega do projeto, atuando com diversas frentes, sejam elas contribuindo nas tomadas de decisão, bem como nas atividades base da função. O Analista de QA não apenas executa testes, mas também participa ativamente da construção do projeto, compartilhando insights, devolvendo feedbacks das execuções de testes para a equipe até o acompanhamento com os clientes.

🧪 Testes funcionais | 🔌 Testes de integração | 🔒 Testes de segurança | 🚀 Testes de performance

🧪 **Cenário 1 – Simulação de compra com financiamento aprovado**

*   **Dado que** o cliente preenche seus dados corretamente e escolhe um imóvel financiável
*   **Quando** ele simula o financiamento com um banco parceiro
*   **Então** o sistema deve retornar:
    *   Valor da entrada
    *   Parcelas
    *   Aprovação prévia com código de simulação
    *   Status: `Pré-aprovado`

🧪 **Cenário 2 – Proposta com dados incompletos**

*   **Dado que** o cliente não informa renda ou documento obrigatório
*   **Quando** ele tenta enviar a proposta
*   **Então** o sistema deve exibir erro: `"Campos obrigatórios não preenchidos"`

🧪 **Cenário 3 – Rejeição de financiamento pelo banco**

*   **Dado que** o cliente tem CPF negativado
*   **Quando** o sistema envia a proposta para análise bancária
*   **Então** a resposta deve ser:
    *   Status: `Rejeitado`
    *   Motivo: `"Cliente com restrição no CPF"`

🔌 **Cenário 4 – Consulta de crédito no banco parceiro**

*   **Dado que** o serviço bancário esteja online
*   **Quando** o sistema enviar uma requisição `POST /credito/analise`
*   **Então** deve receber:
    *   HTTP 200
    *   JSON com status `"aprovado"` ou `"rejeitado"`
    *   Tempo de resposta \< 2s

🔒 **Cenário 5 – Acesso não autorizado ao sistema**

*   **Dado que** um usuário sem perfil cadastrado tente acessar `/login`
*   **Quando** ele envia um token inválido ou ausente
*   **Então** o sistema deve retornar:
    *   HTTP 401 (unauthorized)
    *   Mensagem: `"Acesso negado"`

🚀 **Cenário 6 – Acesso simultâneo no horário de pico**

*   **Dado que** o sistema receba 5.000 requisições por minuto
*   **Quando** simulações de crédito forem feitas em massa
*   **Então**:
    *   Nenhuma instância do serviço deve exceder 70% de CPU
    *   Tempo médio de resposta \< 3s