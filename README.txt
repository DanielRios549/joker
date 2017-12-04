=> IMPORTANTE <=


A pasta de vídeos ("media/movies" e 'media/series) não são versionadas por poderem ser muito grandes,
elas serão criadas automaticamente quando algum filme e/ou série é adicionado.


=> Gulp <=


0 - Use a tarefa "prod" apenas na branch master, para compilar o TS e o SASS para produção.

1 - Use a tarefa "dep" para pegar os componentes caso atualize-os pelo npm.

2 - Use a tarefa "sass" para compilar os estilos do site.

3 - Use a terefa "ts" para compilar os scripts do site.

4 - Use a tarefas "tswatch" ou "sasswatch" para fazer a tarefa "ts" ou "sass" automaticamente ao salvar um arquivo.

5 - Use as tarefas "tsmin" ou "sassmin" para compilar o TS e o SASS minificados, igual ficariam em produção.

6 - Vc pode utilizar a tafera "sync' para auto recarregar o navegador ao salvar um arquivo, não é obrigatório.

7 - Se quizer, customize a tarefa "default" para fazer tudo que vc quizer.